import React from "react";
import { ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "@arbor-apps/translations";
import { Text, YStack, defaultConfig } from "@arbor-apps/ui";
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
        contentContainerStyle={{
          paddingHorizontal: defaultConfig.tokens.space[4],
          gap: defaultConfig.tokens.space[2],
          flexDirection: "row",
        }}
      >
        {pokemon.map((p) => (
          <YStack
            key={p.id}
            items="center"
            width={72}
            onPress={() => router.push(`/pokemon/${p.id}`)}
            pressStyle={{ opacity: 0.7 }}
          >
            <Image
              source={{ uri: p.spriteUrl }}
              style={{ width: 64, height: 64 }}
            />
          </YStack>
        ))}
      </ScrollView>
    </YStack>
  );
};
