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
  /** Base path for tab links (e.g. "/admin/products" or "/portal/products") */
  basePath: string
}

/** Shared route-based product type tabs — pill style */
export function ProductTypeTabs({ productCounts, basePath }: Props) {
  const pathname = usePathname()

  return (
    <div className="inline-flex items-center rounded-full bg-muted/30">
      {[...tabOrder].map((type) => {
        const isActive = pathname === `${basePath}/${type}`
        const count = productCounts[type] ?? 0
        return (
          <Link
            key={type}
            href={`${basePath}/${type}`}
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
