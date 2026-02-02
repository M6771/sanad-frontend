import {
  ForgotPasswordRequest,
  LoginRequest,
  ParentProfile,
  RegisterRequest,
} from "../types/auth.types";
import instance from "./axios";

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

// Parent Profile API
export const getParentProfile = async (): Promise<ParentProfile> => {
  const response = await instance.get("/auth/profile");
  return response.data;
};

export const updateParentProfile = async (
  data: ParentProfile
): Promise<ParentProfile> => {
  const response = await instance.put("/auth/profile", data);
  return response.data;
};
