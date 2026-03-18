import React from "react";
import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setSearchText } from "@pokedex/store/filterSlice";
import { SearchBarInput } from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";

export const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.filter.searchText);

  return (
    <SearchBarInput
      value={searchText ?? ""}
      onChangeText={(text) => dispatch(setSearchText(text || null))}
      placeholder={t("pokemon.searchPlaceholder")}
    />
  );
};
