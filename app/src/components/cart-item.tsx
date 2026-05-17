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
    <div className='flex items-center gap-4 rounded-[16px] px-3 py-3 transition-colors duration-150 hover:bg-[var(--fp-solid-25)]'>
      {/* item info with badge */}
      <div className='flex grow items-center gap-4'>
        <div className='relative w-fit'>
          <div className='flex size-12 items-center justify-center rounded-[12px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)]'>
            <ShoppingCart className='size-5 text-[var(--fp-solid-400)]' />
          </div>
          <span className='absolute -end-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--fp-solid-900)] px-1 text-[10px] font-[550] tabular-nums text-white'>
            {item.quantity}
          </span>
        </div>
        <div className='flex flex-col gap-0.5'>
          <h4 className={`${fpText.labelM} text-[var(--fp-solid-700)]`}>{item.name}</h4>
          <span className={`${fpText.bodyS} text-[var(--fp-solid-400)]`}>{item.unit || 'unit'}</span>
        </div>
      </div>

      {/* price + quantity stepper */}
      <div className='flex shrink-0 flex-col items-end gap-2'>
        <span className={`${fpText.headingM} text-[var(--fp-solid-900)]`}>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <div className='flex items-center gap-1.5'>
          <NumberField
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, Math.max(1, value))}
            minValue={1}
            className='w-24'
          >
            <Group className='relative inline-flex h-9 w-full items-center overflow-hidden rounded-[10px] border border-[var(--fp-solid-50)] bg-white text-sm outline-none transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] data-focus-within:border-[var(--fp-solid-400)]'>
              <AriaButton
                slot='decrement'
                className='ms-1 flex aspect-square h-7 min-w-[1.75rem] cursor-pointer items-center justify-center rounded-[8px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
              >
                <MinusIcon className='size-3' />
              </AriaButton>
              <Input className='w-full grow px-1 py-1 text-center tabular-nums text-[var(--fp-solid-900)] outline-none' />
              <AriaButton
                slot='increment'
                className='me-1 flex aspect-square h-7 min-w-[1.75rem] cursor-pointer items-center justify-center rounded-[8px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
              >
                <PlusIcon className='size-3' />
              </AriaButton>
            </Group>
          </NumberField>
          <button
            onClick={() => removeItem(item.id)}
            aria-label='Remove'
            className='flex size-9 cursor-pointer items-center justify-center rounded-[10px] text-[var(--fp-solid-400)] transition-colors duration-150 hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]'
          >
            <Trash2 className='size-3.5' />
          </button>
        </div>
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
