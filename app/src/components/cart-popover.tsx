'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ShoppingCart, MinusIcon, PlusIcon, Trash2, Send, Bitcoin, Landmark } from 'lucide-react'
import { Button as AriaButton, Group, Input, NumberField } from 'react-aria-components'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart, type CartItem } from '@/lib/cart-context'

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

/* ---------- single cart item row (shopping-cart-04 design) ---------- */

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className='flex items-center gap-4 rounded-lg px-2 py-2.5 -mx-2 transition-colors hover:bg-primary/5'>
      {/* item info with badge */}
      <div className='flex grow items-center gap-4'>
        <div className='relative w-fit'>
          <div className='flex size-12 items-center justify-center rounded-md border bg-muted/30'>
            <ShoppingCart className='size-5 text-muted-foreground' />
          </div>
          <Badge className='absolute -end-2 -top-2 h-4.5 min-w-4.5 px-1 tabular-nums text-[10px]'>
            {item.quantity}
          </Badge>
        </div>
        <div className='flex flex-col gap-0.5'>
          <h4 className='text-sm font-medium leading-tight'>{item.name}</h4>
          <span className='text-xs text-muted-foreground'>{item.unit || 'unit'}</span>
        </div>
      </div>

      {/* price + quantity stepper */}
      <div className='flex shrink-0 flex-col items-end gap-1.5'>
        <span className='text-sm font-semibold'>${(item.price * item.quantity).toFixed(2)}</span>
        <div className='flex items-center gap-1'>
          <NumberField
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, Math.max(1, value))}
            minValue={1}
            className='w-24'
          >
            <Group className='border-input data-focus-within:border-ring data-focus-within:ring-ring/50 relative inline-flex h-7 w-full items-center overflow-hidden rounded-md border bg-transparent text-xs shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]'>
              <AriaButton
                slot='decrement'
                className='cursor-pointer bg-primary/10 text-muted-foreground hover:bg-primary/15 hover:text-foreground ms-1 flex aspect-square h-4.5 items-center justify-center rounded-sm transition-colors'
              >
                <MinusIcon className='size-2.5' />
              </AriaButton>
              <Input className='w-full grow px-1 py-1 text-center tabular-nums outline-none' />
              <AriaButton
                slot='increment'
                className='cursor-pointer bg-primary/10 text-muted-foreground hover:bg-primary/15 hover:text-foreground me-1 flex aspect-square h-4.5 items-center justify-center rounded-sm transition-colors'
              >
                <PlusIcon className='size-2.5' />
              </AriaButton>
            </Group>
          </NumberField>
          <button
            onClick={() => removeItem(item.id)}
            className='cursor-pointer flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'
          >
            <Trash2 className='size-3.5' />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- empty state ---------- */

function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center py-8 text-center'>
      <ShoppingCart className='size-8 text-muted-foreground/50 mb-3' />
      <p className='text-sm text-muted-foreground'>Your cart is empty</p>
      <p className='text-xs text-muted-foreground/70 mt-1'>Browse products and add items</p>
    </div>
  )
}

/* ---------- main popover ---------- */

const TELEGRAM_URL = 'https://t.me/GoAdsSupport'

function buildTelegramMessage(items: CartItem[], subtotal: number, payment: string) {
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

/* measure padding needed so popover visually starts 8px below header border */
function useHeaderGap(triggerRef: React.RefObject<HTMLButtonElement | null>) {
  const [gap, setGap] = useState(22) // fallback
  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const header = el.closest('header')
    if (!header) return
    const headerBottom = header.getBoundingClientRect().bottom
    const triggerBottom = el.getBoundingClientRect().bottom
    setGap(headerBottom - triggerBottom + 8) // 8px visual gap from header border
  }, [triggerRef])
  return gap
}

export function CartPopover() {
  const { items, totalItems, subtotal, clearCart } = useCart()
  const { open, setOpen, handleEnter, handleLeave } = useHoverIntent(200)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const headerGap = useHeaderGap(triggerRef)

  const handleOrder = useCallback(() => {
    const msg = buildTelegramMessage(items, subtotal, payment === 'crypto' ? 'Crypto (USDT)' : 'Wise Transfer')
    window.open(`${TELEGRAM_URL}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setOpen(false)
  }, [items, subtotal, payment, clearCart, setOpen])

  /* auto-open popover when an item is added */
  useEffect(() => {
    const handler = () => {
      setOpen(true)
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current)
      autoCloseTimer.current = setTimeout(() => setOpen(false), 3000)
    }
    window.addEventListener('cart:item-added', handler)
    return () => {
      window.removeEventListener('cart:item-added', handler)
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current)
    }
  }, [setOpen])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant='outline'
          size='icon'
          className='relative hover:bg-primary/15 hover:text-foreground dark:hover:bg-primary/15 data-[state=open]:bg-primary/10 data-[state=open]:text-foreground'
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <ShoppingCart className='size-4' />
          <span className='sr-only'>Cart</span>
          {totalItems > 0 && (
            <Badge className='absolute -top-1.5 -right-1.5 h-4.5 min-w-4.5 px-1 tabular-nums text-[10px]'>
              {totalItems > 99 ? '99+' : totalItems}
            </Badge>
          )}
        </Button>
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
        {/* header — popover-11 style */}
        <div className='flex items-center justify-between gap-2 px-4 py-2.5'>
          <span className='font-medium'>Cart</span>
          {totalItems > 0 && (
            <Badge variant='secondary' className='h-6 rounded-full px-2 text-xs'>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>

        <Separator />

        {/* items list */}
        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <ScrollArea className='max-h-72'>
              <div className='px-4 py-1'>
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            {/* footer: payment + total + order button */}
            <div className='space-y-3 border-t px-4 py-3'>
              {/* payment method cards */}
              <div className='space-y-1.5'>
                <span className='text-xs text-muted-foreground'>Payment method</span>
                <div className='grid grid-cols-2 gap-2'>
                  {/* Crypto card */}
                  <button
                    onClick={() => setPayment('crypto')}
                    className={`cursor-pointer relative flex flex-col gap-3 rounded-lg border p-3 text-left transition-all ${
                      payment === 'crypto'
                        ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                        : 'border-border hover:border-primary/30 hover:bg-primary/10'
                    }`}
                  >
                    {/* radio dot */}
                    <span
                      className={`flex size-3.5 items-center justify-center rounded-full border transition-colors ${
                        payment === 'crypto'
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40 bg-transparent'
                      }`}
                    >
                      {payment === 'crypto' && (
                        <span className='size-1.5 rounded-full bg-primary-foreground' />
                      )}
                    </span>
                    {/* text */}
                    <div className='flex items-end justify-between gap-1'>
                      <div>
                        <p className='text-xs font-semibold leading-tight text-foreground'>Crypto</p>
                        <p className='text-[10px] text-muted-foreground leading-tight'>USDT / TRC20</p>
                      </div>
                      <Bitcoin className={`size-5 shrink-0 transition-colors ${payment === 'crypto' ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    </div>
                  </button>

                  {/* Wise card */}
                  <button
                    onClick={() => setPayment('wise')}
                    className={`cursor-pointer relative flex flex-col gap-3 rounded-lg border p-3 text-left transition-all ${
                      payment === 'wise'
                        ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                        : 'border-border hover:border-primary/30 hover:bg-primary/10'
                    }`}
                  >
                    {/* radio dot */}
                    <span
                      className={`flex size-3.5 items-center justify-center rounded-full border transition-colors ${
                        payment === 'wise'
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40 bg-transparent'
                      }`}
                    >
                      {payment === 'wise' && (
                        <span className='size-1.5 rounded-full bg-primary-foreground' />
                      )}
                    </span>
                    {/* text */}
                    <div className='flex items-end justify-between gap-1'>
                      <div>
                        <p className='text-xs font-semibold leading-tight text-foreground'>Wise</p>
                        <p className='text-[10px] text-muted-foreground leading-tight'>Bank Transfer</p>
                      </div>
                      <Landmark className={`size-5 shrink-0 transition-colors ${payment === 'wise' ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    </div>
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between gap-2.5'>
                <h5 className='grow font-semibold'>Total</h5>
                <div className='flex items-center gap-2'>
                  <p className='text-muted-foreground text-sm'>USD</p>
                  <p className='text-lg font-semibold'>${subtotal.toFixed(2)}</p>
                </div>
              </div>

              <Button
                size='lg'
                className='btn-mirror-sweep btn-secondary w-full rounded-lg text-sm gap-2'
                onClick={handleOrder}
              >
                <Send className='size-4' />
                Order via Telegram
              </Button>
            </div>
          </>
        )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
