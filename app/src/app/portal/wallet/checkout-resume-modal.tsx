'use client'

import { useRouter } from 'next/navigation'
import { ShoppingBagIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { formatUSD } from '@/lib/format-currency'

interface CheckoutResumeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newBalance: string
  cartTotal: number
}

/**
 * Modal shown after a successful topup when the user has a pending checkout.
 * Prompts the user to continue checkout or defer.
 *
 * "Continue checkout" navigates to /portal/checkout?resume=1 which auto-invokes checkoutCart().
 * "Later" closes the modal and preserves the cart + pendingCheckout flag.
 */
export function CheckoutResumeModal({
  open,
  onOpenChange,
  newBalance,
  cartTotal,
}: CheckoutResumeModalProps) {
  const router = useRouter()

  const handleContinue = () => {
    onOpenChange(false)
    router.push('/portal/checkout?resume=1')
  }

  const handleLater = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5 text-primary" />
            Ready to checkout?
          </DialogTitle>
          <DialogDescription className="space-y-1 pt-1">
            <span className="block">
              Your wallet has been topped up. New balance:{' '}
              <strong>{formatUSD(newBalance)}</strong>
            </span>
            <span className="block">
              Your pending order total is{' '}
              <strong>{formatUSD(cartTotal.toFixed(2))}</strong>.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleLater} className="w-full sm:w-auto">
            Later
          </Button>
          <Button onClick={handleContinue} className="w-full sm:w-auto">
            Continue checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
