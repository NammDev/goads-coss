'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  if (items.length === 0) return null

  // Group by productType
  const grouped = useMemo(() => {
    const map = new Map<ProductType, SerializedDeliveredRow[]>()
    for (const item of items) {
      const type = item.productType as ProductType
      const existing = map.get(type) ?? []
      map.set(type, [...existing, toRow(item, claimStatusMap)])
    }
    return map
  }, [items, claimStatusMap])

  const types = Array.from(grouped.keys())

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Delivered Items</h2>
      <Tabs defaultValue={types[0]}>
        <TabsList className="h-9 w-fit">
          {types.map((type) => (
            <TabsTrigger key={type} value={type} className="cursor-pointer">
              {productTypeLabels[type] ?? type}
              <Badge variant="secondary">{grouped.get(type)!.length}</Badge>
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
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
