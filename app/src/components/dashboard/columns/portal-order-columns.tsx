'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@/components/dashboard/status-badge'
import type { MockOrder } from '@/data/mock-orders'
import { mockOrderItems } from '@/data/mock-orders'
import { formatUSD } from '@/lib/format-currency'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const portalOrderColumns: ColumnDef<MockOrder, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => (
      <Link
        href={`/portal/orders/${row.original.id}`}
        className="font-mono text-sm font-medium hover:text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.original.id}
      </Link>
    ),
    enableSorting: false,
  },
  {
    id: 'items',
    header: 'Products',
    cell: ({ row }) => {
      const items = mockOrderItems.filter((i) => i.orderId === row.original.id)
      const count = items.length
      const names = items.map((i) => i.productName).join(', ')
      return (
        <span className="text-muted-foreground text-sm" title={names}>
          {count} item{count !== 1 ? 's' : ''}
        </span>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => <span className="font-medium">{formatUSD(row.original.totalAmount)}</span>,
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

/** Expanded row: order items sub-table (read-only, no admin actions) */
export function PortalOrderExpandedRow({ order }: { order: MockOrder }) {
  const items = mockOrderItems.filter((i) => i.orderId === order.id)

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Order Items</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell className="text-muted-foreground capitalize">{item.productType}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">{formatUSD(item.unitPrice)}</TableCell>
              <TableCell className="text-right font-medium">
                {formatUSD(parseFloat(item.unitPrice) * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
