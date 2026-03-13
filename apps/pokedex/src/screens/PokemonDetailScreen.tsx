import React, { useEffect } from "react";
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { usePokemonById } from "@pokedex/services/pokemonService";
import {
  useUserPokemon,
  useUpdatePokemonStatus,
} from "@pokedex/services/userPokemonService";
import { StatusPicker } from "@pokedex/components/StatusPicker";
import { useAuth } from "@pokedex/hooks/useAuth";
import { addRecentlyViewed } from "@pokedex/hooks/useRecentlyViewed";
import type { UserPokemonStatus } from "@arbor-apps/db";
import {
  PageContainer,
  Text,
  XStack,
  YStack,
  colors,
  TypeIcon,
  ChevronLeft,
  tamaguiConfig,
} from "@arbor-apps/ui";
import { useTranslation } from "react-i18next";

export const PokemonDetailScreen = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuth();

  const { data: pokemon, isLoading } = usePokemonById(id);
  const { data: userPokemon } = useUserPokemon(userId ?? "", id);
  const { mutate: updateStatus } = useUpdatePokemonStatus();

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  const handleStatusSelect = (status: UserPokemonStatus) => {
    if (!userId) return;
    updateStatus({ userId, pokemonId: id, status });
  };

  if (isLoading || !pokemon) {
    return (
      <PageContainer justify="center" items="center">
        <ActivityIndicator color={colors.primary} />
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable safeAreaTop>
      <XStack items="center" px="$4" py="$3" justify="center">
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <XStack gap="$2" items="center">
            <ChevronLeft c="$primary" />
            <Text variant="p1" c="$primary">
              {t("common.back")}
            </Text>
          </XStack>
        </TouchableOpacity>
        <Text variant="h4" tt="capitalize">
          {pokemon.name}
        </Text>
      </XStack>
      <YStack items="center" p="$6">
        <Image source={{ uri: pokemon.spriteUrl }} style={styles.sprite} />
        <XStack gap="$2" mt="$2">
          <TypeIcon type={pokemon.type1} size={20} />
          {pokemon.type2 && <TypeIcon type={pokemon.type2} size={20} />}
        </XStack>
        <Text variant="h5" mt="$6" self="flex-start">
          {t("pokemon.status.myStatus")}
        </Text>
        <StatusPicker
          currentStatus={userPokemon?.status ?? null}
          onSelect={handleStatusSelect}
        />
      </YStack>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  sprite: { width: 160, height: 160 },
  back: {
    position: "absolute",
    left: tamaguiConfig.tokens.space["4"].val ?? 16,
  },
});
