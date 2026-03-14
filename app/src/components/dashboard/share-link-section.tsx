'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CopyIcon, CheckIcon, LinkIcon, RefreshCwIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { generateShareToken, revokeShareToken } from '@/lib/actions/order-actions'

interface Props {
  orderId: string
  shareToken: string | null
}

export function ShareLinkSection({ orderId, shareToken }: Props) {
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const shareUrl = shareToken
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${shareToken}`
    : null

  function handleCopy() {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleGenerate() {
    startTransition(async () => {
      await generateShareToken(orderId)
      router.refresh()
    })
  }

  function handleRevoke() {
    if (!confirm('Revoke share link? Anyone with the current link will lose access.')) return
    startTransition(async () => {
      await revokeShareToken(orderId)
      router.refresh()
    })
  }

  function handleRegenerate() {
    if (!confirm('Regenerate share link? The old link will stop working.')) return
    startTransition(async () => {
      await generateShareToken(orderId)
      router.refresh()
    })
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <LinkIcon className="size-4" />
          <span className="text-lg font-semibold">Share Link</span>
        </div>
      </CardHeader>
      <CardContent>
        {shareUrl ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={handleCopy} disabled={isPending}>
                {copied ? <CheckIcon className="size-4 text-green-500" /> : <CopyIcon className="size-4" />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isPending}>
                <RefreshCwIcon className="mr-1 size-3.5" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={handleRevoke} disabled={isPending} className="text-destructive">
                <Trash2Icon className="mr-1 size-3.5" />
                Revoke
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={handleGenerate} disabled={isPending}>
            <LinkIcon className="mr-1 size-4" />
            Generate Share Link
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
