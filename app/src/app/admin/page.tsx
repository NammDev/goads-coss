import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive'
import { getAdminStats } from '@/lib/db/queries'
import { formatUSD } from '@/lib/format-currency'
import { AdminStats } from './admin-stats'
import { RevenueBreakdown } from '@/components/dashboard/revenue-breakdown'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { TopProducts } from '@/components/dashboard/top-products'
import { CustomerInsights } from '@/components/dashboard/customer-insights'

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {/* Stats row */}
      <AdminStats
        totalOrders={String(stats.totalOrders)}
        revenue={formatUSD(stats.totalRevenue)}
        pendingOrders={String(stats.pendingOrders)}
        totalProducts={String(stats.totalProducts)}
      />

      {/* Charts row */}
      <ChartAreaInteractive />

      {/* Revenue Breakdown + Recent Transactions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueBreakdown />
        </div>
        <div className="lg:col-span-3">
          <RecentTransactions />
        </div>
      </div>

      {/* Top Products + Recent Transactions (second instance) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopProducts />
        <RecentTransactions />
      </div>

      {/* Customer Insights - full width */}
      <CustomerInsights />
    </div>
  )
}
