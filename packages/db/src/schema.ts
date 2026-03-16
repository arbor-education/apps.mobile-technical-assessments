import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "username", type: "string" },
        { name: "password", type: "string" },
      ],
    }),
    tableSchema({
      name: "pokemon",
      columns: [
        { name: "name", type: "string" },
        { name: "type1", type: "string" },
        { name: "type2", type: "string", isOptional: true },
        { name: "sprite_url", type: "string" },
        { name: "shiny_sprite_url", type: "string" },
      ],
    }),
    tableSchema({
      name: "user_pokemon",
      columns: [
        { name: "pokemon_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "status", type: "string" },
      ],
    }),
  ],
});
