"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, type Column } from "@/components/shared";
import type { Product } from "@/services/products.service";

type StockLabel = "In Stock" | "Low Stock" | "Out of Stock";

type ProductRow = {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  stock: number;
  stockLabel: StockLabel;
  isActive: boolean;
};

function getStockLabel(stock: number): StockLabel {
  if (stock === 0) return "Out of Stock";
  if (stock <= 4)  return "Low Stock";
  return "In Stock";
}

const stockBadgeStyles: Record<StockLabel, string> = {
  "In Stock":     "bg-emerald-500/15 text-emerald-400",
  "Low Stock":    "bg-amber-500/15 text-amber-400",
  "Out of Stock": "bg-red-500/15 text-red-400",
};

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columns: Column<ProductRow>[] = [
    { key: "name",         header: "Product",  type: "action" },
    { key: "categoryName", header: "Category", type: "text" },
    { key: "price",        header: "Price",    type: "currency" },
    { key: "stock",        header: "Stock",    type: "text" },
    {
      key: "stockLabel",
      header: "Status",
      render: (row) => (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${stockBadgeStyles[row.stockLabel]}`}>
          {row.stockLabel}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${row.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-gray-500/15 text-gray-400"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  function handleProductClick(row: ProductRow) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("productId", row.id);
    router.push(`${pathname}?${params.toString()}`);
  }

  const rows: ProductRow[] = products.map((p) => ({
    id:           p.id,
    name:         p.name,
    categoryName: p.category.name,
    price:        p.price,
    stock:        p.stock,
    stockLabel:   getStockLabel(p.stock),
    isActive:     p.isActive,
  }));

  return (
    <Table
      columns={columns}
      data={rows}
      keyField="id"
      onCellAction={handleProductClick}
      emptyMessage="No products found"
    />
  );
}