---
description: "This document tells you how to implement “share to chat” on weixin miniprogram in this project"
---

## Summary 
- Use `onShareAppMessage` on the page to control the share card for “send to friend” (chat).
- Use `<button open-type="share">` + `:data-share` to provide dynamic per-button share parameters (list with many items).
- Put `onShareAppMessage` inside `onLoad` (or `onMounted`) when you need access to reactive data loaded asynchronously.
- `onShareTimeline` (share to Moments) does not support custom `path` in WeChat — treat it separately.

## Key uni-app behavior and constraints
- Defining `onShareAppMessage` on the page enables the top-right native “Forward” menu.
- `onShareAppMessage` is invoked when user triggers share (menu or button). It must return an object describing the share.
- Required in `onShareAppMessage` return: `title` (String), `path` (String path starting with `/`).
- For button-triggered share, the event object has `from === 'button'` and `target` contains `dataset.share`.
- `imageUrl` is optional; supported formats PNG/JPG; display aspect ratio ~5:4.
- `onShareTimeline` (Moments) is separate and cannot accept a custom `path` in WeChat — only title and image (handle separately).
- If you use a global mixin for `onShareAppMessage`, per-page `onShareAppMessage` must be registered carefully (see below).

## Implementation checklist
1. Ensure page has a share handler: `onShareAppMessage`.
2. If page loads data asynchronously and share content depends on it, register `onShareAppMessage` inside `onLoad` (or `onMounted`) so closures capture up-to-date reactive data.
3. For list-item-specific sharing use `<button open-type="share">` with `:data-share` payload and read it in `onShareAppMessage` when `e.from === 'button'`.
4. Use `uni.showShareMenu()` if you need to ensure native share menu appears.
5. Don’t use `uni.share` in mini program target — it’s App-only.

## Examples

- Basic page share (static share content)
```vue
<template>
  <view>Basic page</view>
</template>

<script setup lang="ts">
import { onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
  return {
    title: 'This is the share title',
    path: '/pages/home/home', // must start with '/'
    imageUrl: '/static/images/share-cover.png'
  }
})
</script>
```

- Correct pattern for asynchronous data (fetch + dynamic share) — register `onShareAppMessage` inside `onLoad`
```vue
<template>
  <view>
    <text>{{ recordInfo.title }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

const recordId = ref('')
const recordInfo = ref({ title: '', id: '', cover: '' })

onLoad((options) => {
  recordId.value = options?.id || ''
  getRecordInfo()

  // Register onShareAppMessage here so the closure reads updated reactive values
  onShareAppMessage(() => {
    return {
      title: recordInfo.value.title || 'Default title',
      path: `/pages/detail/detail?id=${recordInfo.value.id || recordId.value}`,
      imageUrl: recordInfo.value.cover || '/static/images/default-share.png'
    }
  })
})

async function getRecordInfo() {
  // fetch data, then assign recordInfo.value
  // recordInfo.value = await api(...)
}
</script>
```

- Dynamic per-item share buttons in a list (use `data-share` on button)
```vue
<template>
  <view v-for="item in items" :key="item.id">
    <view>{{ item.title }}</view>
    <!-- button triggers share and carries custom share payload in dataset.share -->
    <button
      open-type="share"
      :data-share="{
        title: item.title,
        path: `/pages/detail/detail?id=${item.id}`,
        imageUrl: item.cover
      }"
    >
      Share to friend
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'

const items = ref([
  // example items
  { id: '1', title: 'Article 1', cover: '/static/a1.jpg' },
  { id: '2', title: 'Article 2', cover: '/static/a2.jpg' }
])

// onShareAppMessage will be called when user taps the button or uses native menu
onShareAppMessage((e) => {
  // e.from === 'button' when initiated by button; e.target.dataset.share holds the payload
  if (e.from === 'button') {
    const ds = e.target?.dataset?.share || {}
    return {
      title: ds.title || 'Default title',
      path: ds.path || '/pages/home/home',
      imageUrl: ds.imageUrl
    }
  }
  // fallback for top-right menu share
  return {
    title: 'Default share title for this page',
    path: '/pages/home/home'
  }
})
</script>
```

- Global mixin approach (when every page mostly shares same content)
```vue
export default {
  data() {
    return {
      miniShareOptions: {
        title: 'App default title',
        path: '/pages/home/home',
        imageUrl: '/static/images/default-share.png'
      }
    }
  },
  onShareAppMessage() {
    // This will be used for pages that do not override per-page share
    return {
      ...this.miniShareOptions
    }
  }
}
```

Then register via `app.mixin(...)` in `main.ts`. If a page needs dynamic share data, register a per-page `onShareAppMessage` inside `onLoad`. 

Note: a setup-registered `onShareAppMessage` may not override an Options API mixin unless registered at the right time; that's why registering inside `onLoad/onMounted` is reliable.

## Edge cases, gotchas, and tips
- onShareTimeline: For WeChat Moments you must use `onShareTimeline`. WeChat limits `path` for timeline shares (historically it does not accept a custom path) — treat timeline separately and only set `title` and `image` as required.
- If you define `onShareAppMessage` on a page, the native top-right “Forward” menu becomes visible.
- When using `button open-type="share"`, the dynamic data must be placed in `data-share`, and `onShareAppMessage` must read it from `e.target.dataset.share`.
- `path` in the returned object must be a full page path starting with `/`. Some platform variants (e.g. some small platforms) have differences — follow uni-app API table if you target multiple mini-program platforms.
- Image: prefer PNG/JPG, network or local path; recommended aspect ratio roughly 5:4.
- Be careful when combining a global mixin with per-page dynamic sharing. If pages must have individualized share content, prefer registering `onShareAppMessage` in the page lifecycle (`onLoad`) so it overrides the global default.
- If you need the native share menu to show share options, call `uni.showShareMenu({ withShareTicket: true })` as needed.

## Minimal QA checklist
- [ ] For a page that depends on async data, `onShareAppMessage` is registered inside `onLoad` or after data arrives.
- [ ] Button shares use `open-type="share"` and `:data-share` with correct fields.
- [ ] Returned share object includes `title` and `path`.
- [ ] `imageUrl` points to a valid image (5:4 recommended).
- [ ] If you used global mixin, confirm pages that require special share are registering per-page handlers at the right lifecycle.
- [ ] If you intend to show native share menu programmatically, call `uni.showShareMenu()`.
