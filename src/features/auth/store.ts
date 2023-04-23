import { atom, useAtom } from "jotai";
import { login, logout, me, register } from "./api";
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
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await logout();
      setAuth((prev) => ({ ...prev, user: null, loading: false }));
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        error: error as any,
        loading: false,
        user: null,
      }));
    }
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
