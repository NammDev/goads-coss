'use client'

import { useMemo } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { buildPortalProductColumns } from '@/components/dashboard/columns/portal-product-columns'
import { decrypt } from '@/lib/db/encryption'
import type { DeliveredItem } from '@/lib/db/queries/order-queries'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import type { ProductType } from '@/lib/validators/credential-schemas'

interface Props {
  items: DeliveredItem[]
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

export function OrderDetailDelivered({ items }: Props) {
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
        <h2 className="text-lg font-semibold">Delivered Items</h2>
        <AdminDataTable
          data={rows}
          columns={buildPortalProductColumns(type)}
          searchPlaceholder="Search delivered items..."
          pageSize={10}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Delivered Items</h2>
      <Tabs defaultValue={types[0]}>
        <TabsList className="bg-muted/30 !p-0 rounded-full !h-10">
          {types.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium !text-foreground/70 transition-all data-[state=active]:!bg-background data-[state=active]:shadow-sm data-[state=active]:!text-foreground"
            >
              {type}
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
