This is a Uniapp project.（Uniapp is a multi-end application framework based on Vue3+TS, this project only needs to support WeChat Mini Program）

## Tech Stacks

- Base: Uniapp + Vue3 (Composition API) + TypeScript
- State management: Pinia
- Internalization: vue-i18n
- Style management: UnoCSS + sass
  - UnoCSS + iconify to use iconfont

## Source Structure

- `pages.json`: Uniapp global configuration
- `pages/`: Pages are written in Vue, but with different lifecycle from Vue components.
- `components/`: categorized by domains.
- `composables/`
- `state/`
- `locale/`: i18n files
- `data/`: magic values
- `styles/`: Design tokens and sass mixins, functions 
- `static/`

### `pages.json`

Register pages, customize globalStyle, tabBar and subPackages here.

- Set `style.navigationStyle` to `custom` to enable custom navigation bar.
- Config `tabBar` to enable level 1 navigation bar. (read <https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar> for details)

## Compatibility

Since this project will be compiled to WeChat Mini Program, some APIs, HTML Elements are unavailable.

### TypeScript

- support ECMAScript, but browser API like window, document, navigator and etc. is not supported.
- Uniapp provides its API through a global object `uni`, read <https://uniapp.dcloud.net.cn/api/> for API reference.
  - use `uni.request` instead of `fetch` and Fetch API Family is also unavailable.
  - WeChat Mini Program platform specific APIs are provided from a global object `wx`, read <https://developers.weixin.qq.com/miniprogram/dev/api/> for API reference.

### Styles(CSS/SCSS)

- only class selector is supported
- use `page` to replace `:root`
- `:root` can only be used in `App.vue`
- `<textarea>`, `<input>`, `<scroll-view>` style must be modified by using `::after` or `::pseudo:after`.

### Template(HTML)

- `<div>` -> `<view>`, `<span>` -> `<text>`, `<img>` -> `<image>`
- Learn about built-in components and their attributes [here](https://uniapp.dcloud.net.cn/component/)

## Common Task Guide

### Add a page

1. create folder `pages/pageName` and create files `pageName.vue`, `pageName.scss`, `pageName.md`
2. register the page in `pages.json`
3. Init the `pageName.vue` with [template](docs/page-template.vue)
4. Implement

> Read more about uniapp page: <https://uniapp.dcloud.net.cn/tutorial/page.html>

### Add a component

1. create folder `components/compName` and create files `compName.vue`, `compName.ts`, `compName.scss`, `compName.md`
2. Init the `compName.vue` with [template](docs/component-template.vue)
3. Implement

### Verify your changes 

Run `pnpm run build:mp-weixin` and make sure no error occurs.

## Best Practice

- [Write human-readable code](docs/write-human-readable-code.md)
- Setup and use design system (ref, sys tokens of color, typography, spacing, elevation).

## References

- <https://github.com/partner-up-dev/client-uniapp> is a reference implementation of uniapp project. (Uses UnoCSS + iconify, three-layerd design tokens, i18n)
