import { apiClient } from "./api";
export type { Category, CategoryDetail, CategoryProduct } from "@/models/model";
import type { Category, CategoryDetail } from "@/models/model";

export const categoriesService = {
  // GET /api/categories
  listCategories: () => apiClient.get<Category[]>("/categories"),

  // GET /api/categories/:id
  getCategory: (id: string) => apiClient.get<CategoryDetail>(`/categories/${id}`),

  // POST /api/categories
  createCategory: (data: { name: string; description: string }) =>
    apiClient.post<Category>("/categories", data),
};
