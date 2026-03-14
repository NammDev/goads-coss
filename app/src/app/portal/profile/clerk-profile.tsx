'use client'

import { UserProfile } from '@clerk/nextjs'
import { SendIcon } from 'lucide-react'
import { TelegramForm } from './telegram-form'

interface ClerkProfileProps {
  telegramId: string
}

/** Clerk UserProfile with custom Telegram page integrated into sidebar */
export function ClerkProfile({ telegramId }: ClerkProfileProps) {
  return (
    <UserProfile
      routing="hash"
      appearance={{
        elements: {
          rootBox: 'w-full',
          cardBox: 'w-full shadow-none border rounded-lg',
          scrollBox: 'bg-transparent',
        },
      }}
    >
      <UserProfile.Page
        label="Telegram"
        labelIcon={<SendIcon className="size-4" />}
        url="telegram"
      >
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Telegram</h2>
            <p className="text-muted-foreground text-sm">
              Your Telegram username for order notifications and support.
            </p>
          </div>
          <TelegramForm telegramId={telegramId} />
        </div>
      </UserProfile.Page>
    </UserProfile>
  )
}
