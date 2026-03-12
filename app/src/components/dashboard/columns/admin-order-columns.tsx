'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { formatUSD } from '@/lib/format-currency'
import type { OrderWithCustomer } from '@/lib/db/queries'

export const adminOrderColumns: ColumnDef<OrderWithCustomer, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original.id}`}
        className="font-mono text-sm font-medium hover:text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.original.id}
      </Link>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => (
      <span className="font-medium">{formatUSD(row.original.totalAmount)}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {format(new Date(row.original.createdAt), 'dd/MM/yyyy')}
      </span>
    ),
  },
]

/** Expanded row: order notes (items loaded on detail page) */
export function AdminOrderExpandedRow({ order }: { order: OrderWithCustomer }) {
  return (
    <div className="space-y-1 text-sm">
      <p>
        <span className="text-muted-foreground">Customer ID: </span>
        <Link href={`/admin/customers/${order.customerId}`} className="hover:text-primary hover:underline">
          {order.customerId}
        </Link>
      </p>
      {order.notes && (
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Notes:</span> {order.notes}
        </p>
      )}
    </div>
  )
}
