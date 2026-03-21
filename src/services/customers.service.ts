import { apiClient } from "./api";
export type { Customer, CustomerDetail, CustomerOrder, CustomersResponse, CustomerPagination } from "@/config/model";
import type { CustomerDetail } from "@/config/model";

export const customersService = {
  // GET /api/customers/:id
  getCustomer: (id: string) => apiClient.get<CustomerDetail>(`/customers/${id}`),

  // PATCH /api/customers/:id
  updateCustomer: (id: string, data: { phone: string }) =>
    apiClient.patch<CustomerDetail>(`/customers/${id}`, data),

  // GET /api/customers?search=...&page=...&limit=...
  listCustomers: (filters?: { search?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.page)   params.set("page",   String(filters.page));
    if (filters?.limit)  params.set("limit",  String(filters.limit));
    const qs = params.toString();
    return apiClient.get<unknown>(qs ? `/customers?${qs}` : "/customers");
  },
};