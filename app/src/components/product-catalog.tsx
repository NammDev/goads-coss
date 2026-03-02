'use client'

import { ArrowUpRightIcon, PackageIcon, SparklesIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/components/ui/craft-button'
import { Separator } from '@/components/ui/separator'
import { MotionPreset } from '@/components/ui/motion-preset'

/* ---------- types ---------- */

export type Product = {
  name: string
  description: string
  price: number
  unit?: string
  purchased?: number
  isPopular?: boolean
  badge?: string
}

export type ProductCategory = {
  icon?: React.ReactNode
  title: string
  description?: string
  badge?: string
  products: Product[]
}

export type UpsellItem = {
  icon?: React.ReactNode
  title: string
  description: string
  price: string
  features?: string[]
  buttonText?: string
}

/* ---------- product card ---------- */

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isPopular = product.isPopular

  return (
    <MotionPreset
      fade
      slide={{ direction: 'up', offset: 20 }}
      blur="4px"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      delay={0.1 * index}
    >
      <Card
        className={`group relative h-full transition-all duration-300 ${
          isPopular
            ? 'ring-2 ring-foreground/10 shadow-md hover:ring-foreground/20 hover:shadow-lg'
            : 'hover:border-foreground/20'
        }`}
      >
        {isPopular && (
          <div className="absolute -top-2.5 right-4">
            <Badge variant="default" className="gap-1 text-xs">
              <SparklesIcon className="size-3" />
              Most Popular
            </Badge>
          </div>
        )}
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-base font-semibold leading-tight">
                {product.badge && (
                  <span className="text-primary mr-1.5">{product.badge}</span>
                )}
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-snug">
                {product.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="text-right">
                <span className="text-2xl font-bold">${product.price}</span>
                <span className="text-muted-foreground text-sm">
                  /{product.unit ?? 'unit'}
                </span>
              </div>
              {isPopular ? (
                <CraftButton size="sm" className="shrink-0">
                  <CraftButtonLabel>Buy Now</CraftButtonLabel>
                  <CraftButtonIcon>
                    <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
                  </CraftButtonIcon>
                </CraftButton>
              ) : (
                <Button size="sm" className="shrink-0">
                  Buy Now
                </Button>
              )}
            </div>
          </div>

          {product.purchased != null && (
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <PackageIcon className="size-3.5" />
              {product.purchased.toLocaleString()} purchased
            </p>
          )}
        </CardContent>
      </Card>
    </MotionPreset>
  )
}

/* ---------- category section ---------- */

function CategorySection({
  category,
  index,
}: {
  category: ProductCategory
  index: number
}) {
  return (
    <MotionPreset
      fade
      slide={{ direction: 'up', offset: 30 }}
      blur="6px"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      delay={0.15 * index}
    >
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            {category.icon && (
              <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                {category.icon}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{category.title}</CardTitle>
                {category.badge && (
                  <Badge variant="outline" className="text-xs">
                    {category.badge}
                  </Badge>
                )}
              </div>
              {category.description && (
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
          {category.products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </CardContent>
      </Card>
    </MotionPreset>
  )
}

/* ---------- upsell card ---------- */

function UpsellCard({ item, index }: { item: UpsellItem; index: number }) {
  return (
    <MotionPreset
      fade
      slide={{ direction: 'up', offset: 25 }}
      blur="4px"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      delay={0.2 + 0.1 * index}
    >
      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            {item.icon && (
              <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                {item.icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {item.description}
              </p>
              {item.features && item.features.length > 0 && (
                <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {item.features.map((f) => (
                    <span key={f} className="flex items-center gap-1">
                      <span className="text-primary">&#10003;</span> {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 max-sm:mt-2">
            <span className="text-lg font-bold">{item.price}</span>
            <Button variant="outline" size="sm">
              {item.buttonText ?? 'Add to order'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </MotionPreset>
  )
}

/* ---------- main export ---------- */

export function ProductCatalog({
  heading,
  subheading,
  categories,
  upsells,
}: {
  heading?: string
  subheading?: string
  categories: ProductCategory[]
  upsells?: UpsellItem[]
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1416px] px-4 lg:px-6">
        {(heading || subheading) && (
          <MotionPreset
            fade
            slide={{ direction: 'up', offset: 20 }}
            blur="6px"
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-2xl space-y-2"
          >
            {heading && (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-muted-foreground text-lg">{subheading}</p>
            )}
          </MotionPreset>
        )}

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <CategorySection key={cat.title} category={cat} index={i} />
          ))}

          {upsells?.map((item, i) => (
            <UpsellCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
