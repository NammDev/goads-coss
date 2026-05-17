'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart } from '@/lib/cart-context'
import { fpText } from '@/components/foreplay/foreplay-typography'
import { CartItemRow, CartEmpty } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import { ForeplaySectionWhiteBlock } from '@/components/foreplay/foreplay-section-white-block'
import { TELEGRAM_URL, buildTelegramMessage } from '@/components/cart-popover-utils'

// Foreplay redesign: centered modal + blurred backdrop (dims/blurs the page).
// Dark shell + signature white block (ForeplaySectionWhiteBlock). One layout
// for desktop & mobile. Logic verbatim; auto-open + persist + Telegram unchanged.

/* ---------- shared cart body — the signature white block ---------- */

interface CartBodyProps {
  items: ReturnType<typeof useCart>['items']
  subtotal: number
  payment: 'crypto' | 'wise'
  onPaymentChange: (p: 'crypto' | 'wise') => void
  onOrder: () => void
}

function CartBody({ items, subtotal, payment, onPaymentChange, onOrder }: CartBodyProps) {
  return (
    <ForeplaySectionWhiteBlock>
      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <ScrollArea className='max-h-[min(60vh,28rem)]'>
            <div className='px-4 pt-4 pb-1'>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>
          <CartSummary
            subtotal={subtotal}
            payment={payment}
            onPaymentChange={onPaymentChange}
            onOrder={onOrder}
          />
        </>
      )}
    </ForeplaySectionWhiteBlock>
  )
}

/* ---------- main export ---------- */

export function CartPopover() {
  const { items, totalItems, subtotal, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  /* the click that opens the cart is "outside" the modal → Radix would dismiss
     it on the same tick. Ignore outside-dismissals within this window. */
  const programmaticOpenAt = useRef(0)

  const handleOrder = useCallback(() => {
    const msg = buildTelegramMessage(
      items,
      subtotal,
      payment === 'crypto' ? 'Crypto (USDT)' : 'Wise Transfer',
    )
    window.open(`${TELEGRAM_URL}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setOpen(false)
  }, [items, subtotal, payment, clearCart])

  /* open on item-added OR an explicit "View cart" CTA (`cart:open`); stay open
     until the user dismisses (X / click backdrop / Esc / order placed). */
  useEffect(() => {
    const handler = () => {
      programmaticOpenAt.current = Date.now()
      setOpen(true)
    }
    window.addEventListener('cart:item-added', handler)
    window.addEventListener('cart:open', handler)
    return () => {
      window.removeEventListener('cart:item-added', handler)
      window.removeEventListener('cart:open', handler)
    }
  }, [])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPortal>
        {/* `foreplay` class re-establishes the --fp-* CSS-var scope inside the
            portal (portals mount on <body>, outside the .foreplay wrapper —
            without this every fp token is undefined → washed-out colors). */}
        <DialogOverlay className='foreplay cursor-pointer bg-black/60 backdrop-blur-md' />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (Date.now() - programmaticOpenAt.current < 500) e.preventDefault()
          }}
          className='foreplay fixed top-1/2 left-1/2 z-50 w-[460px] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[40px] bg-background shadow-2xl ring-1 ring-[var(--fp-alpha-700)] outline-none duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
        >
          {/* dark-scope header */}
          <div className='flex items-center justify-between gap-2 px-6 pt-5 pb-1'>
            <DialogPrimitive.Title className={`${fpText.headingL} text-foreground`}>
              Your cart
            </DialogPrimitive.Title>
            <div className='flex items-center gap-3'>
              {totalItems > 0 && (
                <span className={`${fpText.bodyS} text-[var(--fp-alpha-100)]`}>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
              <DialogPrimitive.Close
                aria-label='Close'
                className='flex size-7 cursor-pointer items-center justify-center rounded-full text-[var(--fp-alpha-100)] transition-colors hover:bg-[var(--fp-alpha-700)] hover:text-foreground'
              >
                <XIcon className='size-4' />
              </DialogPrimitive.Close>
            </div>
          </div>

          <CartBody
            items={items}
            subtotal={subtotal}
            payment={payment}
            onPaymentChange={setPayment}
            onOrder={handleOrder}
          />
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  )
}
