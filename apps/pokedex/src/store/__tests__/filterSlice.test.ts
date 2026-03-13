import {
  filterSlice,
  setTypeFilter,
  clearFilters,
} from "@pokedex/store/filterSlice";

const { reducer } = filterSlice;

describe("filterSlice reducer", () => {
  it("has initial state with null activeType", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.activeType).toBeNull();
  });

  it("setTypeFilter sets the active type", () => {
    const state = reducer(undefined, setTypeFilter("fire"));
    expect(state.activeType).toBe("fire");
  });

  it("clearFilters resets activeType to null", () => {
    const withFilter = reducer(undefined, setTypeFilter("water"));
    const state = reducer(withFilter, clearFilters());
    expect(state.activeType).toBeNull();
  });
});
