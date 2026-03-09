'use client'

import { useState } from 'react'
import { MessageCircleIcon, XIcon, UserPlusIcon } from 'lucide-react'
import { TelegramLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/data/contact-info'

const CONTACT_ITEMS = [
  {
    label: 'WhatsApp',
    href: CONTACT.whatsapp.withMessage,
    icon: WhatsAppLogo,
    iconClass: 'text-[#25D366]',
    external: true,
  },
  {
    label: 'Telegram',
    href: CONTACT.telegram.officialWithMessage,
    icon: TelegramLogo,
    iconClass: 'text-[#26A5E4]',
    external: true,
  },
  {
    label: 'Sign up now',
    href: '/talk-to-sales',
    icon: UserPlusIcon,
    iconClass: 'text-primary',
    external: false,
  },
]

export function FloatingContactButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {/* Dropdown panel */}
      <div
        className={cn(
          'min-w-56 origin-bottom-right overflow-hidden rounded-lg bg-background shadow-xl transition-all duration-300',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0',
        )}
      >
        <div className="flex flex-col divide-y divide-border/60">
          {CONTACT_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex cursor-pointer items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-primary/10"
              >
                <Icon className={cn('size-6 shrink-0', item.iconClass)} />
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Main toggle button */}
      <Button
        size="icon"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className={cn(
          'btn-mirror-sweep btn-secondary size-14 cursor-pointer rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl',
          open && 'rotate-90',
        )}
      >
        {open
          ? <XIcon className="size-6" />
          : <MessageCircleIcon className="size-6" />
        }
      </Button>
    </div>
  )
}
