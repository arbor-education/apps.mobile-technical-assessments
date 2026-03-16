import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@pokedex/hooks/useAuth";
import { clearRecentlyViewed } from "@pokedex/hooks/useRecentlyViewed";
import { useTranslation } from "@arbor-apps/translations";
import {
  Button,
  PageContainer,
  Text,
  TextInput,
  XStack,
  YStack,
  colors,
} from "@arbor-apps/ui";

export const SwitchAccountScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/settings");
    }
  };

  const handleSwitch = async () => {
    setError("");
    setLoading(true);
    try {
      clearRecentlyViewed();
      const success = await login(username, password);
      if (success) {
        await queryClient.invalidateQueries();
        router.replace("/(tabs)/pokedex");
      } else {
        setError(t("auth.invalidCredentials"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer px="$8">
      <XStack pt="$4" pb="$2">
        <Button

          text={t("common.back")}


          variant="ghost"
          onClick={handleBack}
        />
      </XStack>

      <YStack f={1} justify="center">
        <Text variant="h1" ta="center" mb="$8" c="$primary">
          {t("settings.switchAccount")}
        </Text>
        <TextInput
          placeholder={t("auth.usernamePlaceholder")}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder={t("auth.passwordPlaceholder")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!!error && (
          <Text variant="p3" c="$primary" mb="$3" ta="center">
            {error}
          </Text>
        )}
        {loading ? (
          <YStack items="center" mt="$2">
            <ActivityIndicator color={colors.primary} />
          </YStack>
        ) : (
          <Button
            text={t("settings.switchAccount")}
            variant="primary"
            onClick={handleSwitch}
          />
        )}
      </YStack>
    </PageContainer>
  );
};
