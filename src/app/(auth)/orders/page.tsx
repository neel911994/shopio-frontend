import Orders from "@/components/pageOrders/Orders/Orders";
import type { OrderStatus } from "@/services/orders.service";

interface OrdersPageProps {
  searchParams: Promise<{
    status?: string;
    startDate?: string;
    endDate?: string;
    customerName?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { status, startDate, endDate, customerName, page, limit } = await searchParams;
  return (
    <Orders
      status={status as OrderStatus | undefined}
      startDate={startDate}
      endDate={endDate}
      customerName={customerName}
      page={page ? Number(page) : 1}
      limit={limit ? Number(limit) : 10}
    />
  );
}
