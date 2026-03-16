import React from "react";
import { PokemonStatus } from "@arbor-apps/ui";
import { useTranslation } from "@arbor-apps/translations";

type StatusIndicatorProps = {
  status?: string | null;
};

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <PokemonStatus
      status={status}
      label={t(`pokemon.status.${status || "notStarted"}`)}
    />
  );
};
