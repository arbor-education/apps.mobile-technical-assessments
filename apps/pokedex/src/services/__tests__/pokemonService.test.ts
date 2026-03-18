jest.mock("@arbor-apps/db", () => ({ database: {} }));
jest.mock("@pokedex/store", () => ({
  useAppSelector: jest.fn(),
}));

import { pokemonQueryKeys } from "@pokedex/services/pokemonService";

describe("pokemonQueryKeys", () => {
  describe("list", () => {
    it("returns correct shape with userId, activeType and searchText", () => {
      expect(pokemonQueryKeys.list("user-1", "fire", "bulb")).toEqual([
        "pokemon",
        "list",
        "user-1",
        "fire",
        "bulb",
      ]);
    });

    it("returns correct shape with null values", () => {
      expect(pokemonQueryKeys.list(null, null, null)).toEqual([
        "pokemon",
        "list",
        null,
        null,
        null,
      ]);
    });

    it("includes searchText in key so search changes invalidate cache", () => {
      const withSearch = pokemonQueryKeys.list("user-1", null, "pika");
      const withoutSearch = pokemonQueryKeys.list("user-1", null, null);
      expect(withSearch).not.toEqual(withoutSearch);
    });
  });

  describe("detail", () => {
    it("returns correct shape", () => {
      expect(pokemonQueryKeys.detail("42")).toEqual(["pokemon", "42"]);
    });
  });

  describe("byIds", () => {
    it("returns correct shape", () => {
      expect(pokemonQueryKeys.byIds(["1", "2", "3"])).toEqual([
        "pokemon",
        "byIds",
        ["1", "2", "3"],
      ]);
    });

    it("returns correct shape for empty array", () => {
      expect(pokemonQueryKeys.byIds([])).toEqual(["pokemon", "byIds", []]);
    });
  });
});
