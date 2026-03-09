import { ClockIcon, ShieldCheckIcon, HeadphonesIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const salesBenefits: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ClockIcon, title: 'Response < 2 hours', description: 'Our team responds within 2 hours during business hours.' },
  { icon: ShieldCheckIcon, title: '7-Day Warranty', description: 'Every purchase comes with a full 7-day replacement warranty.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', description: 'Get a dedicated account manager for enterprise orders.' },
]
