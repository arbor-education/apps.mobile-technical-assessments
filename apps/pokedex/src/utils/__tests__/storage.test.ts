import {
  parseToken,
  storeActiveToken,
  getActiveToken,
  deactivateActiveToken,
} from "@pokedex/utils/storage";

describe("parseToken", () => {
  it("round-trips username and password", () => {
    const result = parseToken("u=alice,p=secret123,exp=9999999999000");
    expect(result.username).toBe("alice");
    expect(result.password).toBe("secret123");
    expect(result.expTimestamp).toBe(9999999999000);
  });

  it("throws on malformed token", () => {
    expect(() => parseToken("invalid")).toThrow("Invalid token format");
  });
});

describe("storeActiveToken / getActiveToken", () => {
  it("stores a token and retrieves it as active", () => {
    storeActiveToken("alice", "pass");
    const entry = getActiveToken();
    expect(entry).not.toBeNull();
    const parsed = parseToken(entry!.token);
    expect(parsed.username).toBe("alice");
    expect(parsed.password).toBe("pass");
  });
});

describe("deactivateActiveToken", () => {
  it("clears the active flag so getActiveToken returns null", () => {
    storeActiveToken("bob", "pw");
    deactivateActiveToken();
    expect(getActiveToken()).toBeNull();
  });
});
