'use client'

import { WalletIcon, ShoppingCartIcon, ReceiptIcon, UsersIcon } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'

interface FinanceStatsProps {
  revenue: string
  totalOrders: string
  avgPerOrder: string
  totalCustomers: string
}

/** Client wrapper to keep Lucide icons in client boundary */
export function FinanceStats({ revenue, totalOrders, avgPerOrder, totalCustomers }: FinanceStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Revenue" value={revenue} icon={WalletIcon} />
      <StatsCard title="Orders" value={totalOrders} icon={ShoppingCartIcon} />
      <StatsCard title="Avg. per Order" value={avgPerOrder} icon={ReceiptIcon} />
      <StatsCard title="Customers" value={totalCustomers} icon={UsersIcon} />
    </div>
  )
}
