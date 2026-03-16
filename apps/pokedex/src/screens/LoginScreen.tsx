import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@pokedex/hooks/useAuth";
import { useTranslation } from "@arbor-apps/translations";
import {
  Button,
  PageContainer,
  Text,
  TextInput,
  YStack,
  colors,
} from "@arbor-apps/ui";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        router.replace("/(tabs)/pokedex");
      } else {
        setError(t("auth.invalidCredentials"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer justify="center" px="$8">
      <Text variant="h1" ta="center" mb="$8" c="$primary">
        {t("auth.title")}
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
          text={t("auth.loginButton")}
          variant="primary"
          onClick={handleLogin}
        />
      )}
    </PageContainer>
  );
};
