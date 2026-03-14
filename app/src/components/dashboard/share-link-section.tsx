'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CopyIcon, CheckIcon, LinkIcon, RefreshCwIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateShareToken, revokeShareToken } from '@/lib/actions/order-actions'

interface Props {
  orderId: string
  shareToken: string | null
}

/** Compact share link — renders as toolbar button(s), no Card wrapper */
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
      const result = await generateShareToken(orderId)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Share link generated')
      router.refresh()
    })
  }

  function handleRevoke() {
    if (!confirm('Revoke share link? Anyone with the current link will lose access.')) return
    startTransition(async () => {
      const result = await revokeShareToken(orderId)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Share link revoked')
      router.refresh()
    })
  }

  function handleRegenerate() {
    if (!confirm('Regenerate share link? The old link will stop working.')) return
    startTransition(async () => {
      const result = await generateShareToken(orderId)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Share link regenerated')
      router.refresh()
    })
  }

  if (!shareUrl) {
    return (
      <Button size="sm" onClick={handleGenerate} disabled={isPending}>
        <LinkIcon className="mr-1 size-4" />
        Generate Share Link
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex max-w-xs">
        <Input value={shareUrl} readOnly className="font-mono text-xs h-8 rounded-r-none" />
        <Button variant="outline" size="sm" className="rounded-l-none border-l-0" onClick={handleCopy} disabled={isPending}>
          {copied ? <CheckIcon className="size-3.5 text-green-500" /> : <CopyIcon className="size-3.5" />}
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isPending}>
        <RefreshCwIcon className="size-3.5" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleRevoke} disabled={isPending} className="text-destructive">
        <Trash2Icon className="size-3.5" />
      </Button>
    </div>
  )
}
