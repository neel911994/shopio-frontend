import type { Column, CardConfig } from "@/components/shared";
import type { OrderStatus } from "@/services/orders.service";
import type { StockLabel, ProductRow, OrderRow, CustomerRow, CategoryRow } from "@/models/tableRows";
import { ProductNameCell, OrderIdCell, CustomerNameCell, CategoryNameCell } from "@/utilities/tableCells";

// ─── Products ────────────────────────────────────────────────────────────────

export function getStockLabel(stock: number): StockLabel {
  if (stock === 0) return "Out of Stock";
  if (stock <= 4)  return "Low Stock";
  return "In Stock";
}

export const stockBadgeStyles: Record<StockLabel, string> = {
  "In Stock":     "bg-emerald-500/15 text-emerald-400",
  "Low Stock":    "bg-amber-500/15 text-amber-400",
  "Out of Stock": "bg-red-500/15 text-red-400",
};

export const productColumns: Column<ProductRow>[] = [
  {
    key: "name",
    header: "Product",
    render: (row) => <ProductNameCell id={row.id} name={row.name} />,
  },
  { key: "categoryName", header: "Category",     type: "text" },
  { key: "price",        header: "Price",        type: "currency" },
  { key: "stock",        header: "Stock",        type: "text" },
  {
    key: "stockLabel",
    header: "Stock Status",
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

export const productCardConfig: CardConfig<ProductRow> = {
  title:    (row) => <ProductNameCell id={row.id} name={row.name} />,
  badge:    (row) => (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${stockBadgeStyles[row.stockLabel]}`}>
      {row.stockLabel}
    </span>
  ),
  subtitle: (row) => row.categoryName,
  meta: [
    { label: "Stock:", value: (row) => row.stock },
    {
      value: (row) => (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${row.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-gray-500/15 text-gray-400"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ],
  trailing: (row) => (
    <span className="font-semibold text-white">
      ₹{Math.round(row.price).toLocaleString("en-IN")}
    </span>
  ),
};

// ─── Orders ──────────────────────────────────────────────────────────────────

export function formatOrderDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export const statusStyles: Record<OrderStatus, string> = {
  PENDING:   "bg-amber-500/15 text-amber-400",
  PAID:      "bg-purple-500/15 text-purple-400",
  SHIPPED:   "bg-blue-500/15 text-blue-400",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

export const orderColumns: Column<OrderRow>[] = [
  {
    key: "shortId",
    header: "Order ID",
    render: (row) => <OrderIdCell orderId={row.orderId} shortId={row.shortId} />,
  },
  { key: "customerName", header: "Customer", type: "highlight" },
  { key: "status",       header: "Status",   type: "badge", badgeStyles: statusStyles },
  { key: "itemCount",    header: "Items",    type: "text" },
  { key: "totalAmount",  header: "Total",    type: "currency" },
  { key: "createdAt",    header: "Date",     type: "text" },
];

export const orderCardConfig: CardConfig<OrderRow> = {
  title:    (row) => <OrderIdCell orderId={row.orderId} shortId={row.shortId} />,
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

// ─── Customers ───────────────────────────────────────────────────────────────

export const customerColumns: Column<CustomerRow>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <CustomerNameCell id={row.id} name={row.name} />,
  },
  { key: "email",       header: "Email",        type: "text" },
  { key: "phone",       header: "Phone",        type: "text" },
  { key: "totalOrders", header: "Total Orders", type: "text" },
  { key: "joined",      header: "Joined",       type: "text" },
];

export const customerCardConfig: CardConfig<CustomerRow> = {
  title:    (row) => <CustomerNameCell id={row.id} name={row.name} />,
  subtitle: (row) => row.email,
  meta: [
    { value: (row) => row.phone },
    { label: "Orders:", value: (row) => row.totalOrders },
  ],
  trailing: (row) => <span className="text-xs text-gray-400">{row.joined}</span>,
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const categoryColumns: Column<CategoryRow>[] = [
  {
    key: "name",
    header: "Category",
    render: (row) => <CategoryNameCell id={row.id} name={row.name} />,
  },
  { key: "productCount", header: "Products", type: "text" },
];

export const categoryCardConfig: CardConfig<CategoryRow> = {
  title:    (row) => <CategoryNameCell id={row.id} name={row.name} />,
  trailing: (row) => <span className="text-xs text-gray-400">{row.productCount} products</span>,
};
