import React from "react";
import { Button as TamaguiButton } from "tamagui";
import { colors } from "./tamagui.config";

export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonProps = {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  text,
  variant = "primary",
  onClick,
  disabled,
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <TamaguiButton
        onPress={onClick}
        disabled={disabled}
        br="$4"
        bg="$color3"
        color="$color11"
      >
        {text}
      </TamaguiButton>
    );
  }

  if (variant === "outline") {
    return (
      <TamaguiButton
        onPress={onClick}
        disabled={disabled}
        br="$4"
        bg="transparent"
        color={colors.primary}
        bow={1}
        boc={colors.primary}
      >
        {text}
      </TamaguiButton>
    );
  }

  return (
    <TamaguiButton
      onPress={onClick}
      disabled={disabled}
      br="$4"
      bg={colors.primary}
      color="white"
    >
      {text}
    </TamaguiButton>
  );
};
