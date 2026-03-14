'use client'

import { useState, useMemo, useRef } from 'react'
import { ProductCard } from '@/components/product-card'
import { useCard3DEffects } from '@/components/card-3d'
import { productTypeLabels } from '@/data/mock-products'
import type { Product } from '@/components/product-catalog'

/* ---------- types ---------- */

interface ShopCatalogProps {
  /** Products mapped to ProductCard shape, with _type for filtering */
  products: (Product & { _type: string })[]
  /** Unique product types present in data (ordered) */
  productTypes: string[]
}

/* ---------- tab button ---------- */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border hover:border-primary/30 hover:bg-primary/10'
      }`}
    >
      {children}
    </button>
  )
}

/* ---------- shop catalog ---------- */

export function ShopCatalog({ products, productTypes }: ShopCatalogProps) {
  const [active, setActive] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  useCard3DEffects(containerRef)

  const filtered = useMemo(() => {
    if (active === 'all') return products
    return products.filter((p) => p._type === active)
  }, [products, active])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        <TabButton active={active === 'all'} onClick={() => setActive('all')}>
          All ({products.length})
        </TabButton>
        {productTypes.map((type) => {
          const count = products.filter((p) => p._type === type).length
          const label =
            productTypeLabels[type as keyof typeof productTypeLabels] ?? type
          return (
            <TabButton
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {label} ({count})
            </TabButton>
          )
        })}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-lg font-semibold">No products available</p>
          <p className="text-muted-foreground text-sm">
            Check back later for new products.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
