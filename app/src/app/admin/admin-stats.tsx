'use client'

import { ShoppingCartIcon, WalletIcon, ClockIcon, PackageIcon } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'

interface AdminStatsProps {
  totalOrders: string
  revenue: string
  pendingOrders: string
  totalProducts: string
}

/** Client wrapper to keep Lucide icons in client boundary */
export function AdminStats({ totalOrders, revenue, pendingOrders, totalProducts }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="New Orders" value={totalOrders} icon={ShoppingCartIcon} trend="up" trendValue="12%" />
      <StatsCard title="Revenue" value={revenue} icon={WalletIcon} trend="up" trendValue="8%" />
      <StatsCard title="Pending" value={pendingOrders} icon={ClockIcon} trend="down" trendValue="3%" />
      <StatsCard title="Total Products" value={totalProducts} icon={PackageIcon} trend="up" trendValue="15%" />
    </div>
  )
}
