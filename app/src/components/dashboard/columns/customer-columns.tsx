'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { MockCustomer } from '@/data/mock-customers'
import { mockOrders, mockOrderItems } from '@/data/mock-orders'
import { formatVND } from '@/lib/format'
import { formatUSD } from '@/lib/format-currency'
import { StatusBadge } from '@/components/dashboard/status-badge'

export const customerColumns: ColumnDef<MockCustomer, unknown>[] = [
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
    accessorKey: 'totalOrders',
    header: 'Orders',
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent',
    cell: ({ row }) => <span className="font-medium">{formatVND(row.original.totalSpent)}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.original.status === 'active'
      return (
        <Badge
          variant="outline"
          className={
            active
              ? 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'border-transparent bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
          }
        >
          {active ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    enableSorting: false,
  },
]

/** Expanded row: customer's recent orders */
export function CustomerExpandedRow({ customer }: { customer: MockCustomer }) {
  const customerOrders = mockOrders.filter((o) => o.customerId === customer.id)

  if (customerOrders.length === 0) {
    return <p className="text-muted-foreground text-sm">No orders found.</p>
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Recent Orders ({customerOrders.length})</p>
      <div className="space-y-1">
        {customerOrders.slice(0, 5).map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm">
            <Link href={`/admin/orders/${order.id}`} className="font-mono hover:underline">
              {order.id}
            </Link>
            <span>{mockOrderItems.filter(i => i.orderId === order.id).length} item{mockOrderItems.filter(i => i.orderId === order.id).length !== 1 ? 's' : ''}</span>
            <span className="font-medium">{formatUSD(order.totalAmount)}</span>
            <StatusBadge status={order.status} />
          </div>
        ))}
      </div>
      {customer.notes && (
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-foreground">Notes:</span> {customer.notes}
        </p>
      )}
    </div>
  )
}
