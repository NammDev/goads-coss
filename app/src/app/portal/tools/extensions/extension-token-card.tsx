'use client'

import { useState, useTransition } from 'react'
import {
  KeyIcon,
  CopyIcon,
  CheckIcon,
  Trash2Icon,
  RefreshCwIcon,
  Loader2Icon,
} from 'lucide-react'
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
import {
  generateExtensionToken,
  revokeExtensionToken,
} from '@/lib/actions/extension-actions'

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

export function ExtensionTokenCard({ initial }: { initial: TokenStatus }) {
  const [status, setStatus] = useState(initial)
  const [newToken, setNewToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showRevoke, setShowRevoke] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Generate token
  function handleGenerate() {
    startTransition(async () => {
      const res = await generateExtensionToken()
      if (!res.success) {
        toast.error(res.error)
        return
      }
      setNewToken(res.data.token)
      setStatus({
        hasToken: true,
        id: res.data.id,
        expiresAt: res.data.expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
      })
      toast.success('Token generated successfully')
    })
  }

  // Copy token to clipboard
  async function handleCopy() {
    if (!newToken) return
    await navigator.clipboard.writeText(newToken)
    setCopied(true)
    toast.success('Token copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  // Revoke token
  function handleRevoke() {
    if (!status.id) return
    startTransition(async () => {
      const res = await revokeExtensionToken(status.id!)
      if (!res.success) {
        toast.error(res.error)
        return
      }
      setStatus({ hasToken: false })
      setNewToken(null)
      setShowRevoke(false)
      toast.success('Token revoked')
    })
  }

  return (
    <>
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <KeyIcon className="text-muted-foreground size-5" />
              <CardTitle className="text-lg">Extension Token</CardTitle>
            </div>
            {status.hasToken ? (
              <Badge className="border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </Badge>
            ) : (
              <Badge variant="secondary">No Token</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Token just generated — show once */}
          {newToken && (
            <div className="bg-muted rounded-lg border p-3">
              <p className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                Copy this token now — it won&apos;t be shown again.
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-black/5 px-2 py-1 font-mono text-xs dark:bg-white/5">
                  {newToken}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 gap-1.5"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          )}

          {/* Token info */}
          {status.hasToken && !newToken && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="font-medium">{formatDate(status.createdAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Expires</span>
                <p className="font-medium">{formatDate(status.expiresAt)}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Last used</span>
                <p className="font-medium">{formatDate(status.lastUsedAt)}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="gap-2"
              onClick={handleGenerate}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : status.hasToken ? (
                <RefreshCwIcon className="size-4" />
              ) : (
                <KeyIcon className="size-4" />
              )}
              {status.hasToken ? 'Regenerate Token' : 'Generate Token'}
            </Button>
            {status.hasToken && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                onClick={() => setShowRevoke(true)}
                disabled={isPending}
              >
                <Trash2Icon className="size-4" />
                Revoke
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Revoke confirmation dialog */}
      <Dialog open={showRevoke} onOpenChange={setShowRevoke}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Extension Token?</DialogTitle>
            <DialogDescription>
              The extension will be disconnected immediately and you&apos;ll need
              to generate a new token to use it again.
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
              {isPending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
              Revoke Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
