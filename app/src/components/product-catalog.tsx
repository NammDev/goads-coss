'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowUpRightIcon, Loader2, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { MetaLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
import { useCart } from '@/lib/cart-context'

/* ---------- types ---------- */

export type Product = {
  name: string
  description: string
  price: number | 'contact'
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

/* ---------- spotlight + 3D effect hook ---------- */

function useCardEffects(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>('.product-card')

    const handleMouseMove = (ev: MouseEvent) => {
      cards.forEach((card) => {
        const blob = card.querySelector<HTMLElement>('.blob')
        const fblob = card.querySelector<HTMLElement>('.fake-blob')
        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()
        blob.style.opacity = '1'
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          { duration: 300, fill: 'forwards' }
        )
      })
    }

    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>('.card-inner')
      if (!inner) return

      let rect: DOMRect
      let animFrame: number | undefined

      const animate = (mouseX: number, mouseY: number) => {
        if (!rect) rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const rx = -(mouseY - cy) * 0.02
        const ry = (mouseX - cx) * 0.02
        inner.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`
      }

      const onEnter = () => {
        inner.style.transition = 'transform 0.2s ease-out'
        rect = card.getBoundingClientRect()
      }
      const onMove = (e: MouseEvent) => {
        if (animFrame) cancelAnimationFrame(animFrame)
        animFrame = requestAnimationFrame(() => animate(e.clientX, e.clientY))
      }
      const onLeave = () => {
        if (animFrame) cancelAnimationFrame(animFrame)
        inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
        inner.style.transition = 'transform 0.4s ease-out'
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)

      ;(card as any).__cleanup3D = () => {
        if (animFrame) cancelAnimationFrame(animFrame)
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      }
    })

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cards.forEach((card) => { ;(card as any).__cleanup3D?.() })
    }
  }, [containerRef])
}

/* ---------- card logos by badge ---------- */

function CardLogos({ badge }: { badge?: string }) {
  if (badge === 'WhatsApp') {
    return <WhatsAppLogo className="size-6" />
  }
  return <MetaLogo className="size-6" />
}

/* ---------- product card ---------- */

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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { state, trigger } = useAddToCart(product)

  return (
    <MotionPreset
      fade
      slide={{ direction: 'up', offset: 20 }}
      blur="4px"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      delay={0.05 * index}
    >
      <div
        className="product-card group/card relative cursor-pointer overflow-hidden rounded-xl bg-border p-px transition-all duration-200 ease-out"
        onClick={trigger}
      >
        <div className="card-inner h-full">
          <Card className="h-full border-none transition-all duration-200 ease-out group-hover/card:bg-card/90 group-hover/card:backdrop-blur-[20px]">
            <CardContent className="flex h-full flex-col justify-between px-5 py-4">
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

              {/* center: empty */}
              <div className="min-h-12" />

              {/* bottom: logos left, button right */}
              <div className="flex items-end justify-between">
                <CardLogos badge={product.badge} />
                <AddToCartButton product={product} state={state} onTrigger={trigger} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="blob absolute top-0 left-0 size-20 rounded-full bg-foreground/20 opacity-0 blur-2xl transition-all duration-200 ease-out" />
        <div className="fake-blob absolute top-0 left-0 size-20 rounded-full" />
      </div>
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
      <div className="product-card group/card relative cursor-pointer overflow-hidden rounded-xl bg-border p-px transition-all duration-200 ease-out">
        <div className="card-inner">
          <Card className="border-none transition-all duration-200 ease-out group-hover/card:bg-card/90 group-hover/card:backdrop-blur-[20px]">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
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
            </CardContent>
          </Card>
        </div>
        <div className="blob absolute top-0 left-0 size-20 rounded-full bg-foreground/20 opacity-0 blur-2xl transition-all duration-200 ease-out" />
        <div className="fake-blob absolute top-0 left-0 size-20 rounded-full" />
      </div>
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
  const containerRef = useRef<HTMLDivElement>(null)
  useCardEffects(containerRef)

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1416px] px-4 lg:px-6">
        <div ref={containerRef} className="mx-auto max-w-6xl space-y-14">
          {/* heading centered within grid area */}
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

          {/* each category with its own header + grid */}
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

          {/* upsells */}
          {upsells && upsells.length > 0 && (
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
