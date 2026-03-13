import React from "react";
import { ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "@arbor-apps/translations";
import { Text, YStack } from "@arbor-apps/ui";
import { useRecentlyViewed } from "@pokedex/hooks/useRecentlyViewed";
import { usePokemonsByIds } from "@pokedex/services/pokemonService";

export const RecentlyViewedSection = () => {
  const { t } = useTranslation();
  const { ids } = useRecentlyViewed();
  const { data: pokemon } = usePokemonsByIds(ids);

  if (ids.length === 0 || !pokemon || pokemon.length === 0) return null;

  return (
    <YStack mb="$2">
      <Text variant="h5" px="$4" pb="$2">
        {t("pokemon.recentlyViewed")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {pokemon.map((p) => (
          <TouchableOpacity
            key={p.id}
            onPress={() => router.push(`/pokemon/${p.id}`)}
            style={styles.card}
          >
            <Image source={{ uri: p.spriteUrl }} style={styles.sprite} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
  },
  card: {
    alignItems: "center",
    width: 72,
  },
  sprite: {
    width: 64,
    height: 64,
  },
});
