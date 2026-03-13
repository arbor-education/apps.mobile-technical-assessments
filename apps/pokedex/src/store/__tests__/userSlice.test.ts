import {
  userSlice,
  setAuthenticated,
  clearUser,
} from "@pokedex/store/userSlice";

const { reducer } = userSlice;

describe("userSlice reducer", () => {
  it("has initial state unauthenticated with null userId", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.isAuthenticated).toBe(false);
    expect(state.userId).toBeNull();
  });

  it("setAuthenticated sets both isAuthenticated and userId", () => {
    const state = reducer(
      undefined,
      setAuthenticated({ isAuthenticated: true, userId: "user-123" }),
    );
    expect(state.isAuthenticated).toBe(true);
    expect(state.userId).toBe("user-123");
  });

  it("clearUser resets to initial unauthenticated state", () => {
    const authenticated = reducer(
      undefined,
      setAuthenticated({ isAuthenticated: true, userId: "user-123" }),
    );
    const state = reducer(authenticated, clearUser());
    expect(state.isAuthenticated).toBe(false);
    expect(state.userId).toBeNull();
  });
});
