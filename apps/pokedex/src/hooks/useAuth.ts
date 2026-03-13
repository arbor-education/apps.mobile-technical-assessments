import { useAppDispatch, useAppSelector } from "@pokedex/store";
import { setAuthenticated, clearUser } from "@pokedex/store/userSlice";
import { database } from "@arbor-apps/db";
import { Q } from "@nozbe/watermelondb";

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
    return true;
  };

  const logout = () => {
    dispatch(clearUser());
  };

  return { isAuthenticated, userId, login, logout };
};
