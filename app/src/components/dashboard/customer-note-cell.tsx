'use client'

import { useRef, useState, useTransition } from 'react'
import { CheckIcon, Loader2Icon } from 'lucide-react'

import { updateCustomerNote } from '@/lib/actions/delivered-item-actions'
import { cn } from '@/lib/utils'

/**
 * Inline customer-editable note. Saves on blur (only when changed) via the
 * updateCustomerNote server action. Purely the customer's own scratch note.
 */
export function CustomerNoteCell({
  deliveredItemId,
  initialValue,
}: {
  deliveredItemId: string
  initialValue: string | null
}) {
  const [value, setValue] = useState(initialValue ?? '')
  const savedRef = useRef(initialValue ?? '')
  const [pending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  function handleBlur() {
    if (value === savedRef.current) return
    startTransition(async () => {
      const res = await updateCustomerNote(deliveredItemId, value)
      if (res.success) {
        savedRef.current = value
        setSaved(true)
        setTimeout(() => setSaved(false), 1500)
      } else {
        // Revert to last saved value on failure
        setValue(savedRef.current)
      }
    })
  }

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        rows={1}
        placeholder="Add note…"
        className={cn(
          'min-h-8 w-44 resize-y rounded-md border border-transparent bg-transparent px-2 py-1 text-sm',
          'hover:border-input focus:border-input focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring',
          'text-foreground placeholder:text-muted-foreground/60',
        )}
      />
      {pending && (
        <Loader2Icon className="text-muted-foreground absolute top-1.5 right-1.5 size-3.5 animate-spin" />
      )}
      {saved && !pending && (
        <CheckIcon className="absolute top-1.5 right-1.5 size-3.5 text-green-500" />
      )}
    </div>
  )
}
