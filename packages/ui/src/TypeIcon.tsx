import { GetThemeValueForKey, XStack, YStack } from "tamagui";
import * as TypeIcons from "./svg/types";
import { FC } from "react";
import React from "react";
import { SvgProps } from "react-native-svg";

type TypeIconProps = {
  width?: number;
  height?: number;
  type: string;
};

const TYPE_MAP: Record<string, { icon: FC<SvgProps>; bg: string }> = {
  bug: {
    icon: TypeIcons.BugIcon,
    bg: "#93BC2D",
  },
  dark: {
    icon: TypeIcons.DarkIcon,
    bg: "#595762",
  },
  dragon: {
    icon: TypeIcons.DragonIcon,
    bg: "#0C6AC8",
  },
  electric: {
    icon: TypeIcons.ElectricIcon,
    bg: "#F2D94E",
  },
  fairy: {
    icon: TypeIcons.FairyIcon,
    bg: "#EF90E6",
  },
  fighting: {
    icon: TypeIcons.FightingIcon,
    bg: "#D34260",
  },
  fire: {
    icon: TypeIcons.FireIcon,
    bg: "#FBA54D",
  },
  flying: {
    icon: TypeIcons.FlyingIcon,
    bg: "#A1BBEC",
  },
  ghost: {
    icon: TypeIcons.GhostIcon,
    bg: "#5F6DBC",
  },
  grass: {
    icon: TypeIcons.GrassIcon,
    bg: "#60BD58",
  },
  ground: {
    icon: TypeIcons.GroundIcon,
    bg: "#DA7C4C",
  },
  ice: {
    icon: TypeIcons.IceIcon,
    bg: "#76D0C1",
  },
  normal: {
    icon: TypeIcons.NormalIcon,
    bg: "#A0A29E",
  },
  poison: {
    icon: TypeIcons.PoisonIcon,
    bg: "#B764CF",
  },
  psychic: {
    icon: TypeIcons.PsychicIcon,
    bg: "#FA8581",
  },
  rock: {
    icon: TypeIcons.RockIcon,
    bg: "#C9BC8A",
  },
  steel: {
    icon: TypeIcons.SteelIcon,
    bg: "#5795A3",
  },
water: {
    icon: TypeIcons.WaterIcon,
    bg: "#549CDF",
  },
};

export const TypeIcon = ({ width = 40, height = 40, type }: TypeIconProps) => {
  const map = TYPE_MAP[type];
  if (!map) return null;

  const { icon: Icon, bg } = map;

  return (
    <XStack
      items="center"
      justify="center"
      bg={bg as unknown as GetThemeValueForKey<"bg">}
      p="$2"
      br={width}
    >
      <YStack>
        <Icon width={width} height={height} />
      </YStack>
    </XStack>
  );
};
