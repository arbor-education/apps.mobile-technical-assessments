import React from "react";
import { Theme, TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "./tamagui.config";

type Props = {
  theme: "light" | "dark";
  children: React.ReactNode;
};

export const AppProvider = ({ theme, children }: Props) => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
    <Theme name={theme}>{children}</Theme>
  </TamaguiProvider>
);
