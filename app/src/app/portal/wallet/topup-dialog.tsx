'use client'

import { useState, useTransition, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Loader2Icon, RefreshCwIcon, XCircleIcon, CheckCircle2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { formatUSD } from '@/lib/format-currency'
import { createTopupRequest, cancelTopupRequest } from '@/lib/actions/topup-actions'
import { useTopupStatusPolling } from '@/lib/hooks/use-topup-status-polling'

type DialogPhase =
  | 'idle'
  | 'creating'
  | 'awaiting_payment'
  | 'completed'
  | 'failed'
  | 'expired'
  | 'cancelled'

interface TopupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Pre-filled amount when redirected from checkout */
  initialAmount?: number
  onCompleted?: (newBalance: string) => void
}

function useCountdown(expiresAt: string | null) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0)

  useEffect(() => {
    if (!expiresAt) return
    const update = () => {
      const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
      setSecondsLeft(diff)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  return { secondsLeft, label: `${minutes}:${seconds.toString().padStart(2, '0')}` }
}

/**
 * Topup dialog with three phases:
 * 1. Amount form
 * 2. QR code + countdown (awaiting payment)
 * 3. Completed / failed / expired state
 */
export function TopupDialog({
  open,
  onOpenChange,
  initialAmount,
  onCompleted,
}: TopupDialogProps) {
  const [phase, setPhase] = useState<DialogPhase>('idle')
  const [amount, setAmount] = useState<string>(
    initialAmount ? initialAmount.toFixed(2) : '',
  )
  const [topupRequestId, setTopupRequestId] = useState<string | null>(null)
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const { secondsLeft, label: countdownLabel } = useCountdown(
    phase === 'awaiting_payment' ? expiresAt : null,
  )

  // Poll status while awaiting payment
  const { data: statusData, isPolling, refresh } = useTopupStatusPolling(
    phase === 'awaiting_payment' ? topupRequestId : null,
    { enabled: phase === 'awaiting_payment' },
  )

  // React to status changes from polling
  useEffect(() => {
    if (!statusData) return

    if (statusData.status === 'completed') {
      setPhase('completed')
      toast.success(`Wallet topped up! New balance: ${formatUSD(statusData.newBalance ?? '0')}`)
      onCompleted?.(statusData.newBalance ?? '0')
    } else if (statusData.status === 'failed') {
      setPhase('failed')
      toast.error('Payment failed. Please try again.')
    } else if (statusData.status === 'expired') {
      setPhase('expired')
    } else if (statusData.status === 'cancelled') {
      setPhase('cancelled')
      onOpenChange(false)
    }
  }, [statusData, onCompleted, onOpenChange])

  // Auto-expire when countdown hits 0
  useEffect(() => {
    if (phase === 'awaiting_payment' && secondsLeft === 0 && expiresAt) {
      setPhase('expired')
    }
  }, [phase, secondsLeft, expiresAt])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = parseFloat(amount)
    if (isNaN(parsed) || parsed <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    startTransition(async () => {
      setPhase('creating')
      const result = await createTopupRequest({ amount: parsed })

      if (!result.success) {
        setPhase('idle')
        toast.error(result.message)
        return
      }

      setTopupRequestId(result.topupRequestId)
      setQrCodeData(result.qrCodeData)
      setExpiresAt(result.expiresAt)
      setPhase('awaiting_payment')
    })
  }

  const handleCancel = () => {
    if (topupRequestId) {
      cancelTopupRequest({ topupRequestId }).catch(() => {})
    }
    resetAndClose()
  }

  const resetAndClose = () => {
    setPhase('idle')
    setTopupRequestId(null)
    setQrCodeData(null)
    setExpiresAt(null)
    onOpenChange(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && phase === 'awaiting_payment') {
      // Don't close while awaiting — user must explicitly cancel
      return
    }
    if (!open) resetAndClose()
    else onOpenChange(true)
  }

  const minTopup = Number(process.env.NEXT_PUBLIC_MIN_TOPUP_USD ?? 10)
  const maxTopup = Number(process.env.NEXT_PUBLIC_MAX_TOPUP_USD ?? 10000)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Top up wallet</DialogTitle>
          <DialogDescription>
            {phase === 'awaiting_payment'
              ? 'Scan the QR code with your banking app to complete the payment.'
              : 'Add funds to your wallet via Wise bank transfer.'}
          </DialogDescription>
        </DialogHeader>

        {/* Phase: Amount form */}
        {(phase === 'idle' || phase === 'creating') && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="topup-amount">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  id="topup-amount"
                  type="number"
                  step="0.01"
                  min={minTopup}
                  max={maxTopup}
                  placeholder={`${minTopup}.00`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  disabled={phase === 'creating'}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Min: {formatUSD(minTopup.toFixed(2))} · Max: {formatUSD(maxTopup.toFixed(2))}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={resetAndClose} disabled={phase === 'creating'}>
                Cancel
              </Button>
              <Button type="submit" disabled={phase === 'creating' || !amount}>
                {phase === 'creating' ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Generate QR code'
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Phase: Awaiting payment */}
        {phase === 'awaiting_payment' && qrCodeData && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-lg border p-3 bg-white">
                <QRCodeSVG value={qrCodeData} size={180} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Amount: <strong>{formatUSD(parseFloat(amount).toFixed(2))}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Expires in{' '}
                  <span className={secondsLeft < 60 ? 'text-destructive font-medium' : ''}>
                    {countdownLabel}
                  </span>
                </p>
              </div>
              {isPolling && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Loader2Icon className="size-3 animate-spin" />
                  Waiting for payment confirmation...
                </p>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={isPolling}
              >
                <RefreshCwIcon className="mr-1 size-3.5" />
                I&apos;ve paid
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Phase: Completed */}
        {phase === 'completed' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2Icon className="size-12 text-green-500" />
            <p className="text-center font-medium">Payment confirmed!</p>
            <p className="text-sm text-muted-foreground text-center">
              Your wallet has been topped up successfully.
            </p>
            <Button onClick={resetAndClose} className="w-full">
              Done
            </Button>
          </div>
        )}

        {/* Phase: Failed */}
        {phase === 'failed' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <XCircleIcon className="size-12 text-destructive" />
            <p className="text-center font-medium">Payment failed</p>
            <p className="text-sm text-muted-foreground text-center">
              The payment could not be processed. Please try again.
            </p>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={resetAndClose} className="flex-1">
                Close
              </Button>
              <Button onClick={() => setPhase('idle')} className="flex-1">
                Try again
              </Button>
            </div>
          </div>
        )}

        {/* Phase: Expired */}
        {phase === 'expired' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <XCircleIcon className="size-12 text-muted-foreground" />
            <p className="text-center font-medium">QR code expired</p>
            <p className="text-sm text-muted-foreground text-center">
              The payment window has expired. Please generate a new QR code.
            </p>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={resetAndClose} className="flex-1">
                Close
              </Button>
              <Button onClick={() => setPhase('idle')} className="flex-1">
                Try again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
