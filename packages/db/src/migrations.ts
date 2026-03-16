import {
  addColumns,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

/**
 * Add new migration objects here as the schema evolves.
 * Example:
 * {
 *   toVersion: 2,
 *   steps: [
 *     addColumns({ table: 'pokemon', columns: [{ name: 'height', type: 'number' }] }),
 *   ],
 * }
 */
export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: "pokemon",
          columns: [
            { name: "shiny_sprite_url", type: "string", isOptional: true },
          ],
        }),
      ],
    },
  ],
});
