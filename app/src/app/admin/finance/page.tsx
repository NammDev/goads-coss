import { WalletIcon, ShoppingCartIcon, ReceiptIcon, UsersIcon } from 'lucide-react'

import { StatsCard } from '@/components/dashboard/stats-card'
import WeeklyOverviewCard from '@/components/shadcn-studio/blocks/chart-weekly-overview'
import ProjectTimelineCard from '@/components/shadcn-studio/blocks/chart-project-timeline'
import { Badge } from '@/components/ui/badge'
import { getAdminStats } from '@/lib/db/queries'
import { formatUSD } from '@/lib/format-currency'

export default async function FinancePage() {
  const stats = await getAdminStats()

  const avgPerOrder =
    stats.totalOrders > 0
      ? parseFloat(stats.totalRevenue) / stats.totalOrders
      : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary border-transparent text-xs">
          Super Admin
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Revenue"
          value={formatUSD(stats.totalRevenue)}
          icon={WalletIcon}
          trend="up"
          trendValue="18%"
        />
        <StatsCard
          title="Orders"
          value={String(stats.totalOrders)}
          icon={ShoppingCartIcon}
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title="Avg. per Order"
          value={formatUSD(avgPerOrder)}
          icon={ReceiptIcon}
          trend="up"
          trendValue="5%"
        />
        <StatsCard
          title="Customers"
          value={String(stats.totalCustomers)}
          icon={UsersIcon}
          trend="up"
          trendValue="23%"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeeklyOverviewCard />
        <ProjectTimelineCard />
      </div>
    </div>
  )
}
