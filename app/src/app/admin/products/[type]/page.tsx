import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { deliveredItems } from '@/lib/db/schema'
import { productTypeLabels } from '@/data/mock-products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/lib/validators/credential-schemas'
import type { MockDeliveredItem } from '@/data/mock-delivered-items'
import { AdminProductsTable } from './products-table'

const validTypes = new Set<string>(Object.keys(productTypeLabels))

export default async function AdminProductTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params

  if (!validTypes.has(type)) notFound()

  const productType = type as ProductType

  const rows = await db
    .select()
    .from(deliveredItems)
    .where(eq(deliveredItems.productType, productType))

  // Map DB rows to MockDeliveredItem shape for column compatibility
  const items: MockDeliveredItem[] = rows.map((row) => ({
    id: row.id,
    orderId: row.orderId,
    orderItemId: row.orderItemId ?? undefined,
    productType: row.productType as ProductType,
    uid: row.uid ?? undefined,
    credentials: row.credentials ? (() => {
      try { return JSON.parse(row.credentials as string) as Record<string, string> }
      catch { return undefined }
    })() : undefined,
    status: row.status,
    deliveredAt: row.deliveredAt.toISOString(),
    warrantyUntil: row.warrantyUntil ? row.warrantyUntil.toISOString() : new Date().toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    note: undefined,
  }))

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
        <AdminProductsTable items={items} productType={productType} />
      )}
    </div>
  )
}
