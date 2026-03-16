import React from "react";
import type { UserPokemonStatus } from "@arbor-apps/db";
import { USER_POKEMON_STATUSES } from "@arbor-apps/db";
import { Check, PokemonStatus, XStack, YStack } from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";

type Props = {
  currentStatus: UserPokemonStatus | null;
  onSelect: (status: UserPokemonStatus) => void;
};

export const StatusPicker = ({ currentStatus, onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <YStack gap="$2" mt="$4" items="flex-start" width="100%">
      {USER_POKEMON_STATUSES.map((status) => (
        <XStack key={status} gap="$4" py="$4" items="center">
          <PokemonStatus
            key={status}
            status={status}
            label={t(`pokemon.status.${status}`)}
            isPressable
            onPress={() => onSelect(status)}
          />
          {status === currentStatus && (
            <XStack
              width={20}
              height={20}
              br={20}
              bg="$primary"
              items="center"
              justify="center"
            >
              <Check size={15} c="white" />
            </XStack>
          )}
        </XStack>
      ))}
    </YStack>
  );
};
