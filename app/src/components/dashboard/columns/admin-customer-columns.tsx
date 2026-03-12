'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatUSD } from '@/lib/format-currency'
import type { CustomerWithStats } from '@/lib/db/queries'

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
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <span className="text-muted-foreground capitalize">{row.original.role}</span>
    ),
    enableSorting: false,
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
