'use client'

import { StatsCard, StatsGrid } from '@/components/dashboard/stats-card'

interface AdminStatsProps {
  totalOrders: string
  revenue: string
  pendingOrders: string
  totalProducts: string
}

/** Client wrapper to keep Lucide icons in client boundary */
export function AdminStats({ totalOrders, revenue, pendingOrders, totalProducts }: AdminStatsProps) {
  return (
    <StatsGrid>
      <StatsCard
        title="Total Revenue"
        value={revenue}
        badge="+12.5%"
        trend="up"
        trendLabel="Trending up this month"
        trendDescription="Visitors for the last 6 months"
      />
      <StatsCard
        title="New Orders"
        value={totalOrders}
        badge="+8%"
        trend="up"
        trendLabel="Order volume increasing"
        trendDescription="Compared to last month"
      />
      <StatsCard
        title="Pending"
        value={pendingOrders}
        badge="-3%"
        trend="down"
        trendLabel="Fewer pending orders"
        trendDescription="Processing speed improved"
      />
      <StatsCard
        title="Total Products"
        value={totalProducts}
        badge="+15%"
        trend="up"
        trendLabel="Catalog expanding"
        trendDescription="New products added this month"
      />
    </StatsGrid>
  )
}
