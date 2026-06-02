// Data for the floating contact widget (bottom-left CalendarPopup).
// Founder card + 3 channel pills (Telegram/Discord/Email) + 2 CTAs.
// Replaces the older date-picker layout — same UI rhythm, contact-first content.

import type { ReactNode } from "react"
import { CONTACT } from "@/data/contact-info"

export const actionPlanFounder = {
  name: "Justin Bui",
  role: "Founder & CEO @ GoAds",
  avatarSrc: "/assets/solutions_test1_avt.webp",
  avatarAlt: "Justin Bui — Founder & CEO of GoAds",
}

export const actionPlanCopy = {
  cardTitle: "Talk to us — we're online",
  cardDescription:
    "Pick your channel for a quick chat, or book a call for a deeper conversation about scaling your ad accounts.",
  primaryCta: "Book a Call",
  primaryHref: "/book-demo",
  secondaryCta: "Start Free Trial",
  secondaryHref: "/sign-up",
}

export interface ContactChannel {
  label: string
  href: string
  icon: ReactNode
}

// Inline SVG icons — sized 20×20, currentColor stroke (matches AvatarOnline weight).
const TelegramIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
)

const DiscordIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const EmailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m3 8 9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const contactChannels: ContactChannel[] = [
  { label: "Telegram", href: CONTACT.telegram.officialWithMessage, icon: TelegramIcon },
  { label: "Discord", href: CONTACT.discord, icon: DiscordIcon },
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: EmailIcon },
]
