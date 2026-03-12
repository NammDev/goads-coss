'use client'

import { useState, useTransition } from 'react'
import { PlusCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

import { topupBalance } from '@/lib/actions/wallet-actions'
import { formatUSD } from '@/lib/format-currency'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TopupDialogProps {
  customerId: string
  currentBalance: string
}

export function TopupDialog({ customerId, currentBalance }: TopupDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('customerId', customerId)

    startTransition(async () => {
      const result = await topupBalance(formData)
      if (result.success) {
        toast.success(`Balance updated to ${formatUSD(result.newBalance)}`)
        setOpen(false)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircleIcon className="mr-1 size-4" />
          Topup
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Topup Balance</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground text-sm">
          Current balance: <span className="text-foreground font-semibold">{formatUSD(currentBalance)}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              max="999999"
              step="0.01"
              placeholder="0.00"
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">
              Note <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <textarea
              id="note"
              name="note"
              rows={2}
              placeholder="Reason for topup..."
              disabled={isPending}
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Processing...' : 'Confirm Topup'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
