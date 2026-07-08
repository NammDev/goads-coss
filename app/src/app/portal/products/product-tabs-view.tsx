'use client'

import { useSearchParams } from 'next/navigation'
import { PackageIcon } from 'lucide-react'

import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/lib/validators/credential-schemas'
import type { SerializedDeliveredRow } from '@/components/dashboard/columns/portal-product-columns'
import { PortalProductsTable } from '@/app/portal/products/[type]/portal-products-table'

const TABS = ['bm', 'profile', 'page', 'agency_account', 'tiktok_account'] as const

/**
 * Instant BM/Profile/Page tabs. All delivered items are fetched ONCE by the
 * server page; the active tab comes from `?type=` and switching only filters
 * in memory (the server component ignores searchParams → no refetch, no
 * skeleton). Sidebar links drive `?type=` client-side.
 */
export function ProductTabsView({ items }: { items: SerializedDeliveredRow[] }) {
  const raw = useSearchParams().get('type')
  const type: ProductType = (TABS as readonly string[]).includes(raw ?? '')
    ? (raw as ProductType)
    : 'bm'

  const filtered = items.filter((i) => i.productType === type)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <h1 className="text-2xl font-semibold">{productTypeLabels[type]}</h1>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <PackageIcon className="mb-3 size-10 text-muted-foreground/50" />
          <p className="text-lg font-medium">No delivered products yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Products will appear here once items from your orders are delivered.
          </p>
        </div>
      ) : (
        <PortalProductsTable items={filtered} productType={type} />
      )}
    </div>
  )
}
