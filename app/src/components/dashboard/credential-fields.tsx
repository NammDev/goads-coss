'use client'

import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/dashboard/copy-button'
import { getColumnsForType } from '@/lib/validators/credential-schemas'
import type { ProductType } from '@/lib/validators/credential-schemas'

/** Service types that have no credentials — status tracked via order */
const SERVICE_TYPES: ProductType[] = ['blue_verification', 'unban']

type FieldRowProps = {
  label: string
  value: string
  compact?: boolean
}

function FieldRow({ label, value, compact }: FieldRowProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground min-w-24 shrink-0">{label}:</span>
        <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono flex-1 truncate">
          {value}
        </code>
        <CopyButton value={value} />
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</p>
      <div className="flex items-center gap-2 rounded-md border p-2">
        <code className="font-mono text-sm flex-1 truncate">{value}</code>
        <CopyButton value={value} />
      </div>
    </div>
  )
}

type CredentialFieldsProps = {
  productType: ProductType
  credentials?: Record<string, string>
  uid?: string
  /** Compact mode for order detail; full mode for product detail */
  compact?: boolean
  className?: string
}

export function CredentialFields({
  productType,
  credentials,
  uid,
  compact = false,
  className,
}: CredentialFieldsProps) {
  if (SERVICE_TYPES.includes(productType)) {
    return (
      <p className="text-muted-foreground text-sm italic">
        Status tracked via order — no credentials to display.
      </p>
    )
  }

  const columns = getColumnsForType(productType)
  const hasCredentials = credentials && Object.keys(credentials).length > 0

  if (!hasCredentials && !uid) {
    return (
      <p className="text-muted-foreground text-sm italic">No credentials available yet.</p>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {uid && (
        <FieldRow label="UID" value={uid} compact={compact} />
      )}
      {credentials && columns.map(({ key, label }) => {
        const value = credentials[key]
        if (!value) return null
        return <FieldRow key={key} label={label} value={value} compact={compact} />
      })}
      {/* Render any extra keys not in schema (for 'other' type) */}
      {credentials && columns.length === 0 &&
        Object.entries(credentials).map(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim()
          return <FieldRow key={key} label={label} value={value} compact={compact} />
        })
      }
    </div>
  )
}
