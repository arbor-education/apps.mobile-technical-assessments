import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getStorageValue,
  setStorageValue,
  StorageKeys,
} from "@pokedex/utils/storage";

type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: (getStorageValue(StorageKeys.Theme) as ThemeMode) || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      const newState = state.mode === "light" ? "dark" : "light";
      state.mode = newState;
      setStorageValue(StorageKeys.Theme, newState);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
