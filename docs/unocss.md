# Setup UnoCSS + Iconfiy in Uniapp project

## 核心依赖

- unocss: lock to `65.5.0`
- [unocss-preset-uni](https://github.com/uni-helper/unocss-preset-uni)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)

## 最小配置

```ts
// uno.config.ts
import presetIcons from "@unocss/preset-icons";
import { presetUni } from "@uni-helper/unocss-preset-uni";
import { presetWeapp } from "unocss-preset-weapp";
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default {
  presets: [
    presetUni(),
    presetWeapp(),
    presetWeappAttributify(),
    presetIcons(),
  ],
  transformers: [transformerAttributify(), transformerClass()],
  shortcuts: [],
};
```

```ts
// vite.config.ts
import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import("unocss/vite")).default;  // 
  return defineConfig({
    plugins: [
      uni();
      UnoCSS()
    ]
  })
}
```

```ts
// main.ts
import "uno.css";
```
