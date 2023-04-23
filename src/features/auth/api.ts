import { axiosInstance } from "@/shared/configs/axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/register", {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const me = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};
