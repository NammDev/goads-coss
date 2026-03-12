import { notFound } from 'next/navigation'

import { requireRole } from '@/lib/auth/require-role'
import { getDeliveredItemsByType } from '@/lib/db/queries'
import type { ProductType as DBProductType } from '@/lib/db/queries'
import { productTypeLabels } from '@/data/mock-products'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import type { ProductType } from '@/lib/validators/credential-schemas'
import { PortalProductsTable } from './portal-products-table'

const validTypes = new Set<string>(Object.keys(productTypeLabels))

/** Parse credentials JSON — data is stored as plain JSON in DB */
function parseCredentials(raw: string | null): Record<string, string> | undefined {
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return undefined
  }
}

export default async function PortalProductTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const session = await requireRole('customer')
  const { type } = await params

  if (!validTypes.has(type)) notFound()

  const productType = type as ProductType
  // "page" exists in credential-schemas but not in DB enum — return empty if so
  const dbProductType = productType as DBProductType
  const dbItems = await getDeliveredItemsByType(session.user.id, dbProductType)

  // Map DB delivered items → MockDeliveredItem shape for column compatibility
  const items: MockDeliveredItem[] = dbItems.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    orderItemId: item.orderItemId ?? undefined,
    productType: item.productType as ProductType,
    uid: item.uid ?? undefined,
    credentials: parseCredentials(item.credentials),
    status: item.status as MockDeliveredItem['status'],
    deliveredAt: item.deliveredAt.toISOString(),
    warrantyUntil: item.warrantyUntil?.toISOString() ?? new Date().toISOString(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{productTypeLabels[productType]}</h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No delivered products in this category yet.</p>
      ) : (
        <PortalProductsTable items={items} productType={productType} />
      )}
    </div>
  )
}
