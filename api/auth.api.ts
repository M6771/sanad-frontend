import instance from "./axios";
import { LoginRequest, RegisterRequest, ForgotPasswordRequest } from "../types/auth.types";

export const login = async (data: LoginRequest) => {
  const response = await instance.post("/auth/login", data);
  return response;
};

export const register = async (data: RegisterRequest) => {
  const response = await instance.post("/auth/register", data);
  return response;
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const response = await instance.post("/auth/forgot-password", data);
  return response;
};

export const logout = async () => {
  await instance.post("/auth/logout");
};
