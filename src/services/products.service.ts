import { apiClient } from "./api";
export type {
  StockFilter, StockStatus, Product, ProductCategory, ProductFilters, ProductPagination, ProductsResponse, ProductStats,
} from "@/config/model";
import type { Product, ProductFilters, ProductsResponse, ProductStats } from "@/config/model";

export const productsService = {
  // GET /api/products/stats
  getStats: () => apiClient.get<ProductStats>("/products/stats"),

  // POST /api/products
  createProduct: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    isActive: boolean;
  }) => apiClient.post<Product>("/products", data),

  // PATCH /api/products/:id
  updateProduct: (id: string, data: { stock: number; isActive: boolean }) =>
    apiClient.patch<Product>(`/products/${id}`, data),

  // GET /api/products with optional filters + pagination
  listProducts: (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters?.categoryId)   params.set("categoryId",   filters.categoryId);
    if (filters?.stockFilter)  params.set("stockFilter",  filters.stockFilter);
    if (filters?.search)       params.set("search",       filters.search);
    if (filters?.page)         params.set("page",         String(filters.page));
    if (filters?.limit)        params.set("limit",        String(filters.limit));
    const qs = params.toString();
    return apiClient.get<ProductsResponse>(qs ? `/products?${qs}` : "/products");
  },
};