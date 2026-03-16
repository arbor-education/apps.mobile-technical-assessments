import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import { database, schema } from "@arbor-apps/db";
import { seedDatabase } from "@pokedex/seed";

Reactotron.configure({ name: "Pokedex" })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

Reactotron.onCustomCommand({
  command: "logDatabase",
  title: "Log Database",
  description: "Logs all WatermelonDB collections as JSON",
  handler: async () => {
    const [users, pokemon, userPokemon] = await Promise.all([
      database.collections.get("users").query().fetch(),
      database.collections.get("pokemon").query().fetch(),
      database.collections.get("user_pokemon").query().fetch(),
    ]);

    Reactotron.log?.({
      users: users.map((r) => r._raw),
      pokemon: pokemon.map((r) => r._raw),
      userPokemon: userPokemon.map((r) => r._raw),
    });
  },
});

Reactotron.onCustomCommand({
  command: "resetDatabase",
  title: "Reset Database",
  description: "Wipes all WatermelonDB data and re-runs seed",
  handler: async () => {
    await database.write(async () => {
      await database.unsafeResetDatabase();
    });
    await seedDatabase();
    Reactotron.log?.("Database reset and reseeded");
  },
});

Reactotron.onCustomCommand({
  command: "logSchema",
  title: "Log Schema",
  description: "Logs the current WatermelonDB schema as JSON",
  handler: () => {
    Reactotron.log?.(schema);
  },
});

export default Reactotron;
