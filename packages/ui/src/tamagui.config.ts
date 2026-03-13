import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const colors = {
  primary: "#E53E3E",
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

const lightTheme = {
  ...defaultConfig.themes.light,
  textDark: "#333333",
  textMuted: "#666666",
  borderMuted: "#cccccc",
};

const darkTheme = {
  ...defaultConfig.themes.dark,
  textDark: "#f0f0f0",
  textMuted: "#999999",
  borderMuted: "#444444",
};

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      primary: colors.primary,
    },
  },
  themes: {
    ...defaultConfig.themes,
    light: lightTheme,
    dark: darkTheme,
  },
  shorthands,
});

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  interface TamaguiCustomConfig extends AppConfig {}
}
