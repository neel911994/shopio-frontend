"use server";

import { customersService } from "@/services/customers.service";

export async function updateCustomerAction(id: string, data: { phone: string }) {
  return customersService.updateCustomer(id, data);
}
