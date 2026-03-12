'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CopyableCellProps = {
  value: string | undefined
  className?: string
}

export function CopyableCell({ value, className }: CopyableCellProps) {
  const [copied, setCopied] = useState(false)

  if (!value) return <span className="text-muted-foreground">—</span>

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'group inline-flex items-center gap-1.5 font-mono text-sm',
        'hover:text-primary transition-colors cursor-pointer',
        className
      )}
      title="Click to copy"
    >
      <span className="truncate max-w-[200px]">{value}</span>
      {copied ? (
        <CheckIcon className="size-3.5 text-green-500 shrink-0" />
      ) : (
        <CopyIcon className="size-3.5 opacity-0 group-hover:opacity-50 shrink-0" />
      )}
    </button>
  )
}
