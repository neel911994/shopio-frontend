import { apiClient } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>("/auth/login", payload),
};
