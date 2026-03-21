"use server";

import { productsService } from "@/services/products.service";

export async function createProductAction(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  isActive: boolean;
}) {
  return productsService.createProduct(data);
}

export async function updateProductAction(
  id: string,
  data: { stock: number; isActive: boolean }
) {
  return productsService.updateProduct(id, data);
}
