import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { toggleTheme, setTheme } from "@pokedex/store/themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    isDark: mode === "dark",
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (m: "light" | "dark") => dispatch(setTheme(m)),
  };
};
