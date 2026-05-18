'use client'

import { Send, Bitcoin, Landmark, ShieldCheck } from 'lucide-react'
import { fpText } from '@/components/foreplay/foreplay-typography'
import { ForeplayLightPrimaryButton } from '@/components/foreplay/foreplay-light-primary-button'

// Foreplay redesign — inside ForeplaySectionWhiteBlock (white scope).
// Result-card tokens per docs/foreplay/tool-design-language.md.
// CTA reuses <ForeplayLightPrimaryButton> (DRY). Logic/props unchanged.

/* ---------- payment method selector + total + order button ---------- */

type PaymentMethod = 'crypto' | 'wise'

interface CartSummaryProps {
  subtotal: number
  itemCount: number
  payment: PaymentMethod
  onPaymentChange: (method: PaymentMethod) => void
  note: string
  onNoteChange: (note: string) => void
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
          ? 'border-[var(--fp-accent)] bg-[var(--fp-accent-soft)]'
          : 'border-[var(--fp-solid-50)] hover:border-[var(--fp-solid-300)]'
      }`}
    >
      <span
        className={`flex size-4 items-center justify-center rounded-full border transition-colors ${
          selected
            ? 'border-[var(--fp-accent)] bg-[var(--fp-accent)]'
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
            selected ? 'text-[var(--fp-accent)]' : 'text-[var(--fp-solid-300)]'
          }`}
        />
      </div>
    </button>
  )
}

export function CartSummary({
  subtotal,
  itemCount,
  payment,
  onPaymentChange,
  note,
  onNoteChange,
  onOrder,
}: CartSummaryProps) {
  return (
    <div className='flex flex-col gap-3.5 border-t border-[var(--fp-solid-50)] px-5 pt-4 pb-4'>
      {/* payment method cards */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-[0.75rem] font-medium text-[var(--fp-solid-400)]'>Payment method</span>
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

      {/* optional customer note — subtle so it never competes with the CTA */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-[0.75rem] font-medium text-[var(--fp-solid-400)]'>
          Note <span className='text-[var(--fp-solid-300)]'>(optional)</span>
        </span>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={2}
          placeholder='Any special request or instruction…'
          className='w-full resize-none rounded-[12px] border border-[var(--fp-solid-50)] bg-white px-3 py-2.5 text-[0.8125rem] text-[var(--fp-solid-700)] placeholder:text-[var(--fp-solid-300)] transition-colors duration-200 outline-none focus:border-[var(--fp-accent)]'
        />
      </div>

      {/* total — the conversion focal point: clear label + big accent figure */}
      <div className='flex items-end justify-between gap-2.5 border-t border-[var(--fp-solid-50)] pt-3.5'>
        <div className='flex flex-col'>
          <span className='text-[0.75rem] font-medium text-[var(--fp-solid-400)]'>Total</span>
          <span className='text-[0.6875rem] text-[var(--fp-solid-300)]'>
            {itemCount} item{itemCount === 1 ? '' : 's'} · taxes incl.
          </span>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-[0.75rem] font-medium text-[var(--fp-solid-400)]'>USD</span>
          <span className={`${fpText.displayH5} text-[var(--fp-accent)]`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* primary CTA — dominant action */}
      <ForeplayLightPrimaryButton
        onClick={onOrder}
        icon={<Send className='size-4' />}
        className='w-full justify-center'
      >
        Order via Telegram
      </ForeplayLightPrimaryButton>

      {/* trust micro-line — boosts checkout confidence */}
      <div className='flex items-center justify-center gap-1.5 text-[0.6875rem] text-[var(--fp-solid-400)]'>
        <ShieldCheck className='size-3.5 text-[var(--fp-accent)]' />
        Secure order via Telegram · instant support
      </div>
    </div>
  )
}
