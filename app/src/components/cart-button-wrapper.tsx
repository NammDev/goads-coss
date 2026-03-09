'use client'

import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import ShoppingCartSheet from '@/components/shadcn-studio/blocks/shopping-cart-02/shopping-cart-02'

/** Client boundary for cart sheet inside server-rendered SiteHeader */
export function CartButtonWrapper() {
  const { totalItems } = useCart()

  return (
    <ShoppingCartSheet
      trigger={
        <Button
          variant='ghost'
          size='icon'
          className='relative border-transparent hover:bg-primary/15 hover:text-foreground'
        >
          <ShoppingCart className='size-4' />
          <span className='sr-only'>Cart</span>
          {totalItems > 0 && (
            <Badge className='absolute -top-1.5 -right-1.5 h-4.5 min-w-4.5 px-1 tabular-nums text-[10px]'>
              {totalItems > 99 ? '99+' : totalItems}
            </Badge>
          )}
        </Button>
      }
    />
  )
}
