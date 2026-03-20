'use client'

import { format } from 'date-fns'
import { EllipsisVerticalIcon, CopyIcon } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CopyableCell } from '@/components/dashboard/copyable-cell'
import { WarrantyBadge } from '@/components/dashboard/warranty-badge'
import { WarrantyClaimDialog } from '@/app/portal/orders/[id]/warranty-claim-dialog'
import type { MockDeliveredItem, DeliveredItemStatus } from '@/data/mock-delivered-items'
import { getProductNameForItem } from '@/data/mock-delivered-items'
import { getColumnsForType, type ProductType } from '@/lib/validators/credential-schemas'
import { getWarrantyDisplayStatus } from '@/lib/utils/warranty-utils'

const STATUS_CONFIG: Record<DeliveredItemStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: 'Inactive', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  banned:   { label: 'Banned',   className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  expired:  { label: 'Expired',  className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' },
}

export function buildPortalProductColumns(
  productType: ProductType,
  showWarrantyActions = false,
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

  const warrantyCol: ColumnDef<MockDeliveredItem, unknown> = {
    id: 'warranty',
    header: 'Warranty',
    cell: ({ row }) => {
      const item = row.original
      const warrantyUntil = item.warrantyUntil ? new Date(item.warrantyUntil) : null
      const claimStatus = item.claimStatus ?? null
      const displayStatus = getWarrantyDisplayStatus(warrantyUntil, claimStatus)
      const claimable = displayStatus === 'active' || displayStatus === 'expiring'
      return (
        <div className="flex items-center gap-2">
          <WarrantyBadge warrantyUntil={warrantyUntil} claimStatus={claimStatus} />
          {showWarrantyActions && (
            <WarrantyClaimDialog
              deliveredItemId={item.id}
              disabled={!claimable}
            />
          )}
        </div>
      )
    },
    enableSorting: false,
  }

  const actions: ColumnDef<MockDeliveredItem, unknown> = {
    id: 'actions',
    cell: ({ row }) => <ProductRowActions item={row.original} />,
    enableSorting: false,
    enableHiding: false,
  }

  return [...common, ...dynamic, warrantyCol, actions]
}

function ProductRowActions({ item }: { item: MockDeliveredItem }) {
  const credentialText = item.credentials
    ? Object.entries(item.credentials)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : ''

  function copyCredentials() {
    if (credentialText) {
      navigator.clipboard.writeText(credentialText).catch(() => {})
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-muted text-muted-foreground size-8 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVerticalIcon size={16} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => { e.stopPropagation(); copyCredentials() }}
          disabled={!credentialText}
        >
          <CopyIcon size={14} />
          Copy Credentials
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
