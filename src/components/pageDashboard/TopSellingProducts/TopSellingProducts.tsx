"use client";

import { Table, type Column } from "@/components/shared";
import type { TopProduct } from "@/services/dashboard.service";

interface TopSellingProductsProps {
  products: TopProduct[];
}

export default function TopSellingProducts({ products }: TopSellingProductsProps) {
  const columns: Column<TopProduct>[] = [
    {
      key: "rank",
      header: "#",
      headerClassName: "w-12",
      render: (_, index) => (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-gray-300">
          {index + 1}
        </span>
      ),
    },
    {
      key: "name",
      header: "Product",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-gray-500">{row.category.name}</p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (row) => (
        <span className="font-medium text-gray-300">
          ₹{Math.round(row.price).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "totalQuantitySold",
      header: "Sold",
      headerClassName: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
          {row.totalQuantitySold}
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">Top Selling Products</h3>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          View All →
        </button>
      </div>
      <Table
        columns={columns}
        data={products}
        keyExtractor={(row) => row.id}
        emptyMessage="No products found"
      />
    </div>
  );
}