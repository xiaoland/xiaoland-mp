import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import("unocss/vite")).default;
  // @ts-expect-error - handle CJS/ESM interop
  const uniPlugin = uni.default || uni;

  return defineConfig({
    plugins: [uniPlugin(), UnoCSS()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (source: string, filePath: string) => {
            if (
              filePath.includes("/src/components/") ||
              filePath.includes("/src/pages/")
            ) {
              return `@use "@/styles/vars.scss" as *; @use "@/styles/mixins.scss" as *; ${source}`;
            }
            return source;
          },
        },
      },
    },
  });
};
