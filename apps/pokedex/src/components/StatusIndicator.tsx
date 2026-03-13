import { Text, XStack } from "@arbor-apps/ui";
import { GetThemeValueForKey } from "tamagui";
import React from "react";

type StatusIndicatorProps = {
  status?: string | null;
};

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const statusColors: Record<string, string> = {
    hunting: "#FF87CF",
    caught: "#86FEA4",
    shiny: "#CBB4FF",
    ignored: "#d2d2d2",
    unknown: "#d2d2d2",
  };

  return (
    <XStack
      bg={
        statusColors[
          status ?? "unknown"
        ] as unknown as GetThemeValueForKey<"bg">
      }
      br="$2"
      px="$2"
      py="$1"
      f={1}
    >
      <Text fow="900" tt="uppercase" c="$background" variant="p5">
        {status ?? "Not Started"}
      </Text>
    </XStack>
  );
};
