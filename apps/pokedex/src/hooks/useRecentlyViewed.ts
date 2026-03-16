import { useState, useEffect } from "react";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();
const RECENTLY_VIEWED_KEY = "recentlyViewed";
const MAX_RECENTLY_VIEWED = 10;

const getStoredIds = (): string[] => {
  const raw = storage.getString(RECENTLY_VIEWED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (id: string): void => {
  const current = getStoredIds();
  const deduped = [id, ...current.filter((i) => i !== id)].slice(
    0,
    MAX_RECENTLY_VIEWED,
  );
  storage.set(RECENTLY_VIEWED_KEY, JSON.stringify(deduped));
};

export const clearRecentlyViewed = (): void => {
  storage.remove(RECENTLY_VIEWED_KEY);
};

export const useRecentlyViewed = () => {
  const [ids, setIds] = useState<string[]>(getStoredIds);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((key) => {
      if (key === RECENTLY_VIEWED_KEY) {
        setIds(getStoredIds());
      }
    });
    return () => listener.remove();
  }, []);

  return { ids };
};
