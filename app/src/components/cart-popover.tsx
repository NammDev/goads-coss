'use client'

import { useState, useEffect, useCallback } from 'react'
import { XIcon, ChevronDown } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { DialogPortal } from '@/components/ui/dialog'
import { useCart } from '@/lib/cart-context'
import { fpText } from '@/components/foreplay/foreplay-typography'
import { CartItemRow, CartEmpty } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import { TELEGRAM_URL, buildTelegramMessage } from '@/components/cart-popover-utils'

// Foreplay redesign: NON-MODAL right-side slide-in drawer (no backdrop) so the
// catalog stays interactive while open. LIGHT theme — pale-blue→white gradient
// header + clean white body (Foreplay help-widget aesthetic), softly rounded.
// Top grab-pill minimises the cart. Persist + Telegram unchanged.

/* ---------- cart body — scroll list + pinned summary (light) ---------- */

interface CartBodyProps {
  items: ReturnType<typeof useCart>['items']
  subtotal: number
  payment: 'crypto' | 'wise'
  onPaymentChange: (p: 'crypto' | 'wise') => void
  note: string
  onNoteChange: (note: string) => void
  onOrder: () => void
}

function CartBody({ items, subtotal, payment, onPaymentChange, note, onNoteChange, onOrder }: CartBodyProps) {
  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center px-6 py-4'>
        <CartEmpty />
      </div>
    )
  }

  // Compact card: the list scrolls within a capped height (so the panel hugs
  // its content like the Foreplay widget instead of stretching full-height),
  // summary stays directly below.
  return (
    <>
      <div className='max-h-[30vh] space-y-2 overflow-y-auto px-4 pt-3 pb-2'>
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>
      <CartSummary
        subtotal={subtotal}
        itemCount={items.reduce((n, i) => n + i.quantity, 0)}
        payment={payment}
        onPaymentChange={onPaymentChange}
        note={note}
        onNoteChange={onNoteChange}
        onOrder={onOrder}
      />
    </>
  )
}

/* ---------- main export ---------- */

export function CartPopover() {
  const { items, subtotal, clearCart } = useCart()
  const totalUnits = items.reduce((n, i) => n + i.quantity, 0)
  const [open, setOpen] = useState(false)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  const [note, setNote] = useState('')

  const handleOrder = useCallback(() => {
    const msg = buildTelegramMessage(
      items,
      subtotal,
      payment === 'crypto' ? 'Crypto (USDT)' : 'Wise Transfer',
      note,
    )
    window.open(`${TELEGRAM_URL}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setNote('')
    setOpen(false)
  }, [items, subtotal, payment, note, clearCart])

  /* Open on item-added OR an explicit "View cart" CTA (`cart:open`). The cart is
     a NON-MODAL right-side drawer (modal={false}, no backdrop) so it can auto-
     open without blocking the catalog — the user keeps picking products while
     it slides in. Stays open until dismissed (X / Esc / order placed). */
  useEffect(() => {
    const handler = () => {
      setOpen(true)
    }
    window.addEventListener('cart:item-added', handler)
    window.addEventListener('cart:open', handler)
    return () => {
      window.removeEventListener('cart:item-added', handler)
      window.removeEventListener('cart:open', handler)
    }
  }, [])

  // modal={false}: no scroll-lock, no blocking overlay → the catalog stays
  // fully interactive while the cart drawer is open.
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} modal={false}>
      <DialogPortal>
        {/* No DialogOverlay — a right-side drawer must not dim/block the page. */}
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          /* Never auto-dismiss on outside interaction — keep shopping while
             open. Close via header X / bottom "Hide" / Esc / order placed. */
          onInteractOutside={(e) => e.preventDefault()}
          /* Compact FLOATING card (Foreplay-widget style), ~30% smaller: hugs
             its content (h-fit, capped), all 4 corners rounded, big soft
             diffused shadow, small gap from the screen edge. */
          className='foreplay fixed inset-y-0 right-5 z-50 my-auto flex h-fit max-h-[calc(100dvh-2.5rem)] w-[400px] max-w-[calc(100%-2.5rem)] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_24px_70px_-18px_rgba(16,24,40,0.5)] ring-1 ring-black/5 outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right'
        >
          {/* Blue periwinkle gradient header (matches the Foreplay widget):
              diagonal light→deeper blue, real GOADS logo lock-up + white title.
              Subline shows live item count for reassurance. */}
          <div className='relative shrink-0 px-5 pt-5 pb-6 [background:linear-gradient(145deg,#a9c6f1_0%,#7f9fdb_55%,#6a86d0_100%)]'>
            {/* brand row — original GoAds mark (transparent) + black wordmark */}
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-2'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/foreplay/logo/goads-logo-mark.png'
                  alt='GoAds'
                  className='size-8 object-contain'
                />
                <span className='text-[1.0625rem] font-[700] tracking-tight text-[var(--fp-solid-900)]'>
                  GOADS
                </span>
              </div>
              <DialogPrimitive.Close
                aria-label='Close cart'
                title='Close (Esc)'
                className='-mr-0.5 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--fp-solid-700)]/65 transition-colors hover:bg-black/10 hover:text-[var(--fp-solid-900)]'
              >
                <XIcon className='size-4' />
              </DialogPrimitive.Close>
            </div>
            {/* heading */}
            <div className='mt-5 flex flex-col gap-1'>
              <DialogPrimitive.Title className={`${fpText.displayH5} text-white`}>
                Your cart
              </DialogPrimitive.Title>
              <p className='text-[0.8125rem] leading-4 text-white/85'>
                {totalUnits > 0
                  ? `${totalUnits} item${totalUnits > 1 ? 's' : ''} · review & check out`
                  : 'Review your items and check out'}
              </p>
            </div>
          </div>

          <CartBody
            items={items}
            subtotal={subtotal}
            payment={payment}
            onPaymentChange={setPayment}
            note={note}
            onNoteChange={setNote}
            onOrder={handleOrder}
          />

          {/* Bottom collapse control — explicit down-arrow to hide the cart. */}
          <DialogPrimitive.Close
            aria-label='Hide cart'
            title='Hide cart'
            className={`${fpText.bodyS} group flex shrink-0 cursor-pointer items-center justify-center gap-1.5 border-t border-[var(--fp-solid-50)] py-3.5 text-[var(--fp-solid-400)] transition-colors hover:text-[var(--fp-accent)]`}
          >
            <ChevronDown className='size-4 transition-transform group-hover:translate-y-0.5' />
            Hide cart
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  )
}
