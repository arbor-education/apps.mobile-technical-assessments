import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  activeType: string | null;
  searchText: string | null;
  sortOrder: "id" | "name";
};

const initialState: FilterState = {
  activeType: null,
  searchText: null,
  sortOrder: "id",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.activeType = action.payload;
    },
    clearFilters: (state) => {
      state.activeType = null;
    },
    setSearchText: (state, action: PayloadAction<string | null>) => {
      state.searchText = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"id" | "name">) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setTypeFilter, clearFilters, setSearchText, setSortOrder } =
  filterSlice.actions;
