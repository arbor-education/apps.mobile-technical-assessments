import React from "react";
import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setSortOrder } from "@pokedex/store/filterSlice";
import { Button } from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";

export const SortButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector((state) => state.filter.sortOrder);

  const toggle = () => {
    dispatch(setSortOrder(sortOrder === "id" ? "name" : "id"));
  };

  return (
    <Button
      variant="outline"
      onClick={toggle}
      text={
        sortOrder === "id" ? t("pokemon.sortByName") : t("pokemon.sortById")
      }
    ></Button>
  );
};
