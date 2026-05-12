'use client'

// Floating contact widget — adaptive theming via inverted semantic tokens
// `bg-foreground` + `text-background` flip per page scope:
//   Foreplay dark page (foreground=white, background=dark): white pill, dark icon → visible on dark
//   Marketing light page (foreground=dark, background=white): dark pill, white icon → visible on light
// Hover uses `bg-background/[0.08]` — subtle darken on light pill, subtle lighten on dark pill
// Brand-color icons (WhatsApp green, Telegram blue) work on both backgrounds

import { useState } from 'react'
import { MessageCircleIcon, XIcon, UserPlusIcon } from 'lucide-react'
import { TelegramLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
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
    iconClass: 'text-background',
    external: false,
  },
]

export function FloatingContactButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {/* Dropdown panel — inverted bg/text adapts to page scope */}
      <div
        className={cn(
          'pointer-events-auto min-w-60 origin-bottom-right overflow-hidden rounded-2xl bg-foreground text-background shadow-2xl ring-1 ring-background/10 transition-all duration-300',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0',
        )}
      >
        <div className="flex flex-col divide-y divide-background/[0.08]">
          {CONTACT_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex cursor-pointer items-center gap-3 px-5 py-3.5 font-sans text-[15px] font-medium leading-5 text-background no-underline transition-colors duration-200 hover:bg-background/[0.08]"
              >
                <Icon className={cn('size-5 shrink-0', item.iconClass)} />
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Main toggle — inverted pill always contrasts with page bg */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className={cn(
          'pointer-events-auto flex size-14 cursor-pointer items-center justify-center rounded-full bg-foreground text-background shadow-2xl ring-1 ring-background/10 transition-all duration-300 hover:bg-foreground/90 hover:ring-background/20',
          open && 'rotate-90',
        )}
      >
        {open
          ? <XIcon className="size-6" strokeWidth={2.25} />
          : <MessageCircleIcon className="size-6" strokeWidth={2.25} />
        }
      </button>
    </div>
  )
}
