import React from "react";
import type { ComponentProps } from "react";
import { Input, XStack } from "tamagui";
import { Search } from "@tamagui/lucide-icons";

export type SearchBarInputProps = ComponentProps<typeof Input> & {
  placeholder?: string;
};

export const SearchBarInput = ({
  placeholder,
  ...props
}: SearchBarInputProps) => (
  <XStack
    bow={1}
    boc="$borderMuted"
    br="$3"
    px="$3"
    items="center"
    bg="$background"
  >
    <Search size={16} c="$textMuted" />
    <Input
      f={1}
      bow={0}
      bg="transparent"
      p="$2"
      fos={16}
      placeholder={placeholder}
      {...props}
    />
  </XStack>
);
