import { Suspense } from 'react'
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive'
import { DateRangeFilter } from '@/components/dashboard/date-range-filter'
import { getAdminStats } from '@/lib/db/queries'
import { getRecentOrders } from '@/lib/db/queries/order-queries'
import { resolveDateRange } from '@/lib/date-range-presets'
import { formatUSD } from '@/lib/format-currency'
import { AdminStats } from './admin-stats'
import { RevenueBreakdown } from '@/components/dashboard/revenue-breakdown'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { TopProducts } from '@/components/dashboard/top-products'
import { CustomerInsights } from '@/components/dashboard/customer-insights'
import { ProductHealthWidget } from '@/components/dashboard/product-health-widget'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const params = await searchParams
  const dateRange = resolveDateRange(params)

  const [stats, recentOrders] = await Promise.all([
    getAdminStats(dateRange),
    getRecentOrders(5),
  ])

  const transactions = recentOrders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    totalAmount: o.totalAmount,
    status: o.status,
    createdAt: o.createdAt,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <Suspense>
          <DateRangeFilter />
        </Suspense>
      </div>

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
          <RecentTransactions transactions={transactions} />
        </div>
      </div>

      {/* Top Products + Recent Transactions (second instance) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopProducts />
        <RecentTransactions transactions={transactions} />
      </div>

      {/* Product Health Overview */}
      <ProductHealthWidget />

      {/* Customer Insights - full width */}
      <CustomerInsights />
    </div>
  )
}
