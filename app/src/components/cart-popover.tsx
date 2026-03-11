'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ShoppingCart } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { useCart } from '@/lib/cart-context'
import { CONTACT } from '@/data/contact-info'
import { CartItemRow, CartEmpty } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'

/* ---------- hover intent hook (prevents flicker across trigger↔content gap) ---------- */

function useHoverIntent(delay = 150) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const handleEnter = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), delay)
  }, [delay])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  return { open, setOpen, handleEnter, handleLeave } as const
}

/* ---------- helpers ---------- */

const TELEGRAM_URL = CONTACT.telegram.support

function buildTelegramMessage(items: ReturnType<typeof useCart>['items'], subtotal: number, payment: string) {
  const lines = items.map(
    (i) => `- ${i.name} x${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`
  )
  return [
    '🛒 *New Order from GoAds*',
    '',
    ...lines,
    '',
    `💰 Total: $${subtotal.toFixed(2)}`,
    `💳 Payment: ${payment}`,
  ].join('\n')
}

/* measure padding so popover visually starts 8px below header border */
function useHeaderGap(triggerRef: React.RefObject<HTMLButtonElement | null>) {
  const [gap, setGap] = useState(22)
  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const header = el.closest('header')
    if (!header) return
    const headerBottom = header.getBoundingClientRect().bottom
    const triggerBottom = el.getBoundingClientRect().bottom
    setGap(headerBottom - triggerBottom + 8)
  }, [triggerRef])
  return gap
}

/* ---------- shared cart body (reused in both Sheet and Popover) ---------- */

interface CartBodyProps {
  items: ReturnType<typeof useCart>['items']
  subtotal: number
  payment: 'crypto' | 'wise'
  onPaymentChange: (p: 'crypto' | 'wise') => void
  onOrder: () => void
  scrollAreaClass?: string
}

function CartBody({ items, subtotal, payment, onPaymentChange, onOrder, scrollAreaClass }: CartBodyProps) {
  if (items.length === 0) return <CartEmpty />
  return (
    <>
      <ScrollArea className={scrollAreaClass ?? 'max-h-72'}>
        <div className='px-4 py-1'>
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
  )
}

/* ---------- main export ---------- */

export function CartPopover() {
  const { items, totalItems, subtotal, clearCart } = useCart()
  const { open, setOpen, handleEnter, handleLeave } = useHoverIntent(200)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const headerGap = useHeaderGap(triggerRef)
  const isMobile = useIsMobile()

  const handleOrder = useCallback(() => {
    const msg = buildTelegramMessage(items, subtotal, payment === 'crypto' ? 'Crypto (USDT)' : 'Wise Transfer')
    window.open(`${TELEGRAM_URL}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setOpen(false)
  }, [items, subtotal, payment, clearCart, setOpen])

  /* auto-open when an item is added */
  useEffect(() => {
    const handler = () => {
      setOpen(true)
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current)
      // on mobile, keep open until user dismisses; on desktop, auto-close after 3s
      if (!isMobile) {
        autoCloseTimer.current = setTimeout(() => setOpen(false), 3000)
      }
    }
    window.addEventListener('cart:item-added', handler)
    return () => {
      window.removeEventListener('cart:item-added', handler)
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current)
    }
  }, [setOpen, isMobile])

  /* ---------- trigger button (shared) ---------- */
  const triggerButton = (
    <Button
      ref={triggerRef}
      variant='outline'
      size='icon'
      className='relative hover:bg-primary/15 hover:text-foreground dark:hover:bg-primary/15 data-[state=open]:bg-primary/10 data-[state=open]:text-foreground'
      onMouseEnter={isMobile ? undefined : handleEnter}
      onMouseLeave={isMobile ? undefined : handleLeave}
    >
      <ShoppingCart className='size-4' />
      <span className='sr-only'>Cart</span>
      {totalItems > 0 && (
        <Badge className='absolute -top-1.5 -right-1.5 h-4.5 min-w-4.5 px-1 tabular-nums text-[10px]'>
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
    </Button>
  )

  /* ---------- mobile: Sheet sidebar ---------- */
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <div
          onClick={() => setOpen(true)}
          className='contents'
        >
          {triggerButton}
        </div>
        <SheetContent
          side='right'
          className='w-[85vw] max-w-[380px] p-0 flex flex-col'
        >
          <SheetHeader className='flex flex-row items-center justify-between gap-2 px-4 py-3 border-b'>
            <SheetTitle className='font-medium text-base'>Cart</SheetTitle>
            {totalItems > 0 && (
              <Badge variant='secondary' className='h-6 rounded-full px-2 text-xs'>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </SheetHeader>

          <div className='flex flex-col flex-1 overflow-hidden'>
            <CartBody
              items={items}
              subtotal={subtotal}
              payment={payment}
              onPaymentChange={setPayment}
              onOrder={handleOrder}
              scrollAreaClass='flex-1 overflow-y-auto'
            />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  /* ---------- desktop: Popover (unchanged) ---------- */
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>

      <PopoverContent
        align='end'
        sideOffset={0}
        className='w-[28rem] border-none bg-transparent p-0 shadow-none'
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* invisible hover bridge (covers gap between trigger and card) */}
        <div style={{ height: headerGap }} />
        {/* visible card */}
        <div className='rounded-md border bg-popover text-popover-foreground shadow-md'>
          {/* header */}
          <div className='flex items-center justify-between gap-2 px-4 py-2.5'>
            <span className='font-medium'>Cart</span>
            {totalItems > 0 && (
              <Badge variant='secondary' className='h-6 rounded-full px-2 text-xs'>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </div>

          <Separator />

          <CartBody
            items={items}
            subtotal={subtotal}
            payment={payment}
            onPaymentChange={setPayment}
            onOrder={handleOrder}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
