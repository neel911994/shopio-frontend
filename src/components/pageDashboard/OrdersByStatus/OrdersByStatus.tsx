import { DonutChart, type DonutSegment } from "@/components/shared";

interface OrdersByStatusProps {
  data: { status: string; _count: number }[];
}

const statusConfig: Record<string, { label: string; color: string }> = {
  DELIVERED: { label: "Delivered", color: "#10b981" },
  SHIPPED:   { label: "Shipped",   color: "#60a5fa" },
  PAID:      { label: "Paid",      color: "#a78bfa" },
  PENDING:   { label: "Pending",   color: "#f59e0b" },
};

export default function OrdersByStatus({ data }: OrdersByStatusProps) {
  const segments: DonutSegment[] = data.map((item) => ({
    label: statusConfig[item.status]?.label ?? item.status,
    value: item._count,
    color: statusConfig[item.status]?.color ?? "#6b7280",
  }));

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
      <h3 className="mb-5 font-semibold text-white">Orders by Status</h3>
      <DonutChart segments={segments} centerLabel="Total" />
    </div>
  );
}