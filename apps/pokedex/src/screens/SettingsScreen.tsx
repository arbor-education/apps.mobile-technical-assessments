import React from "react";
import { router } from "expo-router";
import { i18n, useTranslation } from "@arbor-apps/translations";
import { useTheme } from "@pokedex/hooks/useTheme";
import { useAuth } from "@pokedex/hooks/useAuth";
import {
  Button,
  PageContainer,
  Switch,
  Text,
  XStack,
  YStack,
} from "@arbor-apps/ui";

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const currentLang = i18n.language;

  const handleLanguageToggle = () => {
    const next = currentLang === "en" ? "cy" : "en";
    void i18n.changeLanguage(next);
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <PageContainer p="$6" safeAreaTop>
      <Text variant="h2" mb="$8">
        {t("settings.title")}
      </Text>

      <XStack
        items="center"
        justify="space-between"
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text variant="p2">{t("settings.language")}</Text>
        <Button
          text={
            currentLang === "en"
              ? t("settings.languageNames.english")
              : t("settings.languageNames.cymraeg")
          }
          variant="secondary"
          onClick={handleLanguageToggle}
        />
      </XStack>

      <XStack
        items="center"
        justify="space-between"
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text variant="p2">{t("settings.theme")}</Text>
        <XStack items="center" gap="$2">
          <Text variant="p3">
            {isDark ? t("settings.dark") : t("settings.light")}
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </XStack>
      </XStack>

      <YStack mt="$10">
        <Button
          text={t("settings.logout")}
          variant="primary"
          onClick={handleLogout}
        />
      </YStack>
    </PageContainer>
  );
};
