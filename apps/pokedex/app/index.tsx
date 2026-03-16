import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@pokedex/hooks/useAuth";

export default function Index() {
  const { isAuthenticated, checkPersistedToken } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void checkPersistedToken().then(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <Redirect href={isAuthenticated ? "/(tabs)/pokedex" : "/login"} />;
}
