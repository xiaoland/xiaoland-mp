import presetIcons from "@unocss/preset-icons";
import { presetUni } from "@uni-helper/unocss-preset-uni";
import { presetWeapp } from "unocss-preset-weapp";
import {
  extractorAttributify,
  transformerClass,
} from "unocss-preset-weapp/transformer";

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  presets: [
    presetUni(),
    presetWeapp({
      designWidth: 750,
      platform: "uniapp",
    }),
    presetWeappAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  transformers: [transformerAttributify(), transformerClass()],
  theme: {
    colors: {
      primary: "#4361ee",
      tertiary: "#f7bf2f",
    },
  },
};
