import { StatCard } from "@/components/shared";
import type { OrderStats } from "@/services/orders.service";

const cards = [
  {
    key:       "totalOrders" as const,
    label:     "Total Orders",
    borderTop: "border-t-2 border-t-blue-500",
    icon:      (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    format: (v: number) => v.toLocaleString("en-IN"),
  },
  {
    key:       "pendingOrders" as const,
    label:     "Pending Orders",
    borderTop: "border-t-2 border-t-amber-500",
    icon:      (
      <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    format: (v: number) => v.toLocaleString("en-IN"),
  },
  {
    key:       "completedOrders" as const,
    label:     "Completed Orders",
    borderTop: "border-t-2 border-t-emerald-500",
    icon:      (
      <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    format: (v: number) => v.toLocaleString("en-IN"),
  },
  {
    key:       "revenue" as const,
    label:     "Revenue",
    borderTop: "border-t-2 border-t-indigo-500",
    icon:      (
      <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    format: (v: number) => `₹${Math.round(v).toLocaleString("en-IN")}`,
  },
];

interface OrderStatCardsProps {
  stats: OrderStats;
}

export default function OrderStatCards({ stats }: OrderStatCardsProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ key, label, borderTop, icon, format }) => {
        const stat = stats[key];
        return (
          <StatCard
            key={key}
            icon={icon}
            label={label}
            value={format(stat.value)}
            trend={{
              value:     `${stat.trend.percentage}%`,
              direction: stat.trend.direction,
            }}
            className={borderTop}
          />
        );
      })}
    </div>
  );
}