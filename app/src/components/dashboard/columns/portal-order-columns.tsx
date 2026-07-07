'use client'

import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@/components/dashboard/status-badge'
import type { OrderStatus } from '@/data/mock-orders'
import { formatUSD } from '@/lib/format-currency'

/** Serialized portal order (dates as ISO strings) with its line items collapsed. */
export type SerializedOrder = {
  id: string
  orderNumber: number
  customerId: string
  totalAmount: string
  currency: string
  paymentMethod: string | null
  status: string
  shareToken: string | null
  notes: string | null
  paymentDate: string | null
  deliveredAt: string | null
  createdAt: string
  updatedAt: string
  items: { quantity: number; productName: string }[]
}

/**
 * Orders tab — simplified spec:
 * Order Time · Order (list of `Nx <name>`) · Revenue · Status · Delivered Time.
 * Row click → order detail (wired via AdminDataTable onRowClick).
 */
export const portalOrderColumns: ColumnDef<SerializedOrder, unknown>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Order Time',
    cell: ({ row }) => (
      <span className="text-muted-foreground whitespace-nowrap">
        {format(new Date(row.original.createdAt), 'dd/MM/yyyy')}
      </span>
    ),
  },
  {
    id: 'order',
    header: 'Order',
    enableSorting: false,
    cell: ({ row }) => {
      const items = row.original.items
      if (!items.length) return <span className="text-muted-foreground">—</span>
      return (
        <div className="flex flex-col gap-0.5">
          {items.map((it, i) => (
            <span key={i}>
              <span className="text-muted-foreground">{it.quantity}x</span> {it.productName}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Revenue',
    cell: ({ row }) => <span className="font-medium">{formatUSD(row.original.totalAmount)}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status as OrderStatus} />,
    meta: { filterVariant: 'select' },
  },
  {
    accessorKey: 'deliveredAt',
    header: 'Delivered Time',
    cell: ({ row }) =>
      row.original.deliveredAt ? (
        <span className="text-muted-foreground whitespace-nowrap">
          {format(new Date(row.original.deliveredAt), 'dd/MM/yyyy')}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
]
