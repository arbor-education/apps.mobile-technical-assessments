import { renderHook } from "@testing-library/react-native";
import {
  addRecentlyViewed,
  clearRecentlyViewed,
  useRecentlyViewed,
} from "@pokedex/hooks/useRecentlyViewed";

beforeEach(() => {
  clearRecentlyViewed();
});

describe("addRecentlyViewed", () => {
  it("adds an id to the list", () => {
    addRecentlyViewed("101");
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.ids).toContain("101");
  });

  it("deduplication moves existing id to front", () => {
    addRecentlyViewed("1");
    addRecentlyViewed("2");
    addRecentlyViewed("1");
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.ids[0]).toBe("1");
    expect(result.current.ids).toHaveLength(2);
  });

  it("truncates list to 10 items", () => {
    for (let i = 1; i <= 20; i++) {
      addRecentlyViewed(String(i));
    }
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.ids).toHaveLength(10);
  });
});

describe("clearRecentlyViewed", () => {
  it("empties the list", () => {
    addRecentlyViewed("1");
    clearRecentlyViewed();
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.ids).toHaveLength(0);
  });
});
