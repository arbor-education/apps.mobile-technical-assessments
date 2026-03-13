import React from "react";
import { GetThemeValueForKey, XStack } from "tamagui";
import { Text } from "./Text";

// Pokemon status colours — not theme tokens (app-domain palette, not light/dark aware)
const statusColors: Record<string, string> = {
  hunting: "#FF87CF",
  caught: "#86FEA4",
  shiny: "#CBB4FF",
  ignored: "#d2d2d2",
  unknown: "#d2d2d2",
};

type PokemonStatusProps = {
  status?: string | null;
  label: string;
  onPress?: () => void;
  isPressable?: boolean;
};

export const PokemonStatus = ({
  status,
  label,
  onPress,
  isPressable,
}: PokemonStatusProps) => (
  <XStack
    bg={
      statusColors[status ?? "unknown"] as unknown as GetThemeValueForKey<"bg">
    }
    br="$2"
    px="$2"
    py="$2"
    onPress={isPressable && onPress ? onPress : undefined}
    pressStyle={isPressable && onPress ? { opacity: 0.8 } : undefined}
  >
    <Text fow="900" tt="uppercase" c="$background" variant="p5">
      {label}
    </Text>
  </XStack>
);
