'use client'

import { useState, useMemo } from 'react'
import { MessageCircleIcon, SearchIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { productTypeLabels } from '@/data/mock-products'
import type { Product } from '@/components/product-catalog'

const TELEGRAM_HANDLE = 'goads_official'

interface ShopCatalogProps {
  products: (Product & { _type: string })[]
  productTypes: string[]
}

/** Product card styled exactly like StatsCard — same Card/CardHeader/CardFooter pattern */
function ShopProductCard({ product }: { product: Product & { _type: string } }) {
  const price = typeof product.price === 'number' && product.price > 0
    ? `$${product.price.toFixed(2)}`
    : 'Contact us'

  const typeLabel = productTypeLabels[product._type as keyof typeof productTypeLabels] ?? product._type
  const telegramUrl = `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(`Hi, I want to buy "${product.name}" (${typeLabel}). Please help me place an order.`)}`

  return (
    <Card className="@container/card flex flex-col">
      <CardHeader className="flex-1">
        <CardTitle className="text-base font-semibold">
          {product.name}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">{price}</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex items-center justify-end gap-1.5">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          title="Ask about this product"
        >
          <MessageCircleIcon className="size-5" />
        </a>
        <Button size="sm" className="h-7 px-3 text-xs" asChild>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ShopCatalog({ products, productTypes }: ShopCatalogProps) {
  const [active, setActive] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = products
    if (active !== 'all') result = result.filter((p) => p._type === active)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q))
      )
    }
    return result
  }, [products, active, search])

  return (
    <div className="space-y-6">
      {/* Category tabs — pill style */}
      <div className="inline-flex items-center rounded-full bg-muted/30">
        <button
          onClick={() => setActive('all')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
            active === 'all'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          All
        </button>
        {productTypes.map((type) => {
          const count = products.filter((p) => p._type === type).length
          const label = productTypeLabels[type as keyof typeof productTypeLabels] ?? type
          return (
            <button
              key={type}
              onClick={() => setActive(type)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                active === type
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <Input
            className="peer pl-9 border border-input shadow-sm"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
      </div>

      {/* Product grid — 4 columns, StatsCard style with gradient */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <p className="text-lg font-medium">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => (
            <ShopProductCard key={product.name} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
