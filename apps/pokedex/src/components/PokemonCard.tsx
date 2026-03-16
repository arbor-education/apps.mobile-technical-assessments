import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  Text,
  TypeIcon,
  XStack,
  YStack,
  View,
  PokemonType,
} from "@arbor-apps/ui";
import { PokemonWithUserPokemon } from "@pokedex/services/pokemonService";
import { StatusIndicator } from "@pokedex/components/StatusIndicator";

type Props = {
  pokemon: PokemonWithUserPokemon;
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
    <YStack gap="$1" f={1}>
      <XStack items="center" justify="space-between" f={1}>
        <Text variant="p2" fow="600" tt="capitalize">
          {pokemon.name}
        </Text>
      </XStack>
      <XStack>
        <View>
          <StatusIndicator status={pokemon.userPokemon?.status} />
        </View>
      </XStack>
    </YStack>
    <XStack gap="$2">
      <TypeIcon type={pokemon.type1 as PokemonType} size={20} />
      {pokemon.type2 && (
        <TypeIcon type={pokemon.type2 as PokemonType} size={20} />
      )}
    </XStack>
  </XStack>
);

const styles = StyleSheet.create({
  sprite: { width: 64, height: 64 },
});
