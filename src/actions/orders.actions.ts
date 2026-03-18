"use server";

import { ordersService, type OrderStatus } from "@/services/orders.service";

export async function getOrderAction(orderId: string) {
  return ordersService.getOrder(orderId);
}

export async function editOrderStatusAction(orderId: string, status: OrderStatus) {
  return ordersService.editOrderStatus(orderId, status);
}