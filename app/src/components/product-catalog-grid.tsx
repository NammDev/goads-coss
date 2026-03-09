'use client'

import { useState } from 'react'
import { CheckIcon, SparklesIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/section-header'
import { cn } from '@/lib/utils'
import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { UpsellCard } from '@/components/product-catalog'
import { EnterpriseSolutionCard, type EnterpriseSolutionProps } from '@/components/enterprise-solution-card'

/* ---------- product row (selectable) ---------- */

function ProductRow({
  product,
  selected,
  onSelect,
}: {
  product: ProductCategory['products'][number]
  selected: boolean
  onSelect: () => void
}) {
  const isPopular = product.isPopular

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer',
        selected
          ? 'border-foreground/20 bg-foreground/[0.04] ring-1 ring-foreground/10'
          : 'border-transparent hover:bg-muted/50',
        isPopular && !selected && 'bg-foreground/[0.02]'
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected
              ? 'border-foreground bg-foreground text-background'
              : 'border-muted-foreground/30'
          )}
        >
          {selected && <CheckIcon className="size-2.5 stroke-[3]" />}
        </div>
        {isPopular && <SparklesIcon className="size-3 shrink-0 text-foreground/60" />}
        <span className={cn('truncate text-sm', isPopular && 'font-semibold')}>
          {product.name}
        </span>
      </div>
      <span className="shrink-0 text-sm font-semibold">
        {product.price === 'contact' ? 'Contact' : `$${product.price}`}
      </span>
    </button>
  )
}

/* ---------- category card ---------- */

function CategoryCard({ category }: { category: ProductCategory }) {
  const defaultIndex = category.products.findIndex((p) => p.isPopular)
  const [selectedIdx, setSelectedIdx] = useState(defaultIndex >= 0 ? defaultIndex : 0)

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex h-full flex-col gap-0 px-5 py-4">
        {/* header */}
        <div className="flex items-start gap-3 pb-3">
          {category.icon && (
            <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
              {category.icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold leading-tight">{category.title}</h3>
              {category.badge && (
                <Badge variant="outline" className="text-[10px]">
                  {category.badge}
                </Badge>
              )}
            </div>
            {category.description && (
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-snug">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="border-border/60 border-t" />

        {/* product rows */}
        <div className="flex flex-1 flex-col gap-1 pt-3">
          <div className="flex-1 space-y-1">
            {category.products.map((product, i) => (
              <ProductRow
                key={product.name}
                product={product}
                selected={selectedIdx === i}
                onSelect={() => setSelectedIdx(i)}
              />
            ))}
          </div>
          <Button size="sm" className="btn-mirror-sweep btn-secondary mt-3 w-full cursor-pointer">
            {category.buttonText ?? 'Buy'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------- main export ---------- */

export function ProductCatalogGrid({
  heading,
  subheading,
  categories,
  upsells,
  enterpriseCard,
}: {
  heading?: string
  subheading?: string
  categories: ProductCategory[]
  upsells?: UpsellItem[]
  enterpriseCard?: EnterpriseSolutionProps
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1416px] px-4 lg:px-6">
        {(heading || subheading) && (
          <div className="mb-10">
            <SectionHeader
              label="Catalog"
              heading={heading}
              description={subheading}
              inView
            />
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} category={cat} />
          ))}
        </div>

        {/* enterprise solution card */}
        {enterpriseCard && (
          <div className="mt-8">
            <EnterpriseSolutionCard {...enterpriseCard} />
          </div>
        )}

        {/* legacy upsells */}
        {!enterpriseCard && upsells && upsells.length > 0 && (
          <div className="mt-8 space-y-4">
            {upsells.map((item, idx) => (
              <UpsellCard key={item.title} item={item} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
