'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2Icon, ArrowLeftIcon } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { checkoutCart } from '@/lib/actions/checkout-actions'

type PageState = 'loading' | 'error' | 'redirecting'

/**
 * Auto-resume checkout page.
 * Navigated to from CheckoutResumeModal with ?resume=1.
 * Automatically invokes checkoutCart() once on mount.
 *
 * On success: clears cart + pendingCheckout, navigates to /portal/orders/{orderId}
 * On INSUFFICIENT_BALANCE: redirects back to /portal/wallet?returnTo=checkout
 * On other errors: shows inline error with "Back to wallet" link
 */
export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, clearCart, clearPendingCheckout, setPendingCheckout, subtotal } = useCart()
  const [state, setState] = useState<PageState>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasRunRef = useRef(false)

  useEffect(() => {
    // Guard: only run once
    if (hasRunRef.current) return
    hasRunRef.current = true

    // If cart is empty, redirect to wallet
    if (items.length === 0) {
      router.replace('/portal/wallet')
      return
    }

    const run = async () => {
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
        setState('redirecting')
        router.push(`/portal/orders/${result.orderId}`)
        return
      }

      if (result.code === 'INSUFFICIENT_BALANCE') {
        const required = parseFloat(result.required ?? '0')
        const available = parseFloat(result.available ?? '0')
        const shortfall = Math.max(0, required - available).toFixed(2)
        setPendingCheckout(true, subtotal)
        toast.error(`Still insufficient balance — top up $${shortfall} more`)
        router.replace('/portal/wallet?returnTo=checkout')
        return
      }

      if (result.code === 'UNAUTHENTICATED') {
        router.replace('/sign-in')
        return
      }

      setErrorMessage(result.message)
      setState('error')
    }

    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state === 'loading' || state === 'redirecting') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          {state === 'redirecting' ? 'Order placed! Redirecting...' : 'Processing your order...'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-lg font-semibold">Checkout failed</p>
      {errorMessage && (
        <p className="text-muted-foreground text-sm max-w-sm">{errorMessage}</p>
      )}
      <Button asChild variant="outline" size="sm">
        <Link href="/portal/wallet">
          <ArrowLeftIcon className="mr-2 size-4" />
          Back to wallet
        </Link>
      </Button>
    </div>
  )
}
