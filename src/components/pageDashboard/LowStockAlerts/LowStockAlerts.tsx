"use client";

import { useRouter } from "next/navigation";
import { Table, type Column } from "@/components/shared";
import type { LowStockProduct } from "@/services/dashboard.service";

interface LowStockAlertsProps {
  products: LowStockProduct[];
  critical: number;
  warning: number;
}

function StockBadge({ stock, stockStatus }: { stock: number; stockStatus: LowStockProduct["stockStatus"] }) {
  const isRed = stockStatus === "Critical" || stockStatus === "Out";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
        isRed ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"
      }`}
    >
      {stockStatus === "Out" ? "Out" : `${stock} left`}
    </span>
  );
}

export default function LowStockAlerts({ products, critical, warning }: LowStockAlertsProps) {
  const router = useRouter();

  const columns: Column<LowStockProduct>[] = [
    {
      key: "name",
      header: "Product",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-gray-500">
            {row.category.name} · ₹{Math.round(row.price).toLocaleString("en-IN")}
          </p>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => <StockBadge stock={row.stock} stockStatus={row.stockStatus} />,
    },
    {
      key: "reorder",
      header: "",
      className: "text-right",
      render: (row) => (
        <button
          onClick={() => router.push(`/products?productId=${row.id}&focusStock=true`)}
          className="rounded-md border border-gray-700 px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:border-indigo-500 hover:text-indigo-400"
        >
          Reorder
        </button>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 py-5 px-0 sm:p-5">
      <div className="mb-4 flex items-center justify-between px-5 sm:px-0">
        <h3 className="font-semibold text-white">Low Stock Alerts</h3>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Reorder All →
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          {critical} Critical
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          {warning} Warning
        </span>
      </div>

      <Table
        columns={columns}
        data={products.slice(0, 6)}
        keyExtractor={(row) => row.id}
        emptyMessage="No low stock products"
      />
    </div>
  );
}
