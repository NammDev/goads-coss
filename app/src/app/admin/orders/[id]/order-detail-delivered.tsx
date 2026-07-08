'use client'

import { useMemo } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import {
  buildPortalProductColumns,
  type SerializedDeliveredRow,
} from '@/components/dashboard/columns/portal-product-columns'
import { ExpandedProductRow } from '@/app/admin/products/[type]/products-table'
import { decrypt } from '@/lib/db/encryption'
import { productTypeLabels } from '@/data/mock-products'
import type { DeliveredItem } from '@/lib/db/queries/order-queries'
import type { ProductType } from '@/lib/validators/credential-schemas'

interface Props {
  items: DeliveredItem[]
  toolbar?: React.ReactNode
  /** Map of deliveredItemId → claimStatus for warranty display */
  claimStatusMap?: Map<string, string>
  /** Show warranty claim button — portal only */
  showWarrantyActions?: boolean
}

function parseCredentials(raw: string | null): Record<string, string> | undefined {
  if (!raw) return undefined
  try {
    const decrypted = decrypt(raw)
    return JSON.parse(decrypted) as Record<string, string>
  } catch {
    try {
      return JSON.parse(raw) as Record<string, string>
    } catch {
      return undefined
    }
  }
}

function toRow(
  item: DeliveredItem,
  claimStatusMap?: Map<string, string>,
): SerializedDeliveredRow {
  const credentials = parseCredentials(item.credentials) ?? {}
  return {
    id: item.id,
    orderId: item.orderId,
    orderItemId: item.orderItemId ?? null,
    productType: item.productType,
    productName: null,
    uid: item.uid ?? null,
    credentials,
    note: credentials.note ?? null,
    checkLive: credentials.checkLive ?? null,
    status: item.status,
    deliveredAt: item.deliveredAt.toISOString(),
    warrantyUntil: item.warrantyUntil ? item.warrantyUntil.toISOString() : null,
    claimStatus: claimStatusMap?.get(item.id) ?? null,
  }
}

export function OrderDetailDelivered({ items, toolbar, claimStatusMap, showWarrantyActions = false }: Props) {
  // Group by productType (hook must run before any early return — rules-of-hooks).
  const grouped = useMemo(() => {
    const map = new Map<ProductType, SerializedDeliveredRow[]>()
    for (const item of items) {
      const type = item.productType as ProductType
      const existing = map.get(type) ?? []
      map.set(type, [...existing, toRow(item, claimStatusMap)])
    }
    return map
  }, [items, claimStatusMap])

  if (items.length === 0) return null

  const types = Array.from(grouped.keys())

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Delivered Items</h2>
      <Tabs defaultValue={types[0]}>
        <TabsList className="h-9 w-fit">
          {types.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className={cn(
                'cursor-pointer text-muted-foreground',
                // Active = solid dark pill (unmistakable in the monochrome theme).
                'data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:font-semibold',
                // Count chip flips to read on the dark active pill.
                '[&[data-state=active]_.tab-count]:bg-background/25 [&[data-state=active]_.tab-count]:text-background',
              )}
            >
              {productTypeLabels[type] ?? type}
              <span className="tab-count bg-foreground/10 text-muted-foreground inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium">
                {grouped.get(type)!.length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {types.map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            <AdminDataTable
              data={grouped.get(type)!}
              columns={buildPortalProductColumns(type, showWarrantyActions, showWarrantyActions ? 'portal' : 'admin')}
              searchPlaceholder="Search by UID, BM ID, email, credentials..."
              pageSize={10}
              toolbar={toolbar}
              renderExpandedRow={(item) => <ExpandedProductRow item={item} />}
              // Portal variant → clean dense look, no column toggle / selection noise.
              dense={showWarrantyActions}
              hideColumnToggle={showWarrantyActions}
              hideSelectionCount={showWarrantyActions}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
