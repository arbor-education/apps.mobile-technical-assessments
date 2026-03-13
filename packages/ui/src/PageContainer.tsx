import React from "react";
import type { ComponentProps } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

export type PageContainerProps = ComponentProps<typeof YStack> & {
  safeArea?: boolean;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  scrollable?: boolean;
};

export const PageContainer = ({
  children,
  safeArea,
  safeAreaTop,
  safeAreaBottom,
  scrollable,
  ...props
}: PageContainerProps) => {
  const insets = useSafeAreaInsets();

  const paddingTop = safeArea || safeAreaTop ? insets.top : 0;
  const paddingBottom = safeArea || safeAreaBottom ? insets.bottom : 0;

  return (
    <YStack
      f={1}
      pt={paddingTop}
      pb={paddingBottom}
      bg="$background"
      {...props}
    >
      {scrollable ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
      ) : (
        children
      )}
    </YStack>
  );
};
