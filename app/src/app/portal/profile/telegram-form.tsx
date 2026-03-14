'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateTelegramId } from './telegram-action'

interface TelegramFormProps {
  telegramId: string
}

/** Inline form for updating Telegram username — used inside Clerk UserProfile custom page */
export function TelegramForm({ telegramId: initial }: TelegramFormProps) {
  const [value, setValue] = useState(initial)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await updateTelegramId(value.trim())
      if (result.success) {
        toast.success('Telegram username updated')
      } else {
        toast.error(result.error ?? 'Failed to update')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="telegramId">Username</Label>
        <Input
          id="telegramId"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="@username"
        />
      </div>
      <Button type="submit" disabled={saving || value.trim() === initial}>
        {saving ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}
