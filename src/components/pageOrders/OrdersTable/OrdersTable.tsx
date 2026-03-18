"use client";

import { useState } from "react";
import { Table, type Column } from "@/components/shared";
import type { Order, OrderStatus } from "@/services/orders.service";
import OrderDetailModal from "@/components/pageOrders/OrderDetailModal/OrderDetailModal";

type OrderRow = {
  orderId: string;
  shortId: string;
  customerName: string;
  status: OrderStatus;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
};

const statusStyles: Record<OrderStatus, string> = {
  PENDING:   "bg-amber-500/15 text-amber-400",
  PAID:      "bg-purple-500/15 text-purple-400",
  SHIPPED:   "bg-blue-500/15 text-blue-400",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

const columns: Column<OrderRow>[] = [
  { key: "shortId",      header: "Order ID",  type: "action" },
  { key: "customerName", header: "Customer",  type: "highlight" },
  { key: "status",       header: "Status",    type: "badge", badgeStyles: statusStyles },
  { key: "itemCount",    header: "Items",     type: "text" },
  { key: "totalAmount",  header: "Total",     type: "currency" },
  { key: "createdAt",    header: "Date",      type: "text" },
];

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [selected, setSelected] = useState<OrderRow | null>(null);

  const rows: OrderRow[] = orders.map((o) => ({
    orderId:      o.orderId,
    shortId:      `#${o.orderId.slice(0, 8).toUpperCase()}`,
    customerName: o.customerName,
    status:       o.status,
    totalAmount:  o.totalAmount,
    itemCount:    o.products.length,
    createdAt:    formatDate(o.createdAt),
  }));

  return (
    <>
      <Table
        columns={columns}
        data={rows}
        keyExtractor={(row) => row.orderId}
        onCellAction={(row) => setSelected(row)}
        emptyMessage="No orders found"
      />

      {selected && (
        <OrderDetailModal
          orderId={selected.orderId}
          shortId={selected.shortId}
          status={selected.status}
          customerName={selected.customerName}
          totalAmount={selected.totalAmount}
          itemCount={selected.itemCount}
          createdAt={selected.createdAt}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}