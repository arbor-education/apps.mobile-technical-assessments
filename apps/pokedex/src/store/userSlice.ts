import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  isAuthenticated: boolean;
  userId: string | null;
};

const initialState: UserState = {
  isAuthenticated: false,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<UserState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { setAuthenticated, clearUser } = userSlice.actions;
