'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@/components/dashboard/status-badge'
import type { OrderStatus } from '@/data/mock-orders'
import { formatUSD } from '@/lib/format-currency'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/** Serialized order from server (dates as ISO strings) */
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
}

/** Serialized order item from server */
export type SerializedOrderItem = {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: string
  createdAt: string
  productName: string
}

export const portalOrderColumns: ColumnDef<SerializedOrder, unknown>[] = [
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
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => <span className="font-medium">{formatUSD(row.original.totalAmount)}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status as OrderStatus} />,
    meta: { filterVariant: 'select' },
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

/** Expanded row showing order items sub-table */
export function PortalOrderExpandedRow({
  order,
  orderItems,
}: {
  order: SerializedOrder
  orderItems: SerializedOrderItem[]
}) {
  const items = orderItems.filter((i) => i.orderId === order.id)

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No items found for this order.</p>
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Order Items</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.productName}</TableCell>
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
