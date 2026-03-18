import React, { useCallback, useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native";
import { router } from "expo-router";
import {
  PokemonWithUserPokemon,
  usePokemonList,
} from "@pokedex/services/pokemonService";
import { PokemonCard } from "@pokedex/components/PokemonCard";
import { TypeFilterChips } from "@pokedex/components/TypeFilterChips";
import { RecentlyViewedSection } from "@pokedex/components/RecentlyViewedSection";
import { useTranslation } from "@arbor-apps/translations";
import type { Pokemon } from "@arbor-apps/db";
import {
  Text,
  YStack,
  PageContainer,
  useTheme,
  defaultConfig,
} from "@arbor-apps/ui";

export const PokemonListScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: pokemon, isLoading, isError } = usePokemonList();
  const [searchText, setSearchText] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);

  console.log(searchText);

  useEffect(() => {
    const results = pokemon?.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    results?.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredPokemon(results ?? []);
  }, [searchText]);

  const keyExtractor = useCallback((item: Pokemon) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: PokemonWithUserPokemon }) => (
      <PokemonCard
        pokemon={item}
        onPress={() => router.push(`/pokemon/${item.id}`)}
      />
    ),
    [],
  );

  if (isLoading) {
    return (
      <YStack bg="$background" f={1} justify="center" items="center">
        <Text variant="p2">{t("common.loading")}</Text>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack bg="$background" f={1} justify="center" items="center">
        <Text variant="p2">{t("common.error")}</Text>
      </YStack>
    );
  }

  return (
    <PageContainer safeAreaTop>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search Pokémon..."
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          marginHorizontal: 20,
          marginBottom: 8,
          backgroundColor: "#fff",
        }}
      />
      <TypeFilterChips />
      <RecentlyViewedSection />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredPokemon}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={15}
        style={{ flex: 1, backgroundColor: theme.background.val }}
        contentContainerStyle={{
          paddingHorizontal: defaultConfig.tokens.space[4],
        }}
        ListEmptyComponent={
          <YStack f={1} justify="center" items="center" py="$8">
            <Text variant="p2">{t("pokemon.noResults")}</Text>
          </YStack>
        }
      />
    </PageContainer>
  );
};
