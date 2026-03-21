import { StatCard } from "@/components/shared";
import type { ProductStats } from "@/services/products.service";

interface ProductStatCardsProps {
  stats: ProductStats;
}

export default function ProductStatCards({ stats }: ProductStatCardsProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={
          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        }
        label="Total Products"
        value={stats.total.toLocaleString("en-IN")}
        className="border-t-2 border-t-blue-500"
      />
      <StatCard
        icon={
          <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Active Products"
        value={stats.active.toLocaleString("en-IN")}
        className="border-t-2 border-t-emerald-500"
      />
      <StatCard
        icon={
          <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        }
        label="Low Stock"
        value={stats.lowStock.toLocaleString("en-IN")}
        className="border-t-2 border-t-amber-500"
      />
      <StatCard
        icon={
          <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        }
        label="Out of Stock"
        value={stats.outOfStock.toLocaleString("en-IN")}
        className="border-t-2 border-t-red-500"
      />
    </div>
  );
}