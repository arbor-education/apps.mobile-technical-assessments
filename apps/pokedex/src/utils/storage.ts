import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();
const TOKENS_KEY = "tokens";

const EXP_DURATION_HOURS = Number(process.env["EXP_DURATION_HOURS"] ?? 24);

type TokenEntry = {
  active: boolean;
  token: string;
};

type ParsedToken = {
  username: string;
  password: string;
  expTimestamp: number;
};

const generateToken = (username: string, password: string): string => {
  const expTimestamp = Date.now() + EXP_DURATION_HOURS * 60 * 60 * 1000;
  return `u=${username},p=${password},exp=${expTimestamp}`;
};

export const parseToken = (token: string): ParsedToken => {
  const match = token.match(/^u=(.+),p=(.+),exp=(\d+)$/);
  if (!match) throw new Error(`Invalid token format: ${token}`);
  return {
    username: match[1],
    password: match[2],
    expTimestamp: Number(match[3]),
  };
};

const getTokens = (): TokenEntry[] => {
  const raw = storage.getString(TOKENS_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as TokenEntry[];
};

const setTokens = (tokens: TokenEntry[]): void => {
  storage.set(TOKENS_KEY, JSON.stringify(tokens));
};

export const storeActiveToken = (username: string, password: string): void => {
  const token = generateToken(username, password);
  const existing = getTokens().map((t) => ({ ...t, active: false }));
  setTokens([...existing, { active: true, token }]);
};

export const getActiveToken = (): TokenEntry | null => {
  return getTokens().find((t) => t.active) ?? null;
};

export const refreshActiveToken = (
  username: string,
  password: string,
): void => {
  const newToken = generateToken(username, password);
  const tokens = getTokens().map((t) =>
    t.active ? { active: true, token: newToken } : t,
  );
  setTokens(tokens);
};

export const deactivateActiveToken = (): void => {
  const tokens = getTokens().map((t) => ({ ...t, active: false }));
  setTokens(tokens);
};

export enum StorageKeys {
  Theme = "Theme",
}

export const setStorageValue = (
  key: StorageKeys,
  value: string | boolean | number,
) => {
  storage.set(key, value);
};

export const getStorageValue = (key: StorageKeys) => {
  return storage.getString(key);
};

export const deleteStorageValue = (key: StorageKeys) => {
  storage.remove(key);
};
