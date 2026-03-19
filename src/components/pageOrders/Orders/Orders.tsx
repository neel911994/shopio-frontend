import { ordersService, type OrderStatus } from "@/services/orders.service";
import OrderStatCards from "@/components/pageOrders/OrderStatCards/OrderStatCards";
import OrderFilters from "@/components/pageOrders/OrderFilters/OrderFilters";
import OrdersTable from "@/components/pageOrders/OrdersTable/OrdersTable";
import OrdersPagination from "@/components/pageOrders/Pagination/Pagination";
import OrderDetailModal from "@/components/pageOrders/OrderDetailModal/OrderDetailModal";

interface OrdersProps {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  customerName?: string;
  page?: number;
  limit?: number;
  orderId?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default async function Orders({
  status, startDate, endDate, customerName, page = 1, limit = 10, orderId,
}: OrdersProps) {
  const [{ data: orders, pagination }, stats] = await Promise.all([
    ordersService.listOrders({ status, startDate, endDate, customerName, page, limit }),
    ordersService.getStats(),
  ]);

  const selectedOrder = orderId ? orders.find((o) => o.orderId === orderId) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Orders</h2>
        <p className="text-sm text-gray-400 mt-1">Manage and track all customer orders.</p>
      </div>

      <OrderStatCards stats={stats} />

      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <div className="mb-4 flex flex-col gap-2">
          <OrderFilters activeStatus={status} startDate={startDate} endDate={endDate} customerName={customerName} />
          <p className="text-sm text-gray-400 text-right">{pagination.total} orders</p>
        </div>

        <OrdersTable orders={orders} />

        <OrdersPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          limit={pagination.limit}
        />
      </div>

      {selectedOrder && orderId && (
        <OrderDetailModal
          orderId={orderId}
          shortId={`#${orderId.slice(0, 8).toUpperCase()}`}
          status={selectedOrder.status}
          customerName={selectedOrder.customerName}
          totalAmount={selectedOrder.totalAmount}
          itemCount={selectedOrder.products.length}
          createdAt={formatDate(selectedOrder.createdAt)}
        />
      )}
    </div>
  );
}
