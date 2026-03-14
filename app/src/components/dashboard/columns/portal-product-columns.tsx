'use client'

import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CopyableCell } from '@/components/dashboard/copyable-cell'
import type { MockDeliveredItem, DeliveredItemStatus } from '@/data/mock-delivered-items'
import { getProductNameForItem } from '@/data/mock-delivered-items'
import { getColumnsForType, type ProductType } from '@/lib/validators/credential-schemas'

const STATUS_CONFIG: Record<DeliveredItemStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: 'Inactive', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  banned:   { label: 'Banned',   className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  expired:  { label: 'Expired',  className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' },
}

export function buildPortalProductColumns(
  productType: ProductType
): ColumnDef<MockDeliveredItem, unknown>[] {
  const credentialCols = getColumnsForType(productType)

  const common: ColumnDef<MockDeliveredItem, unknown>[] = [
    {
      id: 'rowNumber',
      header: 'No',
      cell: ({ row }) => <span className="text-muted-foreground">{row.index + 1}</span>,
      enableSorting: false,
      size: 50,
    },
    {
      accessorKey: 'deliveredAt',
      header: 'Delivery Time',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {format(new Date(row.original.deliveredAt), 'dd/MM/yyyy HH:mm')}
        </span>
      ),
    },
    {
      id: 'productName',
      header: 'Name Product',
      cell: ({ row }) => (
        <span className="font-medium">{getProductNameForItem(row.original)}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'status',
      header: 'Check Live',
      cell: ({ row }) => {
        const config = STATUS_CONFIG[row.original.status]
        return (
          <Badge variant="outline" className={`border-transparent text-xs ${config.className}`}>
            {config.label}
          </Badge>
        )
      },
      meta: { filterVariant: 'select' },
    },
    {
      id: 'note',
      header: 'Note',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.note ?? '—'}
        </span>
      ),
      enableSorting: false,
    },
  ]

  const dynamic: ColumnDef<MockDeliveredItem, unknown>[] = credentialCols.map(
    ({ key, label }) => ({
      id: `cred_${key}`,
      header: label,
      cell: ({ row }) => (
        <CopyableCell value={row.original.credentials?.[key]} />
      ),
      enableSorting: false,
    })
  )

  return [...common, ...dynamic]
}
