"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, MobileCardList, type Column, type CardConfig } from "@/components/shared";
import type { Order, OrderStatus } from "@/services/orders.service";

type OrderRow = {
  orderId:      string;
  shortId:      string;
  customerName: string;
  status:       OrderStatus;
  totalAmount:  number;
  itemCount:    number;
  createdAt:    string;
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

  const cardConfig: CardConfig<OrderRow> = {
    title:    (row) => (
      <button
        onClick={() => handleOrderClick(row)}
        className="font-mono text-indigo-400 hover:text-indigo-300"
      >
        {row.shortId}
      </button>
    ),
    badge:    (row) => {
      const style = statusStyles[row.status] ?? "bg-gray-500/15 text-gray-400";
      const label = row.status.charAt(0) + row.status.slice(1).toLowerCase();
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${style}`}>
          {label}
        </span>
      );
    },
    subtitle: (row) => <span className="font-medium text-white">{row.customerName}</span>,
    meta: [
      { label: "Items:", value: (row) => row.itemCount },
      { value: (row) => row.createdAt },
    ],
    trailing: (row) => (
      <span className="font-semibold text-white">
        ₹{Math.round(row.totalAmount).toLocaleString("en-IN")}
      </span>
    ),
  };

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={columns}
          data={rows}
          keyExtractor={(row) => row.orderId}
          onCellAction={handleOrderClick}
          emptyMessage="No orders found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={cardConfig}
          keyExtractor={(row) => row.orderId}
          onCardClick={handleOrderClick}
          emptyMessage="No orders found"
        />
      </div>
    </>
  );
}
