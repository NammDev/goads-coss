'use client'

import { StatsCard, StatsGrid } from '@/components/dashboard/stats-card'

interface PortalStatsProps {
  totalOrders: number
  pendingOrders: number
  activeItems: number
}

/** Client wrapper to keep Lucide icons in client boundary */
export function PortalStats({ totalOrders, pendingOrders, activeItems }: PortalStatsProps) {
  return (
    <StatsGrid>
      <StatsCard
        title="Total Orders"
        value={totalOrders}
        badge={`${totalOrders}`}
        trend="up"
        trendLabel="All time orders"
        trendDescription="Your complete order history"
      />
      <StatsCard
        title="Pending Orders"
        value={pendingOrders}
        badge={pendingOrders > 0 ? 'Active' : 'None'}
        trend={pendingOrders > 0 ? 'up' : 'down'}
        trendLabel={pendingOrders > 0 ? 'Orders in progress' : 'No pending orders'}
        trendDescription="Waiting for delivery"
      />
      <StatsCard
        title="Active Items"
        value={activeItems}
        badge={`${activeItems}`}
        trend="up"
        trendLabel="Products delivered"
        trendDescription="Available in your account"
      />
    </StatsGrid>
  )
}
