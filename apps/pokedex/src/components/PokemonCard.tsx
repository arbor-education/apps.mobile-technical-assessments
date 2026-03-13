import React from "react";
import { Image, StyleSheet } from "react-native";
import type { Pokemon } from "@arbor-apps/db";
import { Text, XStack, YStack } from "@arbor-apps/ui";

type Props = {
  pokemon: Pokemon;
  onPress?: () => void;
};

export const PokemonCard = ({ pokemon, onPress }: Props) => (
  <XStack
    items="center"
    p="$3"
    borderBottomWidth={1}
    borderBottomColor="$borderColor"
    onPress={onPress}
  >
    <Image source={{ uri: pokemon.spriteUrl }} style={styles.sprite} />
    <YStack ml="$3">
      <Text variant="p2" fow="600" tt="capitalize">
        {pokemon.name}
      </Text>
      <Text variant="p4" c="$textMuted" mt="$1">
        {pokemon.type1}
        {pokemon.type2 ? ` / ${pokemon.type2}` : ""}
      </Text>
    </YStack>
  </XStack>
);

const styles = StyleSheet.create({
  sprite: { width: 64, height: 64 },
});
