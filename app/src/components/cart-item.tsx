'use client'

import { ShoppingCart, MinusIcon, PlusIcon, Trash2 } from 'lucide-react'
import { Button as AriaButton, Group, Input, NumberField } from 'react-aria-components'
import { useCart, type CartItem } from '@/lib/cart-context'
import { formatPrice } from '@/components/cart-popover-utils'

// REDESIGN — Intercom messenger design language (plan 260518-0013
// support-widget-design-language.md §7,11,12). Literal palette, NOT foreplay
// tokens: white card · 16px radius · #E6E8EB hairline ring · soft elevation ·
// strong #1A1A1A / muted #6C6F74 · blue accent #528BFF. Logic/props unchanged.

/* ---------- single cart item row (white action-row card) ---------- */

export function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className='flex items-center gap-3 rounded-2xl bg-white px-[18px] py-4 ring-1 ring-[#E6E8EB] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-shadow duration-150 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      {/* icon tile + quantity badge */}
      <div className='relative shrink-0'>
        <div className='flex size-9 items-center justify-center rounded-[10px] bg-[#EEF3FF]'>
          <ShoppingCart className='size-4 text-[#528BFF]' />
        </div>
        <span className='absolute -end-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0A0A0A] px-1 text-[9px] font-semibold tabular-nums text-white'>
          {item.quantity}
        </span>
      </div>

      {/* name + unit */}
      <div className='flex min-w-0 flex-1 flex-col'>
        <h4 className='truncate text-[15px] font-semibold leading-5 text-[#1A1A1A]'>
          {item.name}
        </h4>
        <span className='text-[13px] leading-4 text-[#6C6F74]'>
          ${formatPrice(item.price)} · {item.unit || 'unit'}
        </span>
      </div>

      {/* price + stepper + remove */}
      <div className='flex shrink-0 items-center gap-1.5'>
        <div className='flex flex-col items-end gap-1'>
          <span className='text-[15px] font-semibold tabular-nums text-[#1A1A1A]'>
            ${formatPrice(item.price * item.quantity)}
          </span>
          <NumberField
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, Math.max(1, value))}
            minValue={1}
            aria-label='Quantity'
          >
            <Group className='relative inline-flex h-7 items-center overflow-hidden rounded-[10px] bg-white ring-1 ring-[#E6E8EB] outline-none transition-shadow duration-200 data-focus-within:ring-[#0A0A0A]'>
              <AriaButton
                slot='decrement'
                className='ms-0.5 flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[#6C6F74] transition-colors duration-150 hover:bg-[#F4F5F7] hover:text-[#1A1A1A]'
              >
                <MinusIcon className='size-3' />
              </AriaButton>
              <Input className='w-7 grow text-center text-[12px] tabular-nums text-[#1A1A1A] outline-none' />
              <AriaButton
                slot='increment'
                className='me-0.5 flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[#6C6F74] transition-colors duration-150 hover:bg-[#F4F5F7] hover:text-[#1A1A1A]'
              >
                <PlusIcon className='size-3' />
              </AriaButton>
            </Group>
          </NumberField>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          aria-label='Remove'
          className='flex size-7 cursor-pointer items-center justify-center rounded-[8px] text-[#6C6F74] transition-colors duration-150 hover:bg-[#F4F5F7] hover:text-[#1A1A1A]'
        >
          <Trash2 className='size-3.5' />
        </button>
      </div>
    </div>
  )
}

/* ---------- empty state (white card) ---------- */

export function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center gap-1 rounded-2xl bg-white px-5 py-12 text-center ring-1 ring-[#E6E8EB] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'>
      <div className='mb-2 flex size-12 items-center justify-center rounded-full bg-[#EEF3FF]'>
        <ShoppingCart className='size-5 text-[#528BFF]' />
      </div>
      <p className='text-[15px] font-semibold text-[#1A1A1A]'>Your cart is empty</p>
      <p className='text-[13px] text-[#6C6F74]'>Browse products and add items</p>
    </div>
  )
}
