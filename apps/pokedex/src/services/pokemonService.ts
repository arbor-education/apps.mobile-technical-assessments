import { database } from "@arbor-apps/db";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";

export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  detail: (id: string) => ["pokemon", id] as const,
  byType: (type: string) => ["pokemon", "type", type] as const,
};

export const usePokemonList = () =>
  useQuery({
    queryKey: pokemonQueryKeys.all,
    queryFn: () => database.get<Pokemon>("pokemon").query().fetch(),
  });

export const usePokemonById = (id: string) =>
  useQuery({
    queryKey: pokemonQueryKeys.detail(id),
    queryFn: () => database.get<Pokemon>("pokemon").find(id),
    enabled: !!id,
  });

export const usePokemonByType = (type: string) =>
  useQuery({
    queryKey: pokemonQueryKeys.byType(type),
    queryFn: () =>
      database
        .get<Pokemon>("pokemon")
        .query(Q.or(Q.where("type1", type), Q.where("type2", type)))
        .fetch(),
    enabled: !!type,
  });
