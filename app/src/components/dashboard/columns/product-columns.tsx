'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import type { MockProduct } from '@/data/mock-products'
import { productTypeLabels } from '@/data/mock-products'
import { formatUSD } from '@/lib/format-currency'

export const productColumns: ColumnDef<MockProduct, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <Badge variant="outline">{productTypeLabels[row.original.type]}</Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <span className="font-medium">{formatUSD(row.original.price)}</span>,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = row.original.stock
      if (stock === -1) {
        return <span className="text-muted-foreground">Unlimited</span>
      }
      return (
        <span className={stock <= 5 ? 'font-medium text-red-600 dark:text-red-400' : ''}>
          {stock}
        </span>
      )
    },
  },
]

/** Expanded row: product description */
export function ProductExpandedRow({ product }: { product: MockProduct }) {
  return (
    <div className="max-w-lg space-y-1">
      <p className="text-sm font-medium">Description</p>
      <p className="text-muted-foreground text-sm">{product.description}</p>
    </div>
  )
}
