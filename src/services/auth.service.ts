import { apiClient } from "./api";
export type { LoginPayload, AuthUser, LoginResponse } from "@/models/model";
import type { LoginPayload, LoginResponse } from "@/models/model";

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>("/auth/login", payload),
};