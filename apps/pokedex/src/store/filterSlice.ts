import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  activeType: string | null;
};

const initialState: FilterState = {
  activeType: null,
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
  },
});

export const { setTypeFilter, clearFilters } = filterSlice.actions;
