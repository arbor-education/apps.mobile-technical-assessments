import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "@arbor-apps/translations";
import { Text, TypeIcon, useTheme } from "@arbor-apps/ui";
import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setTypeFilter, clearFilters } from "@pokedex/store/filterSlice";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export const TypeFilterChips = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeType = useAppSelector((state) => state.filter.activeType);
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      <TouchableOpacity
        onPress={() => dispatch(clearFilters())}
        style={[
          styles.chip,
          {
            backgroundColor:
              activeType === null ? theme.primary.val : theme.background.val,
            borderColor: theme.borderColor.val,
          },
        ]}
      >
        <Text
          variant="p4"
          fow="700"
          c={activeType === null ? "$background" : "$color"}
        >
          {t("pokemon.allTypes")}
        </Text>
      </TouchableOpacity>

      {POKEMON_TYPES.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => dispatch(setTypeFilter(type))}
          style={[
            styles.chip,
            {
              backgroundColor:
                activeType === type ? theme.primary.val : theme.background.val,
              borderColor: theme.borderColor.val,
            },
          ]}
        >
          <TypeIcon type={type} size={20} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const CHIP_SIZE = 45;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    width: CHIP_SIZE,
    height: CHIP_SIZE,
    borderRadius: CHIP_SIZE / 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
