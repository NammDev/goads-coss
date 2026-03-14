'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { buildPortalProductColumns } from '@/components/dashboard/columns/portal-product-columns'
import { decrypt } from '@/lib/db/encryption'
import { productTypeLabels } from '@/data/mock-products'
import type { DeliveredItem } from '@/lib/db/queries/order-queries'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import type { ProductType } from '@/lib/validators/credential-schemas'

interface Props {
  items: DeliveredItem[]
  toolbar?: React.ReactNode
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

function toMockShape(item: DeliveredItem): MockDeliveredItem {
  return {
    id: item.id,
    orderId: item.orderId,
    orderItemId: item.orderItemId ?? undefined,
    productType: item.productType as ProductType,
    uid: item.uid ?? undefined,
    credentials: parseCredentials(item.credentials),
    status: item.status as MockDeliveredItem['status'],
    deliveredAt: item.deliveredAt.toISOString(),
    warrantyUntil: item.warrantyUntil ? item.warrantyUntil.toISOString() : new Date().toISOString(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    note: undefined,
  }
}

export function OrderDetailDelivered({ items, toolbar }: Props) {
  if (items.length === 0) return null

  // Group by productType
  const grouped = useMemo(() => {
    const map = new Map<ProductType, MockDeliveredItem[]>()
    for (const item of items) {
      const type = item.productType as ProductType
      const existing = map.get(type) ?? []
      map.set(type, [...existing, toMockShape(item)])
    }
    return map
  }, [items])

  const types = Array.from(grouped.keys())

  if (types.length === 1) {
    const type = types[0]!
    const rows = grouped.get(type)!
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Delivered Items</h2>
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all products <ExternalLinkIcon className="size-3.5" />
        </Link>
      </div>
        <AdminDataTable
          data={rows}
          columns={buildPortalProductColumns(type)}
          searchPlaceholder="Search delivered items..."
          pageSize={10}
          toolbar={toolbar}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Delivered Items</h2>
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all products <ExternalLinkIcon className="size-3.5" />
        </Link>
      </div>
      <Tabs defaultValue={types[0]}>
        <TabsList className="bg-muted/30 !p-0 rounded-full !h-10">
          {types.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium !text-foreground/70 transition-all data-[state=active]:!bg-background data-[state=active]:shadow-sm data-[state=active]:!text-foreground"
            >
              {productTypeLabels[type] ?? type} ({grouped.get(type)!.length})
            </TabsTrigger>
          ))}
        </TabsList>
        {types.map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            <AdminDataTable
              data={grouped.get(type)!}
              columns={buildPortalProductColumns(type)}
              searchPlaceholder="Search delivered items..."
              pageSize={10}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
