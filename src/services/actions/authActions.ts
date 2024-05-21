import { useMutation } from "react-query";
import { register, login } from "../api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => register(data),
    onError: (error) => {
      console.error("useRegister mutation error: ", error);
    },
  });
  }

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: any) => login(data),
    onError: (error) => {
      console.error("useLogin mutation error: ", error);
    },
  });
}

