'use client'

import { useState, useCallback } from 'react'

import { CopyIcon, CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CopyButtonProps = {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [value])

  return (
    <Button variant="ghost" size="icon" className={cn('size-8', className)} onClick={handleCopy}>
      {copied ? <CheckIcon className="size-4 text-green-600" /> : <CopyIcon className="size-4" />}
      <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  )
}
