import React from "react";
import { Image, StyleSheet } from "react-native";
import type { Pokemon } from "@arbor-apps/db";
import { Text, TypeIcon, XStack } from "@arbor-apps/ui";

type Props = {
  pokemon: Pokemon;
  onPress?: () => void;
};

export const PokemonCard = ({ pokemon, onPress }: Props) => (
  <XStack
    items="center"
    py="$3"
    borderBottomWidth={1}
    borderBottomColor="$borderColor"
    onPress={onPress}
    gap="$2"
  >
    <Image source={{ uri: pokemon.spriteUrl }} style={styles.sprite} />
    <XStack items="center" justify="space-between" f={1}>
      <Text variant="p2" fow="600" tt="capitalize">
        {pokemon.name}
      </Text>
      <XStack gap="$2">
        <TypeIcon type={pokemon.type1} size={20} />
        {pokemon.type2 && <TypeIcon type={pokemon.type2} size={20} />}
      </XStack>
    </XStack>
  </XStack>
);

const styles = StyleSheet.create({
  sprite: { width: 64, height: 64 },
});
