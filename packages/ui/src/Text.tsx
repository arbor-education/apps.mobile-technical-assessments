import React from "react";
import type { ComponentProps } from "react";
import { Text as TamaguiText } from "tamagui";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5";

export type TextProps = ComponentProps<typeof TamaguiText> & {
  variant?: TextVariant;
};

const VARIANT_SIZE: Record<TextVariant, number> = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  p1: 18,
  p2: 16,
  p3: 14,
  p4: 13,
  p5: 12,
};

const VARIANT_WEIGHT: Record<TextVariant, "400" | "600" | "700"> = {
  h1: "700",
  h2: "700",
  h3: "600",
  h4: "600",
  h5: "600",
  p1: "400",
  p2: "400",
  p3: "400",
  p4: "400",
  p5: "400",
};

export const Text = ({ variant = "p2", ...props }: TextProps) => (
  <TamaguiText
    fos={VARIANT_SIZE[variant]}
    fow={VARIANT_WEIGHT[variant]}
    {...props}
  />
);
