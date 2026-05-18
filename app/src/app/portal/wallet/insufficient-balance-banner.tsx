'use client'

import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { formatUSD } from '@/lib/format-currency'
import { useCart } from '@/lib/cart-context'

interface InsufficientBalanceBannerProps {
  /** Current wallet balance in USD */
  available: number
  onTopupNow: () => void
}

/**
 * Destructive banner shown on the wallet page when the user was redirected
 * from checkout due to insufficient balance.
 *
 * Visible only when:
 * - URL has ?returnTo=checkout
 * - cart.pendingCheckout === true
 *
 * Shortfall is rounded UP to two decimals so we never tell the user to top up too little.
 */
export function InsufficientBalanceBanner({
  available,
  onTopupNow,
}: InsufficientBalanceBannerProps) {
  const { pendingCheckout, pendingCheckoutTotal } = useCart()

  if (!pendingCheckout || pendingCheckoutTotal === null) return null

  // Round up to 2 decimals
  const shortfall = Math.ceil(Math.max(0, pendingCheckoutTotal - available) * 100) / 100

  return (
    <Alert variant="destructive" className="flex items-start gap-3">
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
      <div className="flex-1">
        <AlertTitle>Insufficient balance</AlertTitle>
        <AlertDescription className="mt-1">
          Your cart total is {formatUSD(pendingCheckoutTotal.toFixed(2))} but your current balance
          is {formatUSD(available.toFixed(2))}. You need to top up at least{' '}
          <strong>{formatUSD(shortfall.toFixed(2))}</strong> to complete your order.
        </AlertDescription>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onTopupNow}
        className="shrink-0"
      >
        Top up now
      </Button>
    </Alert>
  )
}
