import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setAuthenticated, clearUser } from "@pokedex/store/userSlice";
import { database } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";
import {
  storeActiveToken,
  deactivateActiveToken,
  getActiveToken,
  refreshActiveToken,
  parseToken,
} from "@pokedex/utils/storage";
import { clearRecentlyViewed } from "@pokedex/hooks/useRecentlyViewed";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, userId } = useAppSelector((state) => state.user);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const users = await database
      .get("users")
      .query(Q.where("username", username), Q.where("password", password))
      .fetch();

    if (users.length === 0) return false;

    dispatch(setAuthenticated({ isAuthenticated: true, userId: users[0].id }));
    storeActiveToken(username, password);
    return true;
  };

  const logout = () => {
    deactivateActiveToken();
    clearRecentlyViewed();
    dispatch(clearUser());
  };

  const checkPersistedToken = async (): Promise<void> => {
    const entry = getActiveToken();
    if (!entry) return;

    const { username, password, expTimestamp } = parseToken(entry.token);

    const users = await database
      .get("users")
      .query(Q.where("username", username), Q.where("password", password))
      .fetch();

    if (users.length === 0) {
      deactivateActiveToken();
      return;
    }

    if (Date.now() > expTimestamp) {
      refreshActiveToken(username, password);
    }

    dispatch(setAuthenticated({ isAuthenticated: true, userId: users[0].id }));
  };

  return { isAuthenticated, userId, login, logout, checkPersistedToken };
};
