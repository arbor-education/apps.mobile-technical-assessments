import { database, Pokemon, User } from "@arbor-apps/db";
import SEED_POKEMON from "./pokedex.json";
import SEED_USERS from "./users.json";

export const seedDatabase = async (): Promise<void> => {
  const existingUsers = await database.collections
    .get<User>("users")
    .query()
    .fetch();

  const existingPokemon = await database.collections
    .get<Pokemon>("pokemon")
    .query()
    .fetch();

  if (existingUsers.length === 0) {
    await database.write(async () => {
      await Promise.all(
        SEED_USERS.map(({ username, password }) =>
          database.collections.get<User>("users").create((user) => {
            user.username = username;
            user.password = password;
          }),
        ),
      );
    });
  }

  if (existingPokemon.length === 0) {
    await database.write(async () => {
      await Promise.all(
        SEED_POKEMON.map(({ type1, type2, name, sprite, shinySprite }) =>
          database.collections.get<Pokemon>("pokemon").create((pokemon) => {
            pokemon.name = name;
            pokemon.type1 = type1;
            pokemon.type2 = type2;

            if (sprite) pokemon.spriteUrl = sprite;
            if (shinySprite) pokemon.shinySpriteUrl = shinySprite;
          }),
        ),
      );
    });
  }
};
