'use client'

import { useState, useCallback, useEffect, type ReactNode } from 'react'
import { Trash2Icon, Send, Bitcoin, Landmark, ShoppingCart as ShoppingCartIcon, MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCart } from '@/lib/cart-context'

const TELEGRAM_USERNAME = 'goads_official'

function buildTelegramMessage(
  items: { name: string; quantity: number; price: number; unit?: string }[],
  total: number,
  payment: string,
  note: string
) {
  const lines = items.map(
    (i) => `  • ${i.name} × ${i.quantity} = $${i.price * i.quantity}`
  )
  const parts = [
    '🛒 New Order from GoAds',
    '',
    '📦 Items:',
    ...lines,
    '',
    `💰 Total: $${total}`,
    `💳 Payment: ${payment}`,
  ]
  if (note.trim()) {
    parts.push('', '📝 Customer Note:', note.trim())
  }
  return parts.join('\n')
}

type ShoppingCartProps = {
  trigger: ReactNode
  defaultOpen?: boolean
}

const ShoppingCart = ({ defaultOpen = false, trigger }: ShoppingCartProps) => {
  const { items, totalItems, subtotal, removeItem, updateQuantity, clearCart } = useCart()
  const [open, setOpen] = useState(defaultOpen)
  const [payment, setPayment] = useState<'crypto' | 'wise'>('crypto')
  const [note, setNote] = useState('')
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({})

  /* auto-open sheet when item added — desktop only, mobile shows toast instead */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setOpen(true)
    }
    window.addEventListener('cart:item-added', handler)
    return () => window.removeEventListener('cart:item-added', handler)
  }, [])

  const handleOrder = useCallback(() => {
    const msg = buildTelegramMessage(
      items,
      subtotal,
      payment === 'crypto' ? 'Crypto (USDT)' : 'Wise (Bank Transfer)',
      note
    )
    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setNote('')
    setOpen(false)
  }, [items, subtotal, payment, note, clearCart])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side='right'
        className='flex w-80 sm:max-w-[28rem] flex-col gap-0 p-0 [&>button]:top-5 [&>button]:right-5 [&>button>svg]:size-5'
      >
        {/* header */}
        <SheetHeader className='px-6 pt-6 pb-4'>
          <SheetTitle className='text-base font-semibold'>Your Cart</SheetTitle>
          <SheetDescription hidden />
        </SheetHeader>

        {/* scrollable items area */}
        <div className='flex-1 overflow-y-auto px-6'>
          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 text-center'>
              <ShoppingCartIcon className='size-10 text-muted-foreground/40 mb-3' />
              <p className='text-sm font-medium text-muted-foreground'>Your cart is empty</p>
              <p className='text-xs text-muted-foreground/70 mt-1'>Browse products and add items</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className='border-b border-border/60 py-4 space-y-2.5'>
                {/* row 1: name + unit ... price + delete */}
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0 flex-1'>
                    <h4 className='text-sm font-medium leading-snug'>{item.name}</h4>
                    <span className='text-xs text-muted-foreground'>${item.price} / {item.unit || 'unit'}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-sm font-semibold tabular-nums'>${item.price * item.quantity}</span>
                    <Popover
                      open={openPopovers[item.id] || false}
                      onOpenChange={(v) => setOpenPopovers((prev) => ({ ...prev, [item.id]: v }))}
                    >
                      <PopoverTrigger asChild>
                        <Button variant='ghost' size='icon-xs' className='text-muted-foreground hover:text-destructive hover:bg-destructive/10'>
                          <Trash2Icon className='size-3.5' />
                          <span className='sr-only'>Remove</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-72'>
                        <div className='flex flex-col items-center gap-3'>
                          <div className='flex size-10 items-center justify-center rounded-full bg-destructive/10'>
                            <Trash2Icon className='text-destructive size-5' />
                          </div>
                          <p className='text-center text-sm font-medium text-balance'>
                            Remove this item from cart?
                          </p>
                          <div className='grid w-full grid-cols-2 gap-2'>
                            <Button
                              variant='secondary'
                              size='sm'
                              onClick={() => setOpenPopovers((prev) => ({ ...prev, [item.id]: false }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => {
                                removeItem(item.id)
                                setOpenPopovers((prev) => ({ ...prev, [item.id]: false }))
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {/* row 2: quantity stepper */}
                <div className='inline-flex h-8 items-center rounded-full border border-border/60 bg-background'>
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className='flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                  >
                    <MinusIcon className='size-3' />
                  </button>
                  <span className='min-w-8 text-center text-xs font-medium tabular-nums'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                  >
                    <PlusIcon className='size-3' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer — payment + note + total + order */}
        {items.length > 0 && (
          <SheetFooter className='mt-auto border-t border-border/60 px-6 py-4'>
            <div className='w-full space-y-4'>
              {/* payment method */}
              <div className='space-y-2'>
                <span className='text-xs font-medium text-muted-foreground'>Payment method</span>
                <div className='grid grid-cols-2 gap-2'>
                  <button
                    onClick={() => setPayment('crypto')}
                    className={`cursor-pointer relative flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all ${
                      payment === 'crypto'
                        ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                        : 'border-border hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <span
                      className={`flex size-3.5 items-center justify-center rounded-full border transition-colors ${
                        payment === 'crypto'
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      }`}
                    >
                      {payment === 'crypto' && <span className='size-1.5 rounded-full bg-primary-foreground' />}
                    </span>
                    <div className='flex flex-1 items-center justify-between'>
                      <span className='text-xs font-medium'>Crypto</span>
                      <Bitcoin className={`size-4 ${payment === 'crypto' ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    </div>
                  </button>
                  <button
                    onClick={() => setPayment('wise')}
                    className={`cursor-pointer relative flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all ${
                      payment === 'wise'
                        ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                        : 'border-border hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <span
                      className={`flex size-3.5 items-center justify-center rounded-full border transition-colors ${
                        payment === 'wise'
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      }`}
                    >
                      {payment === 'wise' && <span className='size-1.5 rounded-full bg-primary-foreground' />}
                    </span>
                    <div className='flex flex-1 items-center justify-between'>
                      <span className='text-xs font-medium'>Wise</span>
                      <Landmark className={`size-4 ${payment === 'wise' ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    </div>
                  </button>
                </div>
              </div>

              {/* customer note */}
              <div className='space-y-1.5'>
                <label htmlFor='cart-note' className='text-xs font-medium text-muted-foreground'>
                  Questions or notes
                </label>
                <textarea
                  id='cart-note'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder='Any questions about our products or special requests...'
                  rows={6}
                  className='w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/50'
                />
              </div>

              <Separator />

              {/* total */}
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>Total</span>
                <div className='flex items-center gap-1.5'>
                  <span className='text-sm text-muted-foreground'>USD</span>
                  <span className='text-lg font-semibold'>${subtotal}</span>
                </div>
              </div>

              {/* order button */}
              <Button
                size='lg'
                className='btn-mirror-sweep btn-secondary w-full rounded-lg text-sm gap-2'
                onClick={handleOrder}
              >
                <Send className='size-4' />
                Order via Telegram
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCart
