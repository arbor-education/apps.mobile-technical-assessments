import React from "react";
import type { UserPokemonStatus } from "@arbor-apps/db";
import { Text, XStack } from "@arbor-apps/ui";

const STATUSES: UserPokemonStatus[] = ["hunting", "caught", "shiny", "ignored"];

type Props = {
  currentStatus: UserPokemonStatus | null;
  onSelect: (status: UserPokemonStatus) => void;
};

export const StatusPicker = ({ currentStatus, onSelect }: Props) => (
  <XStack fw="wrap" gap="$2" mt="$4">
    {STATUSES.map((status) => {
      const isActive = currentStatus === status;
      return (
        <XStack
          key={status}
          px="$4"
          py="$2"
          br={20}
          bow={1}
          boc={isActive ? "$primary" : "$borderMuted"}
          bg={isActive ? "$primary" : "transparent"}
          onPress={() => onSelect(status)}
        >
          <Text
            variant="p3"
            c={isActive ? "white" : "$textMuted"}
            fow={isActive ? "600" : "400"}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </XStack>
      );
    })}
  </XStack>
);
