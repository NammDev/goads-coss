'use client'

import { useState, useTransition } from 'react'
import { KeyIcon, Trash2Icon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { revokeExtensionToken } from '@/lib/actions/extension-actions'

type TokenStatus = {
  hasToken: boolean
  id?: string
  lastUsedAt?: string | null
  expiresAt?: string
  createdAt?: string
}

/** Format date for display */
function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Never'
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const AUTH_STEPS = [
  'Install the extension and open Facebook',
  'Click "Sign in with GoAds" in the extension overlay',
  'Sign in with your GoAds account (same as this portal)',
  'Come back to Facebook — the extension connects automatically',
]

export function ExtensionTokenCard({ initial }: { initial: TokenStatus }) {
  const [status, setStatus] = useState(initial)
  const [showRevoke, setShowRevoke] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Revoke legacy token (transition period only)
  function handleRevoke() {
    if (!status.id) return
    startTransition(async () => {
      const res = await revokeExtensionToken(status.id!)
      if (!res.success) {
        toast.error(res.error)
        return
      }
      setStatus({ hasToken: false })
      setShowRevoke(false)
      toast.success('Legacy token revoked')
    })
  }

  return (
    <>
      {/* How it works — v2 Clerk auth */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <KeyIcon className="text-muted-foreground size-5" />
            <CardTitle className="text-lg">How to Connect</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            The extension uses your GoAds account — no tokens needed.
            Just sign in once and you&apos;re connected.
          </p>
          <ol className="space-y-2.5">
            {AUTH_STEPS.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Legacy token — show only if user still has one (transition period) */}
      {status.hasToken && (
        <Card className="border-dashed shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Legacy Token (deprecated)
              </CardTitle>
              <Badge variant="secondary">Will be removed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-xs">
              You have an old extension token. The extension now uses your GoAds
              account directly — this token is no longer needed.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="font-medium">{formatDate(status.createdAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Expires</span>
                <p className="font-medium">{formatDate(status.expiresAt)}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
              onClick={() => setShowRevoke(true)}
              disabled={isPending}
            >
              <Trash2Icon className="size-4" />
              Revoke Legacy Token
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Revoke confirmation dialog */}
      <Dialog open={showRevoke} onOpenChange={setShowRevoke}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Legacy Token?</DialogTitle>
            <DialogDescription>
              This will revoke your old extension token. The new sign-in method
              is not affected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRevoke(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevoke}
              disabled={isPending}
            >
              {isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
