import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "./schema";
import { migrations } from "./migrations";
import { User } from "./models/User";
import { Pokemon } from "./models/Pokemon";
import { UserPokemon } from "./models/UserPokemon";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "pokedex",
  jsi: true,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Pokemon, UserPokemon],
});
