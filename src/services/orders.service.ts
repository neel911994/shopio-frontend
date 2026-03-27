import { apiClient } from "./api";
export type {
  OrderStatus, OrderProductSummary, OrderProductDetail,
  Order, OrderDetail, OrderFilters, OrderPagination, OrdersResponse, OrderStats,
} from "@/models/model";
import type { OrderFilters, OrdersResponse, OrderDetail, Order, OrderStatus, OrderStats } from "@/models/model";

export const ordersService = {
  // GET /api/orders/stats
  getStats: () => apiClient.get<OrderStats>("/orders/stats"),

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
