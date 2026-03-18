import React from "react";
import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setSearchText } from "@pokedex/store/filterSlice";
import { SearchBarInput } from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";
import { useDebounce } from "@pokedex/hooks/useDebounce";

export const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.filter.searchText);

  const debouncedDispatch = useDebounce(
    (text: unknown) => dispatch(setSearchText((text as string) || null)),
    300,
  );

  return (
    <SearchBarInput
      value={searchText ?? ""}
      onChangeText={debouncedDispatch}
      placeholder={t("pokemon.searchPlaceholder")}
    />
  );
};
