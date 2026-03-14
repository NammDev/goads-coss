'use client'

import { StatsCard, StatsGrid } from '@/components/dashboard/stats-card'

interface FinanceStatsProps {
  revenue: string
  totalOrders: string
  avgPerOrder: string
  totalCustomers: string
}

/** Client wrapper to keep Lucide icons in client boundary */
export function FinanceStats({ revenue, totalOrders, avgPerOrder, totalCustomers }: FinanceStatsProps) {
  return (
    <StatsGrid>
      <StatsCard
        title="Revenue"
        value={revenue}
        badge="+12%"
        trend="up"
        trendLabel="Revenue growing"
        trendDescription="Compared to last period"
      />
      <StatsCard
        title="Orders"
        value={totalOrders}
        badge="+8%"
        trend="up"
        trendLabel="Order volume up"
        trendDescription="Total completed orders"
      />
      <StatsCard
        title="Avg. per Order"
        value={avgPerOrder}
        badge="+5%"
        trend="up"
        trendLabel="Average increasing"
        trendDescription="Per order value trend"
      />
      <StatsCard
        title="Customers"
        value={totalCustomers}
        badge="+10%"
        trend="up"
        trendLabel="Customer base growing"
        trendDescription="Active paying customers"
      />
    </StatsGrid>
  )
}
