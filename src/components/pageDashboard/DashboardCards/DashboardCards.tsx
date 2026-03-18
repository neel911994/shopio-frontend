import { StatCard } from "@/components/shared";
import {
  DollarIcon,
  ShoppingBagIcon,
  CheckIcon,
  CloseIcon,
  TrendUpIcon,
  PackageIcon,
} from "@/components/svg";
import type { DashboardStats } from "@/services/dashboard.service";

interface DashboardCardsProps {
  stats: DashboardStats;
}

export default function DashboardCards({ stats }: DashboardCardsProps) {
  const cards = [
    {
      icon: <DollarIcon size={20} className="text-emerald-400" />,
      value: `₹${stats.totalRevenue.current.toLocaleString("en-IN")}`,
      label: "Total Revenue",
      subtitle: `vs ₹${stats.totalRevenue.previousValue.toLocaleString("en-IN")} last period`,
      trend: {
        value: `${Math.abs(stats.totalRevenue.value)}%`,
        direction: stats.totalRevenue.trend,
      },
    },
    {
      icon: <ShoppingBagIcon size={20} className="text-blue-400" />,
      value: stats.totalOrder.current.toString(),
      label: "Total Orders",
      subtitle: `${stats.totalOrder.thisMonth} orders this month`,
      trend: {
        value: `${Math.abs(stats.totalOrder.value)}%`,
        direction: stats.totalOrder.trend,
      },
    },
    {
      icon: <CheckIcon size={20} className="text-green-400" />,
      value: stats.SuccessfulOrder.current.toString(),
      label: "Successful Orders",
      subtitle: `${stats.SuccessfulOrder.successRate}% success rate`,
      trend: {
        value: `${Math.abs(stats.SuccessfulOrder.value)}%`,
        direction: stats.SuccessfulOrder.trend,
      },
    },
    {
      icon: <CloseIcon size={20} className="text-red-400" />,
      value: stats.cancelledOrder.current.toString(),
      label: "Cancelled",
      subtitle: `${stats.cancelledOrder.cancellationRate}% cancellation rate`,
      trend: {
        value: `${Math.abs(stats.cancelledOrder.value)}%`,
        direction: stats.cancelledOrder.trend,
      },
    },
    {
      icon: <TrendUpIcon size={20} className="text-purple-400" />,
      value: `₹${Math.round(stats.avgOrderValue.current).toLocaleString("en-IN")}`,
      label: "Avg Order Value",
      subtitle: `vs ₹${Math.round(stats.avgOrderValue.previousValue).toLocaleString("en-IN")} prior`,
      trend: {
        value: `${Math.abs(stats.avgOrderValue.value)}%`,
        direction: stats.avgOrderValue.trend,
      },
    },
    {
      icon: <PackageIcon size={20} className="text-amber-400" />,
      value: stats.inventoryValue.totalProducts.toString(),
      label: "Total Products",
      subtitle: `${stats.inventoryValue.newThisMonth} new this month`,
      trend: {
        value: `${stats.inventoryValue.totalUnits} units`,
        direction: stats.inventoryValue.trend,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}