'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { differenceInDays, format } from 'date-fns'
import { AlertTriangleIcon, CalendarIcon, FileTextIcon, PlusIcon, ShieldCheckIcon } from 'lucide-react'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { buildPortalProductColumns } from '@/components/dashboard/columns/portal-product-columns'
import { mockDeliveredItems } from '@/data/mock-delivered-items'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import { productTypeLabels } from '@/data/mock-products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/lib/validators/credential-schemas'

const validTypes = new Set<string>(Object.keys(productTypeLabels))

const USAGE_RULES = [
  'Do not change Business Manager name or settings without approval.',
  'Do not share credentials with unauthorized parties.',
  'Contact support immediately if the account is restricted.',
]

/** Expanded row showing warranty, rules, and notes (admin version with order link to /admin) */
function ExpandedProductRow({ item }: { item: MockDeliveredItem }) {
  const warrantyDaysLeft = differenceInDays(new Date(item.warrantyUntil), new Date())
  const isExpired = warrantyDaysLeft < 0
  const isExpiringSoon = warrantyDaysLeft <= 3 && warrantyDaysLeft >= 0

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <ShieldCheckIcon className="size-4 text-muted-foreground" />
          Warranty
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Expires: </span>
          {format(new Date(item.warrantyUntil), 'dd/MM/yyyy')}
        </div>
        {isExpired ? (
          <div className="flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1.5 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <AlertTriangleIcon className="size-3.5 shrink-0" />
            Warranty expired
          </div>
        ) : isExpiringSoon ? (
          <div className="flex items-center gap-1.5 rounded-md bg-orange-50 px-2.5 py-1.5 text-xs text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
            <AlertTriangleIcon className="size-3.5 shrink-0" />
            {warrantyDaysLeft} day{warrantyDaysLeft !== 1 ? 's' : ''} left
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {warrantyDaysLeft} day{warrantyDaysLeft !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <FileTextIcon className="size-4 text-muted-foreground" />
          Usage Rules
        </div>
        <ul className="space-y-1">
          {USAGE_RULES.map((rule, i) => (
            <li key={i} className="text-xs text-muted-foreground">• {rule}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <CalendarIcon className="size-4 text-muted-foreground" />
          Info
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Order: </span>
            <Link href={`/admin/orders/${item.orderId}`} className="text-primary hover:underline">
              {item.orderId}
            </Link>
          </p>
          <p>
            <span className="font-medium text-foreground">Delivered: </span>
            {format(new Date(item.deliveredAt), 'dd/MM/yyyy HH:mm')}
          </p>
          {item.note && (
            <p>
              <span className="font-medium text-foreground">Note: </span>
              {item.note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminProductTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params)

  if (!validTypes.has(type)) notFound()

  const productType = type as ProductType
  /** Admin sees ALL delivered items, not filtered by customer */
  const items = mockDeliveredItems.filter((d) => d.productType === productType)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{productTypeLabels[productType]}</h1>
          <Badge variant="secondary">{items.length} items</Badge>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusIcon className="mr-1 size-4" />
            New Product
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No delivered items in this category yet.</p>
      ) : (
        <AdminDataTable
          data={items}
          columns={buildPortalProductColumns(productType)}
          renderExpandedRow={(item) => <ExpandedProductRow item={item} />}
          searchPlaceholder={`Search ${productTypeLabels[productType]}...`}
          pageSize={20}
        />
      )}
    </div>
  )
}
