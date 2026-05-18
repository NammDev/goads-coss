'use client'

import { ShoppingCart, MinusIcon, PlusIcon, Trash2 } from 'lucide-react'
import { Button as AriaButton, Group, Input, NumberField } from 'react-aria-components'
import { fpText } from '@/components/foreplay/foreplay-typography'
import { useCart, type CartItem } from '@/lib/cart-context'

// Foreplay redesign — renders inside ForeplaySectionWhiteBlock (white scope).
// Tokens per docs/foreplay/tool-design-language.md: title=solid-700,
// muted=solid-400, strong/price=solid-900, subpanel=solid-25, border=solid-50,
// card radius=16px. Logic/props unchanged.

/* ---------- single cart item row ---------- */

export function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className='flex items-center gap-3 rounded-[14px] border border-[var(--fp-solid-50)] bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition-all duration-150 hover:border-[var(--fp-solid-200)] hover:shadow-[0_4px_14px_rgba(16,24,40,0.09)]'>
      {/* icon + badge */}
      <div className='relative shrink-0'>
        <div className='flex size-9 items-center justify-center rounded-[10px] bg-[var(--fp-accent-soft)]'>
          <ShoppingCart className='size-4 text-[var(--fp-accent)]' />
        </div>
        <span className='absolute -end-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--fp-solid-900)] px-1 text-[9px] font-[550] tabular-nums text-white'>
          {item.quantity}
        </span>
      </div>

      {/* name + unit */}
      <div className='flex min-w-0 flex-1 flex-col'>
        <h4 className='truncate text-[0.8125rem] font-medium leading-[1.1rem] tracking-[-0.006em] text-[var(--fp-solid-700)]'>
          {item.name}
        </h4>
        <span className='text-[0.6875rem] leading-4 text-[var(--fp-solid-400)]'>
          ${item.price.toFixed(2)} · {item.unit || 'unit'}
        </span>
      </div>

      {/* price + stepper + remove */}
      <div className='flex shrink-0 items-center gap-1.5'>
        <div className='flex flex-col items-end gap-1'>
          <span className='text-[0.8125rem] font-[600] tabular-nums text-[var(--fp-solid-900)]'>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <NumberField
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, Math.max(1, value))}
            minValue={1}
            aria-label='Quantity'
          >
            <Group className='relative inline-flex h-7 items-center overflow-hidden rounded-[9px] border border-[var(--fp-solid-50)] bg-white outline-none transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] data-focus-within:border-[var(--fp-solid-400)]'>
              <AriaButton
                slot='decrement'
                className='ms-0.5 flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
              >
                <MinusIcon className='size-3' />
              </AriaButton>
              <Input className='w-7 grow text-center text-[0.75rem] tabular-nums text-[var(--fp-solid-900)] outline-none' />
              <AriaButton
                slot='increment'
                className='me-0.5 flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
              >
                <PlusIcon className='size-3' />
              </AriaButton>
            </Group>
          </NumberField>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          aria-label='Remove'
          className='flex size-7 cursor-pointer items-center justify-center rounded-[8px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
        >
          <Trash2 className='size-3.5' />
        </button>
      </div>
    </div>
  )
}

/* ---------- empty state ---------- */

export function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center gap-1 py-12 text-center'>
      <ShoppingCart className='mb-2 size-9 text-[var(--fp-solid-300)]' />
      <p className={`${fpText.headingL} text-[var(--fp-solid-700)]`}>Your cart is empty</p>
      <p className={`${fpText.bodyS} text-[var(--fp-solid-400)]`}>
        Browse products and add items
      </p>
    </div>
  )
}
