import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userSlice } from "./userSlice";
import { themeSlice } from "./themeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) => {
    if (__DEV__) {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      const reactotron = require("../reactotron").default;
      return getDefaultEnhancers().concat(reactotron.createEnhancer());
    } else {
      return getDefaultEnhancers();
    }
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
