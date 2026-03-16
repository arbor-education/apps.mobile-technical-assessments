import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { i18n, useTranslation } from "@arbor-apps/translations";
import { useTheme } from "@pokedex/hooks/useTheme";
import { useAuth } from "@pokedex/hooks/useAuth";
import { clearRecentlyViewed } from "@pokedex/hooks/useRecentlyViewed";
import {
  getActiveToken,
  getAllStoredAccounts,
  getStoredAccountCredentials,
  parseToken,
} from "@pokedex/utils/storage";
import {
  Button,
  PageContainer,
  Popover,
  ScrollView,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  colors,
} from "@arbor-apps/ui";
import { database } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";
import type { UserPokemon } from "@arbor-apps/db";
import { useAppSelector } from "@pokedex/store";

type Stats = {
  caught: number;
  shiny: number;
  completion: number;
};

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { logout, login } = useAuth();
  const queryClient = useQueryClient();
  const currentLang = i18n.language;
  const userId = useAppSelector((state) => state.user.userId);

  const activeToken = getActiveToken();
  const username = activeToken ? parseToken(activeToken.token).username : null;
  const initial = username ? username[0].toUpperCase() : "?";
  const pastAccounts = getAllStoredAccounts();

  const [stats, setStats] = useState<Stats>({
    caught: 0,
    shiny: 0,
    completion: 0,
  });

  useEffect(() => {
    database
      .get<UserPokemon>("user_pokemon")
      .query(Q.where("user_id", userId ?? ""))
      .observe()
      .subscribe((userPokemon) => {
        const caught = userPokemon.filter(
          (up) => up.status === "caught",
        ).length;
        const shiny = userPokemon.filter((up) => up.status === "shiny").length;
        const completion =
          userPokemon.length > 0
            ? Math.round((caught / userPokemon.length) * 100)
            : 0;
        setStats({ caught, shiny, completion });
      });
  }, []);

  const handleLanguageToggle = () => {
    const next = currentLang === "en" ? "cy" : "en";
    void i18n.changeLanguage(next);
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleSwitchAccount = () => {
    router.push("/switch-account");
  };

  const handleAccountPress = async (account: string) => {
    const credentials = getStoredAccountCredentials(account);
    if (!credentials) return;
    clearRecentlyViewed();
    const success = await login(credentials.username, credentials.password);
    if (success) {
      await queryClient.invalidateQueries();
      router.replace("/(tabs)/pokedex");
    }
  };

  return (
    <PageContainer p="$6" safeAreaTop>
      <XStack items="center" justify="space-between" mb="$8">
        <Text variant="h2">{t("settings.title")}</Text>

        <Popover placement="bottom-end">
          <Popover.Trigger asChild>
            <XStack
              width={40}
              height={40}
              br={20}
              bg={colors.primary}
              items="center"
              justify="center"
              pressStyle={{ opacity: 0.7 }}
            >
              <Text variant="p2" c="white" fow="700">
                {initial}
              </Text>
            </XStack>
          </Popover.Trigger>

          <Popover.Content
            bg="$background"
            bow={1}
            boc="$borderColor"
            br="$4"
            py="$4"
            width={240}
            elevate
          >
            <Popover.Arrow bg="$background" boc="$borderColor" />

            <YStack gap="$3" width="100%">
              <Text variant="h3">Profile</Text>

              <Button
                text="Switch Account"
                variant="outline"
                onClick={handleSwitchAccount}
              />

              {pastAccounts.length > 0 && (
                <YStack gap="$1" width="100%">
                  <Text variant="p3" c="$textMuted">
                    Other Account{pastAccounts.length - 1 > 1 ? "s" : ""}
                  </Text>
                  <ScrollView maxH={160}>
                    <YStack gap="$2" pt="$1">
                      {pastAccounts.map((account) => (
                        <XStack
                          key={account}
                          items="center"
                          gap="$2"
                          py="$1"
                          onPress={() => void handleAccountPress(account)}
                          pressStyle={{ opacity: 0.6 }}
                        >
                          <View
                            width={28}
                            height={28}
                            br={14}
                            bg="$color4"
                            items="center"
                            justify="center"
                          >
                            <Text variant="p3" fow="700">
                              {account[0].toUpperCase()}
                            </Text>
                          </View>
                          <Text variant="p2">{account}</Text>
                        </XStack>
                      ))}
                    </YStack>
                  </ScrollView>
                </YStack>
              )}

              <Button
                text={t("settings.logout")}
                variant="ghost"
                onClick={handleLogout}
              />
            </YStack>
          </Popover.Content>
        </Popover>
      </XStack>

      <YStack
        mb="$6"
        gap="$3"
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text variant="h3">Pokédex Stats</Text>
        <XStack justify="space-between">
          <Text variant="p2">Caught</Text>
          <Text variant="p2">{stats.caught}</Text>
        </XStack>
        <XStack justify="space-between">
          <Text variant="p2">Shiny</Text>
          <Text variant="p2">{stats.shiny}</Text>
        </XStack>
        <XStack justify="space-between">
          <Text variant="p2">Completion</Text>
          <Text variant="p2">{stats.completion}%</Text>
        </XStack>
      </YStack>

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
    </PageContainer>
  );
};
