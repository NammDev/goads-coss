'use client'

import { format, formatDistanceToNow } from 'date-fns'
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
import { CustomerNoteCell } from '@/components/dashboard/customer-note-cell'
import { LiveUidBadge } from '@/components/dashboard/live-uid-badge'
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
  customerNote?: string | null
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
  | { t: 'elapsed'; header: string }
  | { t: 'warrantyLeft'; header: string }
  | { t: 'warrantyClaim'; header: string }
  | { t: 'name'; header: string }
  | { t: 'note'; header: string }
  | { t: 'customerNote'; header: string }
  | { t: 'checkLive'; header: string }
  | { t: 'status'; header: string }
  | { t: 'uid'; header: string }
  | { t: 'cred'; header: string; key: string; wide?: boolean }

/** Desc types that render warranty — presence disables the auto-appended warranty column. */
const WARRANTY_DESCS = new Set(['warrantyLeft', 'warrantyClaim'])

const SPECS: Partial<Record<ProductType, Desc[]>> = {
  profile: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'checkLive', header: 'Status' }, // live / disabled — auto-checked later
    { t: 'uid', header: 'UID' },
    { t: 'cred', header: 'Password', key: 'password' },
    { t: 'cred', header: '2FA', key: 'twoFa' },
    { t: 'cred', header: 'Email', key: 'email' },
    { t: 'cred', header: 'Password Email', key: 'passEmail' },
    { t: 'cred', header: 'Recover Email', key: 'recoverEmail' },
    { t: 'cred', header: 'Cookie', key: 'cookie' },
    { t: 'note', header: 'GOADS Note' },
    { t: 'customerNote', header: 'Client Note' },
  ],
  bm: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'BM Type' }, // product variant, e.g. "BM5 Verified"
    { t: 'cred', header: 'BM Name', key: 'name', wide: true },
    { t: 'cred', header: 'BM ID', key: 'bmId', wide: true },
    { t: 'cred', header: 'Invitation Link 1', key: 'inviteLink1' },
    { t: 'cred', header: 'Invitation Link 2', key: 'inviteLink2' },
    { t: 'cred', header: 'Invitation Link 3', key: 'inviteLink3' },
    { t: 'cred', header: 'Invitation Link 4', key: 'inviteLink4' },
    { t: 'note', header: 'GOADS Note' },
    { t: 'customerNote', header: 'Client Note' },
  ],
  page: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'cred', header: 'Link Page', key: 'link', wide: true },
    { t: 'note', header: 'GOADS Note' },
    { t: 'customerNote', header: 'Client Note' },
  ],
  agency_account: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'cred', header: 'Ad Account ID', key: 'adAccountId', wide: true },
    { t: 'cred', header: 'BM ID Received', key: 'bmId', wide: true },
    { t: 'note', header: 'GOADS Note' },
    { t: 'customerNote', header: 'Client Note' },
  ],
  tiktok_account: [
    { t: 'date', header: 'Delivery Time' },
    { t: 'name', header: 'Name Product' },
    { t: 'cred', header: 'Username', key: 'username', wide: true },
    { t: 'cred', header: 'Password', key: 'password' },
    { t: 'cred', header: '2FA', key: 'twoFa' },
    { t: 'cred', header: 'Email', key: 'email' },
    { t: 'cred', header: 'Password Email', key: 'passEmail' },
    { t: 'note', header: 'GOADS Note' },
    { t: 'customerNote', header: 'Client Note' },
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
    case 'elapsed':
      return {
        id: 'elapsed',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => (
          <span className="text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(row.original.deliveredAt), { addSuffix: true })}
          </span>
        ),
      }
    case 'warrantyLeft':
      return {
        id: 'warrantyLeft',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => {
          const w = row.original.warrantyUntil ? new Date(row.original.warrantyUntil) : null
          return <WarrantyBadge warrantyUntil={w} claimStatus={row.original.claimStatus ?? null} />
        },
      }
    case 'warrantyClaim':
      return {
        id: 'warrantyClaim',
        header: d.header,
        enableSorting: false,
        // Shrink column to just fit the claim button (w-px + nowrap hug trick).
        meta: { className: 'w-px whitespace-nowrap' },
        cell: ({ row }) => {
          const item = row.original
          const w = item.warrantyUntil ? new Date(item.warrantyUntil) : null
          const displayStatus = getWarrantyDisplayStatus(w, item.claimStatus ?? null)
          const claimable = displayStatus === 'active' || displayStatus === 'expiring'
          return <WarrantyClaimDialog deliveredItemId={item.id} disabled={!claimable} />
        },
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
    case 'customerNote':
      return {
        id: 'customerNote',
        header: d.header,
        enableSorting: false,
        cell: ({ row }) => (
          <CustomerNoteCell
            deliveredItemId={row.original.id}
            initialValue={row.original.customerNote ?? null}
          />
        ),
      }
    case 'note':
      return {
        id: 'note',
        header: d.header,
        enableSorting: false,
        // Click-to-copy, non-mono (prose) style.
        cell: ({ row }) => (
          <CopyableCell
            value={row.original.note ?? undefined}
            className="font-sans text-muted-foreground"
            textClassName="max-w-[240px]"
          />
        ),
      }
    case 'checkLive':
      return {
        id: 'checkLive',
        header: d.header,
        enableSorting: false,
        // Auto-probes the delivered account's UID (Active / Disabled) so the
        // customer always sees whether their profile is still alive.
        cell: ({ row }) => <LiveUidBadge uid={row.original.uid} />,
      }
    case 'status':
      return {
        id: 'status',
        header: d.header,
        meta: { filterVariant: 'select' },
        cell: ({ row }) => {
          const status = row.original.status ?? 'active'
          return (
            <Badge
              variant="outline"
              className={cn(
                'rounded-full border-transparent px-2 py-0.5 text-xs font-medium capitalize',
                STATUS_CONFIG[status],
              )}
            >
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
        cell: ({ row }) =>
          d.wide ? (
            <div className="min-w-40">
              <CopyableCell value={row.original.credentials?.[d.key]} textClassName="max-w-[300px]" />
            </div>
          ) : (
            <CopyableCell value={row.original.credentials?.[d.key]} />
          ),
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

  // If the spec already places a warranty column (e.g. BM), don't also append
  // the default combined warranty+claim column.
  const specHasWarranty = spec.some((d) => WARRANTY_DESCS.has(d.t))

  const warrantyCol: Col = {
    id: 'warranty',
    header: 'Warranty',
    enableSorting: false,
    // Hug content: "6d left" badge + Claim button in one compact column.
    meta: { className: 'w-px whitespace-nowrap' },
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

  return specHasWarranty
    ? [...cols, actionsCol]
    : [...cols, warrantyCol, actionsCol]
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
