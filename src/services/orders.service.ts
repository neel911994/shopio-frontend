import { apiClient } from "./api";

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

export const ordersService = {
  // GET /api/orders with optional filters + pagination
  listOrders: (filters?: OrderFilters) => {
    const params = new URLSearchParams();
    if (filters?.status)       params.set("status",       filters.status);
    if (filters?.startDate)    params.set("startDate",    filters.startDate);
    if (filters?.endDate)      params.set("endDate",      filters.endDate);
    if (filters?.customerName) params.set("customerName", filters.customerName);
    if (filters?.page)         params.set("page",         String(filters.page));
    if (filters?.limit)        params.set("limit",        String(filters.limit));
    const qs = params.toString();
    return apiClient.get<OrdersResponse>(qs ? `/orders?${qs}` : "/orders");
  },

  // GET /api/orders/:id
  getOrder: (id: string) => apiClient.get<OrderDetail>(`/orders/${id}`),

  // PATCH /api/orders/:id/status
  editOrderStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<Order>(`/orders/${id}`, { status }),
};