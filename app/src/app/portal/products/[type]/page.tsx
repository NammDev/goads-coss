import { notFound } from 'next/navigation'
import { PackageIcon } from 'lucide-react'

import { requireRole } from '@/lib/auth/require-role'
import { getDeliveredItemsByType } from '@/lib/db/queries'
import type { ProductType as DBProductType } from '@/lib/db/queries'
import { productTypeLabels } from '@/data/mock-products'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import type { ProductType } from '@/lib/validators/credential-schemas'
import { EmptyState } from '@/components/dashboard/empty-state'
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
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <PackageIcon className="mb-3 size-10 text-muted-foreground/50" />
          <p className="text-lg font-medium">No delivered products yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Products will appear here once items from your orders are delivered.</p>
        </div>
      ) : (
        <PortalProductsTable items={items} productType={productType} />
      )}
    </div>
  )
}
