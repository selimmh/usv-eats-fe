import { atom, useAtom } from "jotai";
import { login, me, register } from "./api";
import { AuthState, User } from "./types";
import { useLocalStorage } from "@mantine/hooks";

export const authAtom = atom<AuthState>({
  user: null,
  loading: false,
  error: null,
});

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const [, setToken] = useLocalStorage<string>({
    key: "token",
    defaultValue: "",
  });

  const loginAsync = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await login(email, password);
      setAuth((prev) => ({ ...prev, user: data?.user, loading: false }));
      setToken(data.token);
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        error: error as any,
        loading: false,
        user: null,
      }));
      throw error;
    }
  };

  const registerAsync = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await register(email, password);
      setAuth((prev) => ({ ...prev, user: data?.user, loading: false }));
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        error: error as any,
        loading: false,
        user: null,
      }));
      throw error;
    }
  };

  const logoutAsync = async () => {
    localStorage.removeItem("token");
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    window.location.reload();
  };

  const meAsync = async () => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await me();
      setAuth((prev) => ({ ...prev, user: data?.user, loading: false }));
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        error: error as any,
        loading: false,
        user: null,
      }));
      throw error;
    }
  };

  return { auth, loginAsync, registerAsync, logoutAsync, meAsync };
};
