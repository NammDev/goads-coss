'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { productTypeLabels } from '@/data/mock-products'
import { cn } from '@/lib/utils'

/** Ordered product types for tab display */
const tabOrder = [
  'agency_account', 'bm', 'profile', 'page',
  'google_agency', 'tiktok_agency', 'tiktok_account',
  'blue_verification', 'unban',
] as const

interface Props {
  productCounts: Record<string, number>
}

/** Route-based product type tabs — styled like shadcnstore dashboard tabs */
export function ProductTypeTabs({ productCounts }: Props) {
  const pathname = usePathname()

  // Show all product types, even with 0 items
  const visibleTabs = [...tabOrder]

  if (visibleTabs.length === 0) return null

  return (
    <div className="inline-flex items-center rounded-full bg-muted/30">
      {visibleTabs.map((type) => {
        const isActive = pathname === `/admin/products/${type}`
        const count = productCounts[type] ?? 0
        return (
          <Link
            key={type}
            href={`/admin/products/${type}`}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-foreground/70 hover:text-foreground'
            )}
          >
            {productTypeLabels[type]}
            {count > 0 && (
              <Badge
                variant="secondary"
                className={cn(
                  'h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px] font-semibold',
                  isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {count}
              </Badge>
            )}
          </Link>
        )
      })}
    </div>
  )
}
