'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@/components/dashboard/status-badge'
import type { MockOrder } from '@/data/mock-orders'
import { formatVND } from '@/lib/format'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const orderColumns: ColumnDef<MockOrder, unknown>[] = [
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
    id: 'items',
    header: 'Products',
    cell: ({ row }) => (
      <span>
        {row.original.items.length} item{row.original.items.length !== 1 ? 's' : ''}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => <span className="font-medium">{formatVND(row.original.totalAmount)}</span>,
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

/** Expanded row: order items sub-table */
export function OrderExpandedRow({ order }: { order: MockOrder }) {
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
          {order.items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell className="text-muted-foreground capitalize">{item.productType}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">{formatVND(item.unitPrice)}</TableCell>
              <TableCell className="text-right font-medium">
                {formatVND(item.quantity * item.unitPrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {order.notes && (
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-foreground">Notes:</span> {order.notes}
        </p>
      )}
    </div>
  )
}
