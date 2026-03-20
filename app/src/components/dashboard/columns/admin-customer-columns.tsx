'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatUSD } from '@/lib/format-currency'
import type { CustomerWithStats, CustomerSegment } from '@/lib/db/queries'

const SEGMENT_CONFIG: Record<CustomerSegment, { label: string; className: string }> = {
  whale: { label: 'Whale', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  regular: { label: 'Regular', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  casual: { label: 'Casual', className: 'bg-muted text-muted-foreground' },
  new: { label: 'New', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
}

export const adminCustomerColumns: ColumnDef<CustomerWithStats, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8 rounded-md">
          <AvatarFallback className="rounded-md text-xs">
            {row.original.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Link
          href={`/admin/customers/${row.original.id}`}
          className="font-medium hover:text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.name}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: 'orderCount',
    header: 'Orders',
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent',
    cell: ({ row }) => (
      <span className="font-medium">{formatUSD(row.original.totalSpent)}</span>
    ),
  },
  {
    accessorKey: 'segment',
    header: 'Segment',
    cell: ({ row }) => {
      const config = SEGMENT_CONFIG[row.original.segment]
      return (
        <Badge variant="outline" className={cn('border-transparent', config.className)}>
          {config.label}
        </Badge>
      )
    },
    meta: { filterVariant: 'select' },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <span className="text-muted-foreground capitalize">{row.original.role}</span>
    ),
    enableSorting: false,
    meta: { filterVariant: 'select' },
  },
]

export function AdminCustomerExpandedRow({ customer }: { customer: CustomerWithStats }) {
  return (
    <div className="space-y-1 text-sm">
      {customer.telegramId && (
        <p>
          <span className="text-muted-foreground">Telegram: </span>
          {customer.telegramId}
        </p>
      )}
      {customer.notes && (
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Notes:</span> {customer.notes}
        </p>
      )}
    </div>
  )
}
