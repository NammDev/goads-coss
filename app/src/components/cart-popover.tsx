'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { XIcon, ChevronRight, ShoppingBag } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { DialogPortal } from '@/components/ui/dialog'
import { useCart } from '@/lib/cart-context'
import { CartItemRow, CartEmpty } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import { TELEGRAM_URL, buildTelegramMessage, formatPrice } from '@/components/cart-popover-utils'
import { SW, SW_GRADIENT } from '@/components/support-widget/support-widget.tokens'

// FULL REDESIGN — Intercom messenger design language (single source of truth:
// plan 260518-0013 support-widget-design-language.md; tokens reused from
// support-widget.tokens.ts for DRY). NON-MODAL so the catalog stays
// interactive. Right-anchored drawer (slides in right→left), toggled by a
// side handle pinned to the right-edge centre. Geometry: 24px radius · soft
// diffused shadow · 117.67deg white→#528BFF gradient header · cards overlap
// -34px up into the gradient · pinned white close-X · fixed header/summary,
// only the product list scrolls. Persist + Telegram + open events unchanged.

/* ---------- products region — ONLY this scrolls ---------- */

// Cap the scroll area to ~3.5 rows (a row ≈ 84px + 10px gap). Beyond that the
// product list scrolls internally; header / summary / footer stay fixed. Kept
// compact so the cart doesn't dominate the screen — on short viewports the list
// shrinks below this anyway (flex-auto), so this is just the tall-screen ceiling.
const LIST_MAX_H = 320

function CartProducts({ items }: { items: ReturnType<typeof useCart>['items'] }) {
  // §6 cards container: gap 10px · relative z-1 · -mt-34px (cards rise UP into
  // the bottom of the gradient header) · 20px side inset (px-5).
  //
  // flex-auto (flex: 1 1 auto) + min-h-0 — handles BOTH cases correctly, on
  // Safari and Chrome:
  //   • Few items → panel is h-fit (indefinite). basis:auto sizes the list to
  //     its content, so the panel hugs it. (flex-1's basis:0% would collapse
  //     the list to 0px on iOS Safari — the earlier "products vanish" bug.)
  //   • Many items → panel hits max-h (now a DEFINITE height), so the list
  //     SHRINKS (flex-shrink + min-h-0) and scrolls internally while the fixed
  //     header + summary (Total / Order via Telegram) stay visible — instead of
  //     the panel overflowing past the viewport and clipping the Order button.
  // LIST_MAX_H caps the list on tall screens to preserve the ~5-row look.
  return (
    <div className='relative z-[1] -mt-[34px] flex min-h-0 flex-auto flex-col px-5'>
      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div
          className='flex min-h-0 flex-auto flex-col gap-[10px] overflow-y-auto pb-1 [scrollbar-gutter:stable]'
          style={{ maxHeight: LIST_MAX_H }}
        >
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- main export ---------- */

export function CartPopover() {
  const { items, subtotal, clearCart } = useCart()
  const count = items.reduce((n, i) => n + i.quantity, 0)
  const [open, setOpen] = useState(false)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  const [note, setNote] = useState('')
  // Auto-close the cart on route change — user navigating to another page
  // dismisses the drawer (per UX decision: don't carry the overlay across routes).
  const pathname = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  // The closed pill must not pop in while the panel is still playing its
  // ~300ms slide-out exit (Radix data-[state=closed] animation). Hold the
  // pill back until the panel is fully gone, then fade it in. Init true so
  // the very first page load (never opened) shows the pill immediately.
  const [pillReady, setPillReady] = useState(true)
  // Re-keys the cart pill's bag+badge on each mobile add so the bump keyframe
  // replays (5→6 pop). Incremented by the cart:item-added handler below.
  const [bumpKey, setBumpKey] = useState(0)
  useEffect(() => {
    if (open) {
      setPillReady(false)
      return
    }
    const t = setTimeout(() => setPillReady(true), 320)
    return () => clearTimeout(t)
  }, [open])

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

  /* Buy Now (`cart:item-added`):
       - Desktop (≥992px): slide the non-modal drawer open — the drawer IS the
         confirmation (doesn't block the catalog).
       - Mobile (≤991px): keep the drawer CLOSED and instead bump the floating
         cart badge (5→6 pop) — a lighter add-to-cart cue that doesn't cover the
         small screen.
     The explicit "View cart" CTA (`cart:open`) always opens, every breakpoint. */
  useEffect(() => {
    const onAdded = () => {
      const isMobile = window.matchMedia('(max-width: 991.98px)').matches
      if (isMobile) {
        setBumpKey((k) => k + 1)
      } else {
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('cart:item-added', onAdded)
    window.addEventListener('cart:open', onOpen)
    return () => {
      window.removeEventListener('cart:item-added', onAdded)
      window.removeEventListener('cart:open', onOpen)
    }
  }, [])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} modal={false}>
      <DialogPortal>
        {/* Desktop: no overlay (non-modal side drawer keeps the catalog usable).
            Mobile (≤991px): the panel nearly fills the screen and its top tucks
            under the sticky header, so the X is hard to reach — add a dim
            backdrop that closes the cart on tap (an obvious, reachable dismiss).
            Rendered only while open + only on mobile (fp-lg:hidden). */}
        {open && (
          <div
            className="fixed inset-0 z-[105] bg-black/45 fp-lg:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
        )}
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          /* §1 panel shell: 24px radius · diffused shadow · hugs content.
             Right-anchored, vertically centred · slides in from the right
             (right → left). Toggled by the side handle (right-edge centre). */
          className='fixed right-4 inset-y-0 z-[110] my-auto flex h-fit max-h-[calc(100dvh-2.5rem)] w-[min(400px,calc(100dvw-2.5rem))] flex-col overflow-hidden bg-white outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:fade-in'
          style={{ borderRadius: SW.panelRadius, boxShadow: SW.panelShadow }}
        >
          {/* §2b close button — pinned to the panel (does not scroll), white,
              p-2.5, 10px radius, subtle hover. */}
          <DialogPrimitive.Close
            aria-label='Close cart'
            title='Close (Esc)'
            className='absolute top-[34px] right-8 z-[2] flex cursor-pointer items-center justify-center rounded-[10px] p-2.5 text-white transition-[background-color] duration-150 hover:bg-white/15'
          >
            <XIcon className='size-4' />
          </DialogPrimitive.Close>

          {/* §2 gradient header — FIXED (does not scroll). Content inset 40px
              (px-10), top 32 / bottom ~56 (cards overlap -34 into this).
              §5 title 28/34, 600, #FAFAFA with soft white glow. */}
          <div
            className='shrink-0 px-10 pt-8 pb-[56px]'
            style={{ background: SW_GRADIENT, opacity: 0.992647 }}
          >
              {/* brand lockup — GoAds mark (dark G + white panda, transparent
                  outside) + GOADS wordmark, sized to the Foreplay nav-brand
                  scale (~h-9). Sits on the light corner of the gradient. */}
              <div className='flex items-center gap-2.5 pr-10'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/assets/logo/mark.png'
                  alt='GoAds'
                  className='h-9 w-auto object-contain'
                />
                <span className='text-[22px] font-bold leading-none tracking-tight text-[#14161A]'>
                  GOADS
                </span>
              </div>
              <DialogPrimitive.Title
                className='mt-7 text-[28px] font-semibold leading-[34px] break-words'
                style={{ color: 'rgb(250,250,250)', textShadow: '0 0 30px rgba(255,255,255,0.3)' }}
              >
                Your cart
              </DialogPrimitive.Title>
          </div>

          {/* ONLY the product list scrolls (capped ~5 rows). */}
          <CartProducts items={items} />

          {/* FIXED summary — payment / note / total / CTA (never scrolls).
              Always shown, even with an empty cart: customers can still
              reach us on Telegram for a general inquiry. */}
          <CartSummary
            subtotal={subtotal}
            payment={payment}
            onPaymentChange={setPayment}
            note={note}
            onNoteChange={setNote}
            onOrder={handleOrder}
          />

        </DialogPrimitive.Content>
      </DialogPortal>

      {/* Option 1 — info pill that juts out of the right edge: bag + count +
          live total (nudges the sale). Travels to the panel's left edge and
          collapses to a round X when open. Vertically centred.
          While the panel is animating closed (!open && !pillReady) the
          handle is unmounted so the pill never flashes mid-transition. */}
      {(open || pillReady) && (
      <button
        type='button'
        aria-label={open ? 'Close cart' : 'Open cart'}
        onClick={() => setOpen((v) => !v)}
        className={
          'group fixed top-1/2 z-[110] flex -translate-y-1/2 cursor-pointer items-center bg-white transition-[right,transform] duration-300 ease-out ' +
          // Mobile (≤991px): hide the closed pill when the cart is empty so it
          // never overlaps hero content — matches Foreplay's clean mobile. The
          // pill reappears once an item is added (count > 0). Desktop unaffected.
          (!open && count === 0 ? 'max-fp-lg:hidden ' : '') +
          (open
            ? 'size-9 justify-center rounded-full ring-1 ring-[#EAECEF] hover:scale-105'
            : 'h-12 gap-2.5 rounded-l-2xl pr-3 pl-4 ring-1 ring-[#E6E8EB] animate-in fade-in slide-in-from-right-2 duration-200')
        }
        style={{
          // Open: small round button straddling the panel's left seam (pulled
          // 18px over the edge) — a floating collapse affordance, not a tab.
          right: open
            ? 'calc(1rem + min(400px, calc(100dvw - 2.5rem)) - 18px)'
            : 0,
          boxShadow: open
            ? '0 6px 18px -6px rgba(16,24,40,0.22)'
            : '-8px 0 28px -10px rgba(16,24,40,0.22)',
        }}
      >
        {open ? (
          <ChevronRight className='size-4 text-[#9AA0A6] transition-colors group-hover:text-[#1A1A1A]' />
        ) : (
          // Motion lives on the INNER content, not the button box — so the
          // white pill stays flush to the screen edge and never exposes the
          // dark page bg behind it on hover.
          <span className='flex items-center gap-2.5 transition-transform duration-300 ease-out group-hover:-translate-x-0.5'>
            {/* key={bumpKey} remounts on each mobile add so the bump keyframe
                replays; gated to bumpKey>0 so it never plays on first paint. */}
            <span
              key={bumpKey}
              className={'relative' + (bumpKey > 0 ? ' cart-badge-bump' : '')}
            >
              <ShoppingBag className='size-5 text-[#1A1A1A] transition-transform duration-200 group-hover:scale-110' />
              {count > 0 && (
                <span className='absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#528BFF] px-1 text-[10px] font-semibold tabular-nums text-white ring-2 ring-white'>
                  {count}
                </span>
              )}
            </span>
            {count > 0 ? (
              <span className='flex flex-col items-start leading-none'>
                <span className='text-[10px] font-medium tracking-wide text-[#6C6F74]'>
                  {count} item{count > 1 ? 's' : ''}
                </span>
                <span className='mt-0.5 text-[15px] font-bold tabular-nums text-[#1A1A1A]'>
                  ${formatPrice(subtotal)}
                </span>
              </span>
            ) : (
              <span className='text-[14px] font-semibold text-[#1A1A1A]'>Cart</span>
            )}
          </span>
        )}
      </button>
      )}
    </DialogPrimitive.Root>
  )
}
