这是一个 Uniapp 项目。（Uniapp是基于Vue3+TS的多端应用框架，本项目仅需支持微信小程序平台）

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

Read <https://uniapp.dcloud.net.cn/collocation/pages.html> for more.

## Compatability

Since this project will be compiled to wechat miniprogram platform, some APIs, HTML Elements are unavailable:

### TypeScript

- support ECMAScript, but browser API like window, document, navigator and etc. is not supported.
- use `uni.request` instead of `fetch` and Fetch API Family is also unavailable.

### Styles(CSS/SCSS)

- only class selector is supported; use `page` to replace `:root` selector

### Template(HTML)

- `<div>` -> `<view>`, `<span>` -> `<text>`, `<img>` -> `<image>`
- Learn about built-in components and their attributes [here](https://uniapp.dcloud.net.cn/component/)

## Common Task Guide

### Add a page

1. add a `pageName.vue` in `pages/`
2. register the page in `pages.json`
3. Init the page with [the template](docs/page-template.vue)
4. Implement the page

> Read more about uniapp page: <https://uniapp.dcloud.net.cn/tutorial/page.html>


### Verify your changes 

Run `pnpm run build:mp-weixin` and make sure no error occurs.

## Best Practice

- [Write human-readable code](docs/write-human-readable-code.md) 