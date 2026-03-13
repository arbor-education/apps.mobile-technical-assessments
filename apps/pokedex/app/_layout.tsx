import "@arbor-apps/translations";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@arbor-apps/ui";
import { store, useAppSelector } from "@pokedex/store";
import { seedDatabase } from "@pokedex/seed";

const queryClient = new QueryClient();

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const mode = useAppSelector((state) => state.theme.mode);
  return <AppProvider theme={mode}>{children}</AppProvider>;
};

export default function RootLayout() {
  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="pokemon/[id]" options={{ title: "" }} />
          </Stack>
        </ThemeWrapper>
      </QueryClientProvider>
    </Provider>
  );
}
