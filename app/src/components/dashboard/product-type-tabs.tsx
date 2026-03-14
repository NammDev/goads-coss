'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { productTypeLabels } from '@/data/mock-products'

/** Ordered product types for tab display */
const tabOrder = [
  'agency_account', 'bm', 'profile', 'page',
  'google_agency', 'tiktok_agency', 'tiktok_account',
  'blue_verification', 'unban',
] as const

interface Props {
  productCounts: Record<string, number>
  basePath: string
}

/** Shared product type tabs — uses default shadcn Tabs styling (matching template) */
export function ProductTypeTabs({ productCounts, basePath }: Props) {
  const pathname = usePathname()

  // Determine active tab from pathname
  const activeType = [...tabOrder].find((type) => pathname === `${basePath}/${type}`) ?? tabOrder[0]

  return (
    <Tabs value={activeType} className="w-full">
      <TabsList className="h-9 w-fit">
        {[...tabOrder].map((type) => {
          const count = productCounts[type] ?? 0
          return (
            <TabsTrigger key={type} value={type} className="cursor-pointer" asChild>
              <Link href={`${basePath}/${type}`}>
                {productTypeLabels[type]}
                {count > 0 && <Badge variant="secondary">{count}</Badge>}
              </Link>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
