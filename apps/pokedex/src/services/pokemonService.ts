import { database } from "@arbor-apps/db";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon, UserPokemon } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";
import { useAppSelector } from "@pokedex/store";

export type PokemonWithUserPokemon = Pokemon & {
  userPokemon: UserPokemon | null;
};

const buildTypeQuery = (type: string) =>
  Q.or(Q.where("type1", type), Q.where("type2", type));

export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  list: (
    userId: string | null,
    activeType: string | null,
    searchText: string | null,
  ) => ["pokemon", "list", userId, activeType, searchText] as const,
  detail: (id: string) => ["pokemon", id] as const,
  byType: (type: string) => ["pokemon", "type", type] as const,
  byIds: (ids: string[]) => ["pokemon", "byIds", ids] as const,
};

const buildNameQuery = (searchText: string) =>
  Q.where("name", Q.like(`%${Q.sanitizeLikeString(searchText)}%`));

export const usePokemonList = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const activeType = useAppSelector((state) => state.filter.activeType);
  const searchText = useAppSelector((state) => state.filter.searchText);
  const sortOrder = useAppSelector((state) => state.filter.sortOrder);
  return useQuery({
    queryKey: pokemonQueryKeys.list(userId, activeType, searchText),
    structuralSharing: false,
    queryFn: async () => {
      const conditions = [];
      if (activeType) conditions.push(buildTypeQuery(activeType));
      if (searchText) conditions.push(buildNameQuery(searchText));
      const pokemonQuery =
        conditions.length > 0
          ? database.get<Pokemon>("pokemon").query(Q.and(...conditions))
          : database.get<Pokemon>("pokemon").query();
      const pokemon = await pokemonQuery.fetch();
      const userPokemonList = userId
        ? await database
            .get<UserPokemon>("user_pokemon")
            .query(Q.where("user_id", userId))
            .fetch()
        : [];
      const userPokemonMap = new Map(
        userPokemonList.map((up) => [up.pokemonId, up]),
      );
      const result = pokemon.map((p) =>
        Object.assign(p, { userPokemon: userPokemonMap.get(p.id) ?? null }),
      ) as PokemonWithUserPokemon[];

      if (sortOrder === "name") {
        result.sort((a, b) => a.id.localeCompare(b.id));
      } else {
        result.sort((a, b) => a.id.localeCompare(b.id));
      }

      return result;
    },
  });
};

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
      database.get<Pokemon>("pokemon").query(buildTypeQuery(type)).fetch(),
    enabled: !!type,
  });

export const usePokemonsByIds = (ids: string[]) =>
  useQuery({
    queryKey: pokemonQueryKeys.byIds(ids),
    queryFn: async () => {
      if (ids.length === 0) return [];
      const results = await Promise.all(
        ids.map((id) =>
          database
            .get<Pokemon>("pokemon")
            .find(id)
            .catch(() => null),
        ),
      );
      const pokemonById = new Map(
        results.filter((p): p is Pokemon => p !== null).map((p) => [p.id, p]),
      );
      return ids
        .map((id) => pokemonById.get(id))
        .filter((p): p is Pokemon => p !== null);
    },
    enabled: ids.length > 0,
  });
