"use server";

import { categoriesService } from "@/services/categories.service";

export async function createCategoryAction(data: { name: string; description: string }) {
  return categoriesService.createCategory(data);
}
