import { database } from "@arbor-apps/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Q } from "@nozbe/watermelondb";
import type { UserPokemon, UserPokemonStatus } from "@arbor-apps/db";
import {
  pokemonQueryKeys,
  type PokemonWithUserPokemon,
} from "./pokemonService";
import { useAppSelector } from "@pokedex/store";

const findUserPokemon = (userId: string, pokemonId: string) =>
  database
    .get<UserPokemon>("user_pokemon")
    .query(Q.where("user_id", userId), Q.where("pokemon_id", pokemonId))
    .fetch();

export const userPokemonQueryKeys = {
  byUser: (userId: string) => ["user_pokemon", userId] as const,
  byUserAndPokemon: (userId: string, pokemonId: string) =>
    ["user_pokemon", userId, pokemonId] as const,
};

export const useUserPokemon = (userId: string, pokemonId: string) =>
  useQuery({
    queryKey: userPokemonQueryKeys.byUserAndPokemon(userId, pokemonId),
    queryFn: () =>
      findUserPokemon(userId, pokemonId).then((results) => results[0] ?? null),
    enabled: !!userId && !!pokemonId,
  });

export const useUpdatePokemonStatus = () => {
  const queryClient = useQueryClient();
  const activeType = useAppSelector((state) => state.filter.activeType);

  return useMutation({
    mutationFn: async ({
      userId,
      pokemonId,
      status,
    }: {
      userId: string;
      pokemonId: string;
      status: UserPokemonStatus;
    }): Promise<UserPokemon> => {
      const collection = database.get<UserPokemon>("user_pokemon");
      const existing = await findUserPokemon(userId, pokemonId);

      return database.write(async () => {
        if (existing.length > 0) {
          return existing[0].update((record) => {
            record.status = status;
          });
        }
        return collection.create((record) => {
          record.userId = userId;
          record.pokemonId = pokemonId;
          record.status = status;
        });
      });
    },
    onSuccess: (userPokemon, { userId, pokemonId }) => {
      queryClient.setQueryData(
        userPokemonQueryKeys.byUserAndPokemon(userId, pokemonId),
        userPokemon,
      );
      queryClient.setQueryData(
        pokemonQueryKeys.list(userId, activeType),
        (old: PokemonWithUserPokemon[] | undefined) =>
          old?.map((p) => {
            if (p.id !== pokemonId) return p;
            return Object.assign(p, { userPokemon });
          }),
      );
    },
  });
};
