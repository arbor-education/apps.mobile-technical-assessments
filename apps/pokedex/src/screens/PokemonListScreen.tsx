import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { usePokemonList } from "@pokedex/services/pokemonService";
import { PokemonCard } from "@pokedex/components/PokemonCard";
import { useTranslation } from "@arbor-apps/translations";
import type { Pokemon } from "@arbor-apps/db";
import { Text, YStack } from "@arbor-apps/ui";

export const PokemonListScreen = () => {
  const { t } = useTranslation();
  const { data: pokemon, isLoading, isError } = usePokemonList();

  const keyExtractor = useCallback((item: Pokemon) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => (
      <PokemonCard
        pokemon={item}
        onPress={() => router.push(`/pokemon/${item.id}`)}
      />
    ),
    [],
  );

  if (isLoading) {
    return (
      <YStack f={1} justify="center" items="center">
        <Text variant="p2">{t("common.loading")}</Text>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack f={1} justify="center" items="center">
        <Text variant="p2">{t("common.error")}</Text>
      </YStack>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pokemon}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={15}
      />
    </View>
  );
};
