Uniapp APIs provides ability to making network requests, navigate between pages, get device information, and more.

## Preface

- All Uniapp APIs accept `success`, `fail`, and `complete` callbacks. Use these to handle result or errors.
- Read all API references at <https://uniapp.dcloud.net.cn/api/>.

## Navigation

- `uni.navigateTo` — open a new non-tab page (push onto stack).
- `uni.switchTab` — switch to a tabBar page.
- `uni.navigateBack` — go back in the page stack.

Notes:
- For page paths, use the page route as registered in `pages.json`. Query parameters are appended to the `url` parameter as a query string, e.g. `path/to/page?id=1&name=uni`.
- Encode complex query parameters with `encodeURIComponent` or pass data via shared state (Pinia) or event channels to avoid fragile long query strings.
- TabBar pages must be declared in `pages.json`'s `tabBar` config. Use `switchTab` to navigate to them.
- When redirecting after an authentication check, consider `reLaunch` to prevent back navigation to a pre-auth page.

Examples:
```ts
uni.navigateTo({
  url: '/pages/detail/detail?id=123&name=foo',
});
uni.navigateBack({
  delta: 1  // optional
});
```

> Read <https://uniapp.dcloud.net.cn/api/router.html> for more details.


## Device

### Weixin Miniprogram Menu Button

use `uni.getMenuButtonBoundingClientRect()` to avoid content overlap with the menu button.
