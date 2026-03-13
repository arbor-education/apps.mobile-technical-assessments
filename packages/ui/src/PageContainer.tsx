import React from "react";
import type { ComponentProps } from "react";
import { Animated, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, getTokens, Variable } from "tamagui";
import AnimatedNode = Animated.AnimatedNode;

export type PageContainerProps = ComponentProps<typeof YStack> & {
  safeArea?: boolean;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  scrollable?: boolean;
};

const resolveSpaceToken = (
  value: string | number | undefined | null | AnimatedNode | Variable,
): number => {
  if (value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.startsWith("$")) {
    const key = value.slice(1);
    const spaceTokens = getTokens({ prefixed: false }).space;
    const token = spaceTokens[key as keyof typeof spaceTokens];
    return typeof token === "object" && token !== null && "val" in token
      ? (token as { val: number }).val
      : 0;
  }
  return 0;
};

export const PageContainer = ({
  children,
  safeArea,
  safeAreaTop,
  safeAreaBottom,
  scrollable,
  p,
  py,
  px,
  pt,
  pb,
  pl,
  pr,
  ...rest
}: PageContainerProps) => {
  const insets = useSafeAreaInsets();

  const basePaddingTop = resolveSpaceToken(pt ?? py ?? p);
  const basePaddingBottom = resolveSpaceToken(pb ?? py ?? p);
  const basePaddingLeft = resolveSpaceToken(pl ?? px ?? p);
  const basePaddingRight = resolveSpaceToken(pr ?? px ?? p);

  const effectivePaddingTop =
    (safeArea || safeAreaTop ? insets.top : 0) + basePaddingTop;
  const effectivePaddingBottom =
    (safeArea || safeAreaBottom ? insets.bottom : 0) + basePaddingBottom;

  return (
    <YStack
      f={1}
      bg="$background"
      {...rest}
      pt={effectivePaddingTop}
      pb={effectivePaddingBottom}
      pl={basePaddingLeft}
      pr={basePaddingRight}
    >
      {scrollable ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
      ) : (
        children
      )}
    </YStack>
  );
};
