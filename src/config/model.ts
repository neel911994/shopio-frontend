// ─── Auth ────────────────────────────────────────────────────────────────────

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

// ─── Dashboard ───────────────────────────────────────────────────────────────

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
  orderByStatus: { status: string; _count: number }[];
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderProductSummary {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface OrderProductDetail extends OrderProductSummary {
  productDesc: string;
  categoryName: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt?: string;
  products: OrderProductSummary[];
}

export interface OrderDetail {
  orderId: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  products: OrderProductDetail[];
}

export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  customerName?: string;
  page?: number;
  limit?: number;
}

export interface OrderPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrdersResponse {
  data: Order[];
  pagination: OrderPagination;
}

interface OrderStatItem {
  value: number;
  trend: { percentage: number; direction: "up" | "down" | "neutral" };
}

export interface OrderStats {
  totalOrders:     OrderStatItem;
  pendingOrders:   OrderStatItem;
  completedOrders: OrderStatItem;
  revenue:         OrderStatItem;
}