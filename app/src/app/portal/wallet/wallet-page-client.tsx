'use client'

import { useState } from 'react'
import { WalletIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { InsufficientBalanceBanner } from './insufficient-balance-banner'
import { TopupDialog } from './topup-dialog'
import { CheckoutResumeModal } from './checkout-resume-modal'
import { useCart } from '@/lib/cart-context'

interface WalletPageClientProps {
  returnToCheckout: boolean
  balance: number
}

/**
 * Client-side portion of the wallet page.
 * Handles: insufficient balance banner, topup dialog, checkout resume modal.
 */
export function WalletPageClient({ returnToCheckout, balance }: WalletPageClientProps) {
  const { pendingCheckout, pendingCheckoutTotal } = useCart()
  const [topupOpen, setTopupOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [newBalance, setNewBalance] = useState<string | null>(null)

  // Pre-fill the topup dialog with the shortfall when coming from checkout
  const shortfall =
    pendingCheckout && pendingCheckoutTotal !== null
      ? Math.ceil(Math.max(0, pendingCheckoutTotal - balance) * 100) / 100
      : undefined

  const handleTopupCompleted = (completedBalance: string) => {
    setNewBalance(completedBalance)
    setTopupOpen(false)
    // Show resume modal if there's a pending checkout
    if (pendingCheckout && pendingCheckoutTotal !== null) {
      setResumeOpen(true)
    }
  }

  return (
    <>
      {/* Insufficient balance banner — only when redirected from checkout */}
      {returnToCheckout && (
        <InsufficientBalanceBanner
          available={balance}
          onTopupNow={() => setTopupOpen(true)}
        />
      )}

      {/* Top up button — always visible */}
      {!returnToCheckout && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTopupOpen(true)}
          >
            <WalletIcon className="mr-2 size-4" />
            Top up
          </Button>
        </div>
      )}

      {/* Topup dialog */}
      <TopupDialog
        open={topupOpen}
        onOpenChange={setTopupOpen}
        initialAmount={shortfall}
        onCompleted={handleTopupCompleted}
      />

      {/* Resume modal — shown after topup when pendingCheckout is true */}
      {newBalance && pendingCheckoutTotal !== null && (
        <CheckoutResumeModal
          open={resumeOpen}
          onOpenChange={setResumeOpen}
          newBalance={newBalance}
          cartTotal={pendingCheckoutTotal}
        />
      )}
    </>
  )
}
