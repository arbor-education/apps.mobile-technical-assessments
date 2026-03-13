import { database } from "@arbor-apps/db";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon, UserPokemon } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";
import { useAppSelector } from "@pokedex/store";

export type PokemonWithUserPokemon = Pokemon & {
  userPokemon: UserPokemon | null;
};

export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  list: (userId: string | null) => ["pokemon", "list", userId] as const,
  detail: (id: string) => ["pokemon", id] as const,
  byType: (type: string) => ["pokemon", "type", type] as const,
};

export const usePokemonList = () => {
  const userId = useAppSelector((state) => state.user.userId);
  return useQuery({
    queryKey: pokemonQueryKeys.list(userId),
    queryFn: async () => {
      const pokemon = await database.get<Pokemon>("pokemon").query().fetch();
      const userPokemonList = userId
        ? await database
            .get<UserPokemon>("user_pokemon")
            .query(Q.where("user_id", userId))
            .fetch()
        : [];
      const userPokemonMap = new Map(
        userPokemonList.map((up) => [up.pokemonId, up]),
      );
      return pokemon.map((p) =>
        Object.assign(p, { userPokemon: userPokemonMap.get(p.id) ?? null }),
      ) as PokemonWithUserPokemon[];
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
      database
        .get<Pokemon>("pokemon")
        .query(Q.or(Q.where("type1", type), Q.where("type2", type)))
        .fetch(),
    enabled: !!type,
  });
