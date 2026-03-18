import { dashboardService } from "@/services/dashboard.service";
import DashboardCards from "@/components/pageDashboard/DashboardCards/DashboardCards";
import TopSellingProducts from "@/components/pageDashboard/TopSellingProducts/TopSellingProducts";
import LowStockAlerts from "@/components/pageDashboard/LowStockAlerts/LowStockAlerts";
import OrdersByStatus from "@/components/pageDashboard/OrdersByStatus/OrdersByStatus";

export default async function Dashboard() {
  const stats = await dashboardService.getStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">
          What&apos;s happening with your store today.
        </p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopSellingProducts products={stats.topProducts} />
        <LowStockAlerts
          products={stats.lowStockProduct.products}
          critical={stats.lowStockProduct.critical}
          warning={stats.lowStockProduct.warning}
        />
      </div>

      <OrdersByStatus data={stats.orderByStatus} />
    </div>
  );
}
