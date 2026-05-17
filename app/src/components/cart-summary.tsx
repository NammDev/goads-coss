'use client'

import { Send, Bitcoin, Landmark } from 'lucide-react'
import { fpText } from '@/components/foreplay/foreplay-typography'
import { ForeplayLightPrimaryButton } from '@/components/foreplay/foreplay-light-primary-button'

// Foreplay redesign — inside ForeplaySectionWhiteBlock (white scope).
// Result-card tokens per docs/foreplay/tool-design-language.md.
// CTA reuses <ForeplayLightPrimaryButton> (DRY). Logic/props unchanged.

/* ---------- payment method selector + total + order button ---------- */

type PaymentMethod = 'crypto' | 'wise'

interface CartSummaryProps {
  subtotal: number
  payment: PaymentMethod
  onPaymentChange: (method: PaymentMethod) => void
  onOrder: () => void
}

interface PaymentOption {
  id: PaymentMethod
  label: string
  sub: string
  Icon: typeof Bitcoin
}

const PAYMENTS: PaymentOption[] = [
  { id: 'crypto', label: 'Crypto', sub: 'USDT / TRC20', Icon: Bitcoin },
  { id: 'wise', label: 'Wise', sub: 'Bank Transfer', Icon: Landmark },
]

function PaymentCard({
  option,
  selected,
  onSelect,
}: {
  option: PaymentOption
  selected: boolean
  onSelect: () => void
}) {
  const { label, sub, Icon } = option
  return (
    <button
      onClick={onSelect}
      className={`relative flex cursor-pointer flex-col gap-3 rounded-[16px] border p-4 text-left transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
        selected
          ? 'border-[var(--fp-solid-700)] bg-[var(--fp-solid-25)]'
          : 'border-[var(--fp-solid-50)] hover:border-[var(--fp-solid-300)]'
      }`}
    >
      <span
        className={`flex size-4 items-center justify-center rounded-full border transition-colors ${
          selected
            ? 'border-[var(--fp-solid-900)] bg-[var(--fp-solid-900)]'
            : 'border-[var(--fp-solid-300)] bg-transparent'
        }`}
      >
        {selected && <span className='size-1.5 rounded-full bg-white' />}
      </span>
      <div className='flex items-end justify-between gap-1'>
        <div>
          <p className={`${fpText.labelS} text-[var(--fp-solid-700)]`}>{label}</p>
          <p className={`${fpText.bodyS} text-[var(--fp-solid-400)]`}>{sub}</p>
        </div>
        <Icon
          className={`size-5 shrink-0 transition-colors ${
            selected ? 'text-[var(--fp-solid-700)]' : 'text-[var(--fp-solid-300)]'
          }`}
        />
      </div>
    </button>
  )
}

export function CartSummary({ subtotal, payment, onPaymentChange, onOrder }: CartSummaryProps) {
  return (
    <div className='flex flex-col gap-5 border-t border-[var(--fp-solid-50)] px-6 py-5'>
      {/* payment method cards */}
      <div className='flex flex-col gap-2'>
        <span className={`${fpText.bodyS} text-[var(--fp-solid-400)]`}>Payment method</span>
        <div className='grid grid-cols-2 gap-3'>
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

      <div className='flex items-center justify-between gap-2.5'>
        <h5 className={`${fpText.headingL} grow text-[var(--fp-solid-700)]`}>Total</h5>
        <div className='flex items-baseline gap-2'>
          <span className={`${fpText.bodyS} text-[var(--fp-solid-400)]`}>USD</span>
          <span className={`${fpText.displayH5} text-[var(--fp-solid-900)]`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <ForeplayLightPrimaryButton
        onClick={onOrder}
        icon={<Send className='size-4' />}
        className='w-full justify-center'
      >
        Order via Telegram
      </ForeplayLightPrimaryButton>
    </div>
  )
}
