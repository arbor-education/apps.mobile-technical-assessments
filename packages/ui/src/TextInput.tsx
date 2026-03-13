import React from "react";
import type { ComponentProps } from "react";
import { Input } from "tamagui";
import { colors } from "./tamagui.config";

export type TextInputProps = ComponentProps<typeof Input>;

export const TextInput = (props: TextInputProps) => (
  <Input
    bow={1}
    boc={colors.borderMuted}
    br="$3"
    p="$3"
    mb="$3"
    fos={16}
    {...props}
  />
);
