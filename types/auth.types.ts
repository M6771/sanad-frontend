export interface User {
  id: string;
  name: string;
  email: string;
  phone?: number;
  location?: string;
  language?: string;
}

export interface LoginRequest {
  email: string;
  password: number | string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: number | string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ParentProfile {
  name: string;
  phone: number;
  location: string;
  language: string;
}
