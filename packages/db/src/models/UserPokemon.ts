import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { Pokemon } from "./Pokemon";
import { User } from "./User";

export type UserPokemonStatus = "hunting" | "caught" | "shiny" | "ignored";

export const USER_POKEMON_STATUSES: readonly UserPokemonStatus[] = [
  "hunting",
  "caught",
  "shiny",
  "ignored",
] as const;

export class UserPokemon extends Model {
  static table = "user_pokemon";

  static associations = {
    pokemon: { type: "belongs_to" as const, key: "pokemon_id" },
    users: { type: "belongs_to" as const, key: "user_id" },
  };

  @field("pokemon_id") pokemonId!: string;
  @field("user_id") userId!: string;
  @field("status") status!: UserPokemonStatus;

  @relation("pokemon", "pokemon_id") pokemon!: Relation<Pokemon>;
  @relation("users", "user_id") user!: Relation<User>;
}
