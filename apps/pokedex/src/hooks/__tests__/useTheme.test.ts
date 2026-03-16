import { setTheme, themeSlice, toggleTheme } from "@pokedex/store/themeSlice";
import { getStorageValue, StorageKeys } from "@pokedex/utils/storage";

const { reducer } = themeSlice;

describe("useTheme", () => {
  it("isDark is false by default (initial mode is light)", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.mode).toBe("light");
    expect(state.mode === "dark").toBe(false);
  });

  it("toggleTheme action switches mode from light to dark", () => {
    const state = reducer(undefined, toggleTheme());
    expect(state.mode).toBe("dark");
  });

  it("toggleTheme action switches mode from dark to light", () => {
    const darkState = reducer({ mode: "dark" }, toggleTheme());
    expect(darkState.mode).toBe("light");
  });

  it("setTheme sets mode directly", () => {
    const state = reducer(undefined, setTheme("dark"));
    expect(state.mode).toBe("dark");
  });

  it("setTheme persists theme", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.mode).toBe("light");
    const storageTheme = getStorageValue(StorageKeys.Theme);
    expect(storageTheme).toBe("light");
    const newState = reducer(undefined, toggleTheme());
    expect(newState.mode).toBe("dark");
    const newStorageTheme = getStorageValue(StorageKeys.Theme);
    expect(newStorageTheme).toBe("dark");
  });
});
