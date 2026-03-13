import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const colors = {
  primary: "#E53E3E",
  textDark: "#333333",
  textMuted: "#666666",
  borderMuted: "#cccccc",
} as const;

const shorthands = {
  ...defaultConfig.shorthands,
  // color
  c: "color",
  // flex
  f: "flex",
  fd: "flexDirection",
  fw: "flexWrap",
  // border
  br: "borderRadius",
  boc: "borderColor",
  bow: "borderWidth",
  // typography
  fos: "fontSize",
  fow: "fontWeight",
  lh: "lineHeight",
  ls: "letterSpacing",
  ta: "textAlign",
  tt: "textTransform",
} as const;

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      primary: colors.primary,
      textDark: colors.textDark,
      textMuted: colors.textMuted,
      borderMuted: colors.borderMuted,
    },
  },
  shorthands,
});

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  interface TamaguiCustomConfig extends AppConfig {}
}
