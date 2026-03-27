import type { Order } from "@/services/orders.service";
import type { OrderRow } from "@/models/tableRows";
import { formatOrderDate, orderColumns, orderCardConfig } from "@/utilities/tableConfig";
import { Table, MobileCardList } from "@/components/shared";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const rows: OrderRow[] = orders.map((o) => ({
    orderId:      o.orderId,
    shortId:      `#${o.orderId.slice(0, 8).toUpperCase()}`,
    customerName: o.customerName,
    status:       o.status,
    totalAmount:  o.totalAmount,
    itemCount:    o.products.length,
    createdAt:    formatOrderDate(o.createdAt),
  }));

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={orderColumns}
          data={rows}
          keyExtractor={(row) => row.orderId}
          emptyMessage="No orders found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={orderCardConfig}
          keyExtractor={(row) => row.orderId}
          emptyMessage="No orders found"
        />
      </div>
    </>
  );
}
