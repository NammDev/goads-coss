'use client'

import { useRef, useState, useCallback } from 'react'
import { ArrowUpRightIcon, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { MetaLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
import { useCart } from '@/lib/cart-context'
import { Card3D, useCard3DEffects } from '@/components/card-3d'
import { EnterpriseSolutionCard, type EnterpriseSolutionProps } from '@/components/enterprise-solution-card'

/* ---------- types ---------- */

export type Product = {
  name: string
  description?: string
  price: number | 'contact'
  unit?: string
  purchased?: number
  isPopular?: boolean
  badge?: string
}

export type ProductCategory = {
  buttonText?: string
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

/* ---------- card logos by badge ---------- */

function CardLogos({ badge }: { badge?: string }) {
  if (badge === 'WhatsApp') {
    return <WhatsAppLogo className="size-6" />
  }
  return <MetaLogo className="size-6" />
}

/* ---------- add-to-cart hook ---------- */

function useAddToCart(product: Product) {
  const { addItem } = useCart()
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')

  const trigger = useCallback(() => {
    if (product.price === 'contact' || state !== 'idle') return
    setState('loading')
    setTimeout(() => {
      addItem(product)
      setState('done')
      setTimeout(() => setState('idle'), 1200)
    }, 600)
  }, [product, addItem, state])

  return { state, trigger }
}

/* ---------- add-to-cart button ---------- */

function AddToCartButton({ product, state, onTrigger }: { product: Product; state: 'idle' | 'loading' | 'done'; onTrigger: () => void }) {
  if (product.price === 'contact') {
    return (
      <Button size="sm" variant="outline" className="cursor-pointer gap-1.5">
        Contact
        <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:rotate-45" />
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="cursor-pointer gap-1.5 min-w-[90px]"
      onClick={(e) => { e.stopPropagation(); onTrigger() }}
      disabled={state === 'loading'}
    >
      {state === 'loading' && <Loader2 className="size-3.5 animate-spin" />}
      {state === 'done' && <Check className="size-3.5" />}
      {state === 'idle' && <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:rotate-45" />}
      {state === 'loading' ? 'Adding...' : state === 'done' ? 'Added' : 'Buy Now'}
    </Button>
  )
}

/* ---------- product card ---------- */

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { state, trigger } = useAddToCart(product)

  return (
    <Card3D index={index} onClick={trigger}>
      {/* top: name left, price right */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-tight">{product.name}</h3>
        <div className="shrink-0 text-right">
          {product.price === 'contact' ? (
            <span className="text-sm font-bold">Contact</span>
          ) : (
            <span className="text-lg font-bold">${product.price}</span>
          )}
        </div>
      </div>

      {/* spacer */}
      <div className="min-h-12" />

      {/* bottom: logos left, button right */}
      <div className="flex items-end justify-between">
        <CardLogos badge={product.badge} />
        <AddToCartButton product={product} state={state} onTrigger={trigger} />
      </div>
    </Card3D>
  )
}

/* ---------- upsell card ---------- */

export function UpsellCard({ item, index }: { item: UpsellItem; index: number }) {
  return (
    <Card3D index={index} contentClassName="flex-row sm:items-center sm:justify-between gap-3 p-5">
      <div className="flex items-start gap-3">
        {item.icon && (
          <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
            {item.icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-muted-foreground mt-0.5 text-sm">{item.description}</p>
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
        <Button size="sm" variant="outline" className="cursor-pointer gap-1.5">
          {item.buttonText ?? 'Add to order'}
          <ArrowUpRightIcon className="size-3.5" />
        </Button>
      </div>
    </Card3D>
  )
}

/* ---------- main export ---------- */

export function ProductCatalog({
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
  const containerRef = useRef<HTMLDivElement>(null)
  useCard3DEffects(containerRef)

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1416px] px-4 lg:px-6">
        <div ref={containerRef} className="mx-auto max-w-6xl space-y-14">
          {/* heading */}
          {(heading || subheading) && (
            <MotionPreset
              fade
              slide={{ direction: 'up', offset: 20 }}
              blur="6px"
              transition={{ duration: 0.5 }}
              className="space-y-2"
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

          {/* categories */}
          {categories.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-6">
              <MotionPreset
                fade
                slide={{ direction: 'up', offset: 15 }}
                blur="4px"
                transition={{ duration: 0.4 }}
                delay={0.1 * catIdx}
              >
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                {cat.description && (
                  <p className="text-muted-foreground mt-1 text-sm">{cat.description}</p>
                )}
              </MotionPreset>

              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                {cat.products.map((product, i) => (
                  <ProductCard key={product.name} product={product} index={i} />
                ))}
              </div>
            </div>
          ))}

          {/* enterprise solution card */}
          {enterpriseCard && <EnterpriseSolutionCard {...enterpriseCard} />}

          {/* legacy upsells (deprecated — use enterpriseCard instead) */}
          {!enterpriseCard && upsells && upsells.length > 0 && (
            <div className="space-y-4">
              {upsells.map((item, i) => (
                <UpsellCard key={item.title} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
