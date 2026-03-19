import { apiClient } from "./api";
export type { LoginPayload, AuthUser, LoginResponse } from "@/config/model";
import type { LoginPayload, LoginResponse } from "@/config/model";

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>("/auth/login", payload),
};