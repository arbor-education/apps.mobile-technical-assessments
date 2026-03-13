import { ChevronLeft, Text, XStack } from "@arbor-apps/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

type GenericHeaderProps = {
  hasBackButton?: boolean;
  onBack?: () => void;
  title?: string;
};

export const GenericHeader = ({
  hasBackButton,
  onBack,
  title,
}: GenericHeaderProps) => {
  const { t } = useTranslation();

  const handleBackPress = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <XStack items="center" px="$4" py="$3" justify="center">
      {hasBackButton && (
        <XStack
          onPress={handleBackPress}
          position="absolute"
          l="$4"
          gap="$2"
          items="center"
          pressStyle={{ opacity: 0.7 }}
        >
          <ChevronLeft c="$primary" />
          <Text variant="p1" c="$primary">
            {t("common.back")}
          </Text>
        </XStack>
      )}
      {title && (
        <Text variant="h4" tt="capitalize">
          {title}
        </Text>
      )}
    </XStack>
  );
};
