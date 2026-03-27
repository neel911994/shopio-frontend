import { apiClient } from "./api";
export type { TopProduct, LowStockProduct, DashboardStats } from "@/models/model";
import type { DashboardStats } from "@/models/model";

export const dashboardService = {
  getStats: () => apiClient.get<DashboardStats>("/dashboard"),
};
