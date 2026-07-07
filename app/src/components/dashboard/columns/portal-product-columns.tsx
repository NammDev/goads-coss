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
import { productTypeLabels } from '@/data/mock-products'
import { getColumnsForType, type ProductType } from '@/lib/validators/credential-schemas'
import { getWarrantyDisplayStatus } from '@/lib/utils/warranty-utils'
import { cn } from '@/lib/utils'

/** Serialized delivered-item row for the portal BM/Profile/Page tabs (dates as ISO). */
export type SerializedDeliveredRow = {
  id: string
  orderId: string
  orderItemId?: string | null
  productType: string
  productName?: string | null
  uid?: string | null
  credentials: Record<string, string>
  note?: string | null
  checkLive?: string | null
  status?: string
  warrantyUntil: string | null
  deliveredAt: string
  claimStatus?: string | null
}

type Row = SerializedDeliveredRow
type Col = ColumnDef<Row, unknown>

const STATUS_CONFIG: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  banned: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  expired: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
}

/** Column descriptor → per-type display spec (exact order & labels). */
type Desc =
  | { t: 'date'; header: string }
  | { t: 'name'; header: string }
  | { t: 'note'; header: string }
  | { t: 'checkLive'; header: string }
  | { t: 'status'; header: string }
  | { t: 'uid'; header: string }
  | { t: 'cred'; header: string; key: string }

const SPECS: Partial<Record<ProductType, Desc[]>> = {
  profile: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'checkLive', header: 'Check Live' },
    { t: 'note', header: 'Note' },
    { t: 'uid', header: 'UID' },
    { t: 'cred', header: 'Password', key: 'password' },
    { t: 'cred', header: '2FA', key: 'twoFa' },
  ],
  bm: [
    { t: 'date', header: 'Time Delivery' },
    { t: 'name', header: 'Name Product' },
    { t: 'note', header: 'Noted' },
    { t: 'cred', header: 'Business Name', key: 'name' },
    { t: 'cred', header: 'ID BM', key: 'bmId' },
  ],
  page: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'note', header: 'Note' },
    { t: 'cred', header: 'Page Name', key: 'name' },
    { t: 'cred', header: 'Page ID', key: 'pageId' },
    { t: 'cred', header: 'Link', key: 'link' },
  ],
}

/** Fallback for other product types — generic set from the schema. */
function genericSpec(type: ProductType): Desc[] {
  return [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'note', header: 'Note' },
    { t: 'uid', header: 'UID' },
    ...getColumnsForType(type)
      .filter((c) => c.key !== 'note' && c.key !== 'checkLive')
      .map((c): Desc => ({ t: 'cred', header: c.label, key: c.key })),
  ]
}

/** Admin variant — status badge + ALL credential fields (unchanged from before). */
function adminSpec(type: ProductType): Desc[] {
  return [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'status', header: 'Check Live' },
    { t: 'note', header: 'Note' },
    { t: 'uid', header: 'UID' },
    ...getColumnsForType(type)
      .filter((c) => c.key !== 'note' && c.key !== 'checkLive')
      .map((c): Desc => ({ t: 'cred', header: c.label, key: c.key })),
  ]
}

const muted = (v?: string | null) =>
  v ? <span>{v}</span> : <span className="text-muted-foreground">—</span>

function CheckLiveBadge({ value }: { value: string | null }) {
  if (!value) return <span className="text-muted-foreground">—</span>
  const v = value.toLowerCase()
  const live = ['live', 'alive', 'active', 'ok'].includes(v)
  const dead = ['die', 'dead', 'banned', 'disabled'].includes(v)
  return (
    <Badge
      variant="outline"
      className={cn(
        'border-transparent text-xs',
        live && 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        dead && 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        !live && !dead && 'bg-muted text-muted-foreground'
      )}
    >
      {value}
    </Badge>
  )
}

function descToColumn(d: Desc): Col {
  switch (d.t) {
    case 'date':
      return {
        id: 'deliveredAt',
        header: d.header,
        cell: ({ row }) => (
          <span className="text-muted-foreground whitespace-nowrap">
            {format(new Date(row.original.deliveredAt), 'dd/MM/yyyy')}
          </span>
        ),
      }
    case 'name':
      return {
        id: 'productName',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => (
          <span className="font-medium whitespace-nowrap">
            {row.original.productName ?? productTypeLabels[row.original.productType as ProductType] ?? row.original.productType}
          </span>
        ),
      }
    case 'note':
      return {
        id: 'note',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.note ?? '—'}</span>,
      }
    case 'checkLive':
      return {
        id: 'checkLive',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => <CheckLiveBadge value={row.original.checkLive ?? null} />,
      }
    case 'status':
      return {
        id: 'status',
        header: d.header,
        meta: { filterVariant: 'select' },
        cell: ({ row }) => {
          const status = row.original.status ?? 'active'
          return (
            <Badge variant="outline" className={cn('border-transparent text-xs', STATUS_CONFIG[status])}>
              {status}
            </Badge>
          )
        },
      }
    case 'uid':
      return {
        id: 'uid',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => <CopyableCell value={row.original.uid ?? undefined} />,
      }
    case 'cred':
      return {
        id: `cred_${d.key}`,
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => <CopyableCell value={row.original.credentials?.[d.key]} />,
      }
  }
}

export function buildPortalProductColumns(
  productType: ProductType,
  showWarrantyActions = true,
  variant: 'portal' | 'admin' = 'portal',
): Col[] {
  const spec =
    variant === 'admin'
      ? adminSpec(productType)
      : (SPECS[productType] ?? genericSpec(productType))
  const cols = spec.map(descToColumn)

  const warrantyCol: Col = {
    id: 'warranty',
    header: 'Warranty',
    enableSorting: false,
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
            <WarrantyClaimDialog deliveredItemId={item.id} disabled={!claimable} />
          )}
        </div>
      )
    },
  }

  const actionsCol: Col = {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <ProductRowActions item={row.original} />,
  }

  return [...cols, warrantyCol, actionsCol]
}

function ProductRowActions({ item }: { item: Row }) {
  const credentialText = Object.entries(item.credentials ?? {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  function copyCredentials() {
    if (credentialText) navigator.clipboard.writeText(credentialText).catch(() => {})
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
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View</DropdownMenuItem>
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
