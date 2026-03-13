import React from "react";
import { ScrollView } from "react-native";
import { useTranslation } from "@arbor-apps/translations";
import { Text, TypeIcon, XStack, POKEMON_TYPES } from "@arbor-apps/ui";
import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setTypeFilter, clearFilters } from "@pokedex/store/filterSlice";

const CHIP_SIZE = 45;

export const TypeFilterChips = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeType = useAppSelector((state) => state.filter.activeType);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
      style={{ flexGrow: 0 }}
    >
      <XStack
        width={CHIP_SIZE}
        height={CHIP_SIZE}
        br={CHIP_SIZE / 2}
        bow={1}
        boc="$borderColor"
        bg={activeType === null ? "$primary" : "$background"}
        items="center"
        justify="center"
        onPress={() => dispatch(clearFilters())}
        pressStyle={{ opacity: 0.7 }}
      >
        <Text
          variant="p4"
          fow="700"
          c={activeType === null ? "$background" : "$color"}
        >
          {t("pokemon.allTypes")}
        </Text>
      </XStack>

      {POKEMON_TYPES.map((type) => (
        <XStack
          key={type}
          width={CHIP_SIZE}
          height={CHIP_SIZE}
          br={CHIP_SIZE / 2}
          bow={1}
          boc="$borderColor"
          bg={activeType === type ? "$primary" : "$background"}
          items="center"
          justify="center"
          onPress={() => dispatch(setTypeFilter(type))}
          pressStyle={{ opacity: 0.7 }}
        >
          <TypeIcon type={type} size={20} />
        </XStack>
      ))}
    </ScrollView>
  );
};
