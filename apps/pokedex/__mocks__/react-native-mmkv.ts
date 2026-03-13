const createStore = () => {
  const store = new Map<string, string | boolean | number>();
  const listeners: Array<(key: string) => void> = [];

  return {
    getString: (key: string): string | undefined => {
      const val = store.get(key);
      return typeof val === "string" ? val : undefined;
    },
    set: (key: string, value: string | boolean | number): void => {
      store.set(key, value);
      listeners.forEach((l) => l(key));
    },
    remove: (key: string): void => {
      store.delete(key);
      listeners.forEach((l) => l(key));
    },
    addOnValueChangedListener: (listener: (key: string) => void) => {
      listeners.push(listener);
      return {
        remove: () => {
          const idx = listeners.indexOf(listener);
          if (idx > -1) listeners.splice(idx, 1);
        },
      };
    },
  };
};

export const createMMKV = () => createStore();
