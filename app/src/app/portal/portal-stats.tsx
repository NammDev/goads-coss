'use client'

import { ShoppingCartIcon, PackageIcon, ZapIcon } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'

interface PortalStatsProps {
  totalOrders: number
  pendingOrders: number
  activeItems: number
}

/** Client wrapper to keep Lucide icons in client boundary */
export function PortalStats({ totalOrders, pendingOrders, activeItems }: PortalStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatsCard title="Total Orders" value={totalOrders} icon={ShoppingCartIcon} />
      <StatsCard title="Pending Orders" value={pendingOrders} icon={ZapIcon} />
      <StatsCard title="Active Items" value={activeItems} icon={PackageIcon} />
    </div>
  )
}
