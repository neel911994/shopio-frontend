import { apiClient } from "./api";
export type { TopProduct, LowStockProduct, DashboardStats } from "@/config/model";
import type { DashboardStats } from "@/config/model";

export const dashboardService = {
  getStats: () => apiClient.get<DashboardStats>("/dashboard"),
};
