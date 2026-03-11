'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { OrderStatus } from '@/data/mock-orders'

const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  },
  paid: {
    label: 'Paid',
    className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  },
  processing: {
    label: 'Processing',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  },
  shipped: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  },
}

type StatusBadgeProps = {
  status: OrderStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = ORDER_STATUS_CONFIG[status]

  return (
    <Badge variant="outline" className={cn('border-transparent', config.className, className)}>
      {config.label}
    </Badge>
  )
}
