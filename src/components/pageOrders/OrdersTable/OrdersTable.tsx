"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, type Column } from "@/components/shared";
import type { Order, OrderStatus } from "@/services/orders.service";

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
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const rows: OrderRow[] = orders.map((o) => ({
    orderId:      o.orderId,
    shortId:      `#${o.orderId.slice(0, 8).toUpperCase()}`,
    customerName: o.customerName,
    status:       o.status,
    totalAmount:  o.totalAmount,
    itemCount:    o.products.length,
    createdAt:    formatDate(o.createdAt),
  }));

  function handleOrderClick(row: OrderRow) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderId", row.orderId);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Table
      columns={columns}
      data={rows}
      keyExtractor={(row) => row.orderId}
      onCellAction={handleOrderClick}
      emptyMessage="No orders found"
    />
  );
}