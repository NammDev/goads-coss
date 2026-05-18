'use client'

import { Send, ShieldCheck } from 'lucide-react'
import { BitcoinMark, WiseMark } from '@/components/cart-payment-icons'
import { formatPrice } from '@/components/cart-popover-utils'

// REDESIGN — Intercom messenger design language (plan 260518-0013
// support-widget-design-language.md §8,11,12). Literal palette, NOT foreplay
// tokens: white cards · 16px radius · #E6E8EB ring · CTA #0A0A0A / 10px / 44px ·
// blue accent #528BFF. Logic/props unchanged.

/* ---------- payment selector + total + order button ---------- */

type PaymentMethod = 'crypto' | 'wise'

interface CartSummaryProps {
  subtotal: number
  payment: PaymentMethod
  onPaymentChange: (method: PaymentMethod) => void
  note: string
  onNoteChange: (note: string) => void
  onOrder: () => void
}

interface PaymentOption {
  id: PaymentMethod
  label: string
  Mark: typeof BitcoinMark
}

const PAYMENTS: PaymentOption[] = [
  { id: 'crypto', label: 'Crypto', Mark: BitcoinMark },
  { id: 'wise', label: 'Wise', Mark: WiseMark },
]

// Compact card: just the brand logo + label, ring highlights the selection.
function PaymentCard({
  option,
  selected,
  onSelect,
}: {
  option: PaymentOption
  selected: boolean
  onSelect: () => void
}) {
  const { label, Mark } = option
  return (
    <button
      onClick={onSelect}
      className={`flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-white px-3 py-2.5 text-left ring-1 transition-shadow duration-200 ${
        selected
          ? 'ring-2 ring-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
          : 'ring-[#E6E8EB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
      }`}
    >
      <Mark size={22} />
      <span className='text-[14px] font-semibold text-[#1A1A1A]'>{label}</span>
    </button>
  )
}

export function CartSummary({
  subtotal,
  payment,
  onPaymentChange,
  note,
  onNoteChange,
  onOrder,
}: CartSummaryProps) {
  return (
    <div className='flex shrink-0 flex-col gap-3.5 border-t border-[#ECEDEF] px-5 pt-4 pb-4'>
      {/* payment method cards */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-[12px] font-medium text-[#6C6F74]'>Payment method</span>
        <div className='grid grid-cols-2 gap-2'>
          {PAYMENTS.map((opt) => (
            <PaymentCard
              key={opt.id}
              option={opt}
              selected={payment === opt.id}
              onSelect={() => onPaymentChange(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* optional customer note */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-[12px] font-medium text-[#6C6F74]'>
          Note <span className='text-[#C7CBD1]'>(optional)</span>
        </span>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={2}
          placeholder='Any special request or instruction…'
          className='w-full resize-none rounded-[12px] bg-white px-3 py-2.5 text-[13px] text-[#1A1A1A] ring-1 ring-[#E6E8EB] outline-none transition-shadow duration-200 placeholder:text-[#C7CBD1] focus:ring-2 focus:ring-[#528BFF]'
        />
      </div>

      {/* total — conversion focal point */}
      <div className='flex items-end justify-between gap-2.5 border-t border-[#ECEDEF] pt-3.5'>
        <span className='text-[12px] font-medium text-[#6C6F74]'>Total</span>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-[12px] font-medium text-[#6C6F74]'>USD</span>
          <span className='text-[26px] font-semibold leading-none tracking-tight text-[#1A1A1A]'>
            ${formatPrice(subtotal)}
          </span>
        </div>
      </div>

      {/* primary CTA — Intercom button: #0A0A0A · 10px radius · 44px height */}
      <button
        onClick={onOrder}
        className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#0A0A0A] text-[14px] font-semibold text-white transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]'
      >
        <Send className='size-4' />
        Order via Telegram
      </button>

      {/* trust micro-line */}
      <div className='flex items-center justify-center gap-1.5 text-[13px] text-[#6C6F74]'>
        <ShieldCheck className='size-3.5 text-[#528BFF]' />
        Secure order via Telegram · instant support
      </div>
    </div>
  )
}
