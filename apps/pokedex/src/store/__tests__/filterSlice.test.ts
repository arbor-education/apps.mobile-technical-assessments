import {
  filterSlice,
  setTypeFilter,
  clearFilters,
  setSearchText,
  setSortOrder,
} from "@pokedex/store/filterSlice";

const { reducer } = filterSlice;

describe("filterSlice reducer", () => {
  it("has correct initial state", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.activeType).toBeNull();
    expect(state.searchText).toBeNull();
    expect(state.sortOrder).toBe("id");
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

  it("setSearchText sets the search text", () => {
    const state = reducer(undefined, setSearchText("bulb"));
    expect(state.searchText).toBe("bulb");
  });

  it("setSearchText accepts null to clear search", () => {
    const withSearch = reducer(undefined, setSearchText("char"));
    const state = reducer(withSearch, setSearchText(null));
    expect(state.searchText).toBeNull();
  });

  it("setSortOrder sets the sort order", () => {
    const state = reducer(undefined, setSortOrder("name"));
    expect(state.sortOrder).toBe("name");
  });

  it("setSortOrder can toggle back to id", () => {
    const withName = reducer(undefined, setSortOrder("name"));
    const state = reducer(withName, setSortOrder("id"));
    expect(state.sortOrder).toBe("id");
  });
});
