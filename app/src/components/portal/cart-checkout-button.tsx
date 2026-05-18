'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBagIcon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { checkoutCart } from '@/lib/actions/checkout-actions'

interface CartCheckoutButtonProps {
  className?: string
}

/**
 * Customer self-serve checkout button.
 * Calls checkoutCart() server action and handles all result codes:
 * - success: clear cart + navigate to order
 * - INSUFFICIENT_BALANCE: set pending flag + redirect to wallet
 * - other errors: toast the message, preserve cart
 */
export function CartCheckoutButton({ className }: CartCheckoutButtonProps) {
  const router = useRouter()
  const { items, subtotal, clearCart, setPendingCheckout, clearPendingCheckout } = useCart()
  const [isPending, startTransition] = useTransition()

  const isEmpty = items.length === 0

  const handleCheckout = () => {
    if (isEmpty) return

    startTransition(async () => {
      const result = await checkoutCart({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      })

      if (result.success) {
        clearCart()
        clearPendingCheckout()
        toast.success('Order placed successfully')
        router.push(`/portal/orders/${result.orderId}`)
        return
      }

      if (result.code === 'INSUFFICIENT_BALANCE') {
        const required = parseFloat(result.required ?? '0')
        const available = parseFloat(result.available ?? '0')
        const shortfall = Math.max(0, required - available).toFixed(2)

        setPendingCheckout(true, subtotal)
        toast.error(`Insufficient balance — top up $${shortfall} to continue`, {
          duration: 5000,
        })
        router.push('/portal/wallet?returnTo=checkout')
        return
      }

      if (result.code === 'UNAUTHENTICATED') {
        router.push('/sign-in')
        return
      }

      // All other errors: show message, preserve cart
      toast.error(result.message)
    })
  }

  return (
    <Button
      className={className}
      onClick={handleCheckout}
      disabled={isEmpty || isPending}
      aria-disabled={isEmpty || isPending}
      size="sm"
    >
      {isPending ? (
        <>
          <Loader2Icon className="mr-2 size-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingBagIcon className="mr-2 size-4" />
          Checkout
        </>
      )}
    </Button>
  )
}
