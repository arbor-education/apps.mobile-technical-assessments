import React, { useEffect } from "react";
import { Image, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePokemonById } from "@pokedex/services/pokemonService";
import {
  useUserPokemon,
  useUpdatePokemonStatus,
} from "@pokedex/services/userPokemonService";
import { StatusPicker } from "@pokedex/components/StatusPicker";
import { GenericHeader } from "@pokedex/components/GenericHeader";
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
  PokemonType,
} from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";

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
      <GenericHeader hasBackButton title={pokemon.name} />
      <YStack items="center" p="$6">
        <Image source={{ uri: pokemon.spriteUrl }} style={styles.sprite} />
        <XStack gap="$2" mt="$2">
          <TypeIcon type={pokemon.type1 as PokemonType} size={20} />
          {pokemon.type2 && (
            <TypeIcon type={pokemon.type2 as PokemonType} size={20} />
          )}
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
});
