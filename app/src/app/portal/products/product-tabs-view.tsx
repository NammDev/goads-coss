'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { PackageIcon } from 'lucide-react'

import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/lib/validators/credential-schemas'
import type { SerializedDeliveredRow } from '@/components/dashboard/columns/portal-product-columns'
import { PortalProductsTable } from '@/app/portal/products/[type]/portal-products-table'

const TABS = ['bm', 'profile', 'page', 'agency_account', 'tiktok_account'] as const

/** Product-type → catalog logo (same webp assets as the sidebar + pricing). */
const TYPE_ICON: Record<string, string> = {
  bm: '/assets/BM.webp',
  profile: '/assets/PROFILES.webp',
  page: '/navbar/pages.webp',
  agency_account: '/assets/META.webp',
  tiktok_account: '/navbar/tiktok.webp',
}

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
  const count = filtered.length

  return (
    <div className="flex flex-1 flex-col gap-5">
      {/* Section header — icon tile + title + delivered count */}
      <div className="flex items-center gap-3">
        <div className="bg-card flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm">
          <Image
            src={TYPE_ICON[type] ?? '/assets/BM.webp'}
            alt=""
            width={26}
            height={26}
            className="size-[26px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl leading-none font-semibold tracking-tight">
            {productTypeLabels[type]}
          </h1>
          <span className="text-muted-foreground text-sm">
            {count === 0
              ? 'No items delivered yet'
              : `${count} item${count > 1 ? 's' : ''} delivered`}
          </span>
        </div>
      </div>

      {count === 0 ? (
        <div className="bg-card/40 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <div className="bg-muted text-muted-foreground/70 mb-4 flex size-12 items-center justify-center rounded-xl">
            <PackageIcon className="size-6" />
          </div>
          <p className="text-base font-medium">Nothing here yet</p>
          <p className="text-muted-foreground mt-1 max-w-xs text-sm">
            Delivered {productTypeLabels[type].toLowerCase()} items will show up here automatically
            once your orders are fulfilled.
          </p>
        </div>
      ) : (
        <PortalProductsTable items={filtered} productType={type} />
      )}
    </div>
  )
}
