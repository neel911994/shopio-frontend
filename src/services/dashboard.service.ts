import { apiClient } from "./api";

export interface TopProduct {
  id: string;
  name: string;
  price: number;
  category: { name: string };
  totalQuantitySold: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  stockStatus: "Critical" | "Warning" | "Out";
  category: { name: string };
}

export interface DashboardStats {
  totalRevenue: {
    current: number;
    value: number;
    trend: "up" | "down" | "neutral";
    previousValue: number;
  };
  totalOrder: {
    current: number;
    thisMonth: number;
    value: number;
    trend: "up" | "down" | "neutral";
    previousValue: number;
  };
  SuccessfulOrder: {
    current: number;
    thisMonth: number;
    successRate: number;
    value: number;
    trend: "up" | "down" | "neutral";
    previousValue: number;
  };
  cancelledOrder: {
    current: number;
    thisMonth: number;
    cancellationRate: number;
    value: number;
    trend: "up" | "down" | "neutral";
  };
  avgOrderValue: {
    current: number;
    value: number;
    trend: "up" | "down" | "neutral";
    previousValue: number;
  };
  inventoryValue: {
    current: number;
    totalUnits: number;
    totalProducts: number;
    newThisMonth: number;
    value: number;
    trend: "up" | "down" | "neutral";
  };
  lowStockProduct: {
    products: LowStockProduct[];
    total: number;
    critical: number;
    warning: number;
  };
  topProducts: TopProduct[];
  orderByStatus: {
    status: string;
    _count: number;
  }[];
}

export const dashboardService = {
  getStats: () => apiClient.get<DashboardStats>("/dashboard"),
};