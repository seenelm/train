import { api } from "../api";

export const register = async (data: any) => {
  try {
    return await api.post("/register", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (data: any) => {
  return await api.post("/login", data);
};

