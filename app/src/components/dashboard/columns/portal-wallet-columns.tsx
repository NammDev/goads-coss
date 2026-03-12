'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { formatUSD } from '@/lib/format-currency'
import type { WalletTransaction } from '@/lib/db/queries/wallet-queries'

export type SerializedWalletTransaction = Omit<WalletTransaction, 'createdAt'> & {
  createdAt: string
}

export const portalWalletColumns: ColumnDef<SerializedWalletTransaction, unknown>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {format(new Date(row.original.createdAt), 'dd/MM/yyyy HH:mm')}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const isTopup = row.original.type === 'topup'
      return (
        <Badge variant={isTopup ? 'default' : 'destructive'} className="capitalize">
          {isTopup ? 'Top-up' : 'Deduct'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const isTopup = row.original.type === 'topup'
      return (
        <span className={isTopup ? 'font-medium text-green-600' : 'font-medium text-red-600'}>
          {isTopup ? '+' : '-'}{formatUSD(row.original.amount)}
        </span>
      )
    },
  },
  {
    accessorKey: 'balanceAfter',
    header: 'Balance After',
    cell: ({ row }) => (
      <span className="font-medium">{formatUSD(row.original.balanceAfter)}</span>
    ),
  },
  {
    accessorKey: 'orderId',
    header: 'Order',
    cell: ({ row }) => {
      const orderId = row.original.orderId
      if (!orderId) return <span className="text-muted-foreground">—</span>
      return (
        <Link
          href={`/portal/orders/${orderId}`}
          className="font-mono text-sm text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {orderId}
        </Link>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => {
      const note = row.original.note
      if (!note) return <span className="text-muted-foreground">—</span>
      return (
        <span className="text-muted-foreground max-w-[200px] truncate text-sm" title={note}>
          {note}
        </span>
      )
    },
    enableSorting: false,
  },
]
