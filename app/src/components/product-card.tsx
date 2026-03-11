'use client'

import { useState, useCallback } from 'react'
import { ArrowUpRightIcon, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MetaLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
import { useCart } from '@/lib/cart-context'
import { Card3D } from '@/components/card-3d'
import type { Product } from '@/components/product-catalog'

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

function AddToCartButton({
  product,
  state,
  onTrigger,
}: {
  product: Product
  state: 'idle' | 'loading' | 'done'
  onTrigger: () => void
}) {
  if (product.price === 'contact') {
    return (
      <Button size="sm" variant="outline" className="min-h-11 cursor-pointer gap-1.5">
        Contact
        <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:rotate-45" />
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="min-h-11 min-w-[90px] cursor-pointer gap-1.5"
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

export function ProductCard({ product, index }: { product: Product; index: number }) {
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
