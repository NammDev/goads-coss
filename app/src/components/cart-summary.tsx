'use client'

import { Send, Bitcoin, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ---------- payment method selector + total + order button ---------- */

type PaymentMethod = 'crypto' | 'wise'

interface CartSummaryProps {
  subtotal: number
  payment: PaymentMethod
  onPaymentChange: (method: PaymentMethod) => void
  onOrder: () => void
}

export function CartSummary({ subtotal, payment, onPaymentChange, onOrder }: CartSummaryProps) {
  return (
    <div className='space-y-3 border-t px-4 py-3'>
      {/* payment method cards */}
      <div className='space-y-1.5'>
        <span className='text-xs text-muted-foreground'>Payment method</span>
        <div className='grid grid-cols-2 gap-2'>
          {/* Crypto card */}
          <button
            onClick={() => onPaymentChange('crypto')}
            className={`cursor-pointer relative flex flex-col gap-3 rounded-lg border p-3 text-left transition-all ${
              payment === 'crypto'
                ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/30 hover:bg-primary/10'
            }`}
          >
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
            onClick={() => onPaymentChange('wise')}
            className={`cursor-pointer relative flex flex-col gap-3 rounded-lg border p-3 text-left transition-all ${
              payment === 'wise'
                ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/30 hover:bg-primary/10'
            }`}
          >
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
        onClick={onOrder}
      >
        <Send className='size-4' />
        Order via Telegram
      </Button>
    </div>
  )
}
