import { apiClient } from "./api";
export type { Category, CategoryDetail, CategoryProduct } from "@/config/model";
import type { Category, CategoryDetail } from "@/config/model";

export const categoriesService = {
  // GET /api/categories
  listCategories: () => apiClient.get<Category[]>("/categories"),

  // GET /api/categories/:id
  getCategory: (id: string) => apiClient.get<CategoryDetail>(`/categories/${id}`),
};
