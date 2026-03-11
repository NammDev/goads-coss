'use client'

import { ShoppingCart, MinusIcon, PlusIcon, Trash2 } from 'lucide-react'
import { Button as AriaButton, Group, Input, NumberField } from 'react-aria-components'
import { Badge } from '@/components/ui/badge'
import { useCart, type CartItem } from '@/lib/cart-context'

/* ---------- single cart item row ---------- */

export function CartItemRow({ item }: { item: CartItem }) {
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
            <Group className='border-input data-focus-within:border-ring data-focus-within:ring-ring/50 relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border bg-transparent text-xs shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]'>
              <AriaButton
                slot='decrement'
                className='cursor-pointer bg-primary/10 text-muted-foreground hover:bg-primary/15 hover:text-foreground ms-1 flex aspect-square h-7 min-w-[1.75rem] items-center justify-center rounded-sm transition-colors'
              >
                <MinusIcon className='size-3' />
              </AriaButton>
              <Input className='w-full grow px-1 py-1 text-center tabular-nums outline-none' />
              <AriaButton
                slot='increment'
                className='cursor-pointer bg-primary/10 text-muted-foreground hover:bg-primary/15 hover:text-foreground me-1 flex aspect-square h-7 min-w-[1.75rem] items-center justify-center rounded-sm transition-colors'
              >
                <PlusIcon className='size-3' />
              </AriaButton>
            </Group>
          </NumberField>
          <button
            onClick={() => removeItem(item.id)}
            className='cursor-pointer flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'
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
    <div className='flex flex-col items-center justify-center py-8 text-center'>
      <ShoppingCart className='size-8 text-muted-foreground/50 mb-3' />
      <p className='text-sm text-muted-foreground'>Your cart is empty</p>
      <p className='text-xs text-muted-foreground/70 mt-1'>Browse products and add items</p>
    </div>
  )
}
