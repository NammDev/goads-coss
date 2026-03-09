import { ShieldCheckIcon, MessageSquareIcon } from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { defaultAvatars } from '@/data/shared-avatars'
import { defaultUpsell } from '@/data/shared-upsells'

export const avatars = defaultAvatars

export const bmCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'Business Manager',
    badge: 'Verified',
    description:
      'Meta-verified Business Managers with higher trust scores and better ad approval rates',
    products: [
      {
        name: 'BM1 Verified',
        badge: 'Verified',
        description:
          'Verified Business Manager with 1 ad account slot.',
        price: 80,
        purchased: 1523,
      },
      {
        name: 'BM3 Verified',
        badge: 'Verified',
        description:
          'Verified Business Manager with 3 ad account slots.',
        price: 180,
        purchased: 987,
        isPopular: true,
      },
      {
        name: 'BM5 Verified ($250 DSL)',
        badge: 'Verified',
        description:
          'Verified Business Manager with 5 ad accounts — $250 daily spend limit.',
        price: 320,
        purchased: 645,
      },
      {
        name: 'BM5 Verified (Unlimited DSL)',
        badge: 'Verified',
        description:
          'Verified Business Manager with 5 ad accounts — unlimited daily spend limit.',
        price: 390,
        purchased: 312,
      },
      {
        name: 'BM10 Verified ($250 DSL)',
        badge: 'Verified',
        description:
          'Verified Business Manager with 10 ad accounts — $250 daily spend limit.',
        price: 'contact',
        purchased: 178,
      },
      {
        name: 'BM10 Verified (Unlimited DSL)',
        badge: 'Verified',
        description:
          'Verified Business Manager with 10 ad accounts — unlimited daily spend limit.',
        price: 'contact',
        purchased: 120,
      },
      {
        name: 'BM50',
        badge: 'Enterprise',
        description:
          'Business Manager with 50 ad account slots — for large-scale operations.',
        price: 'contact',
        purchased: 45,
      },
      {
        name: 'BM100',
        badge: 'Enterprise',
        description:
          'Business Manager with 100 ad account slots — maximum enterprise capacity.',
        price: 'contact',
        purchased: 22,
      },
      {
        name: 'BM2500',
        badge: 'Enterprise',
        description:
          'Business Manager with 2500 ad account slots — ultimate scale for agencies.',
        price: 'contact',
        purchased: 8,
      },
    ],
  },
  {
    icon: <MessageSquareIcon className="size-5" />,
    title: 'WhatsApp Business API',
    description: 'Verified Business Managers with WhatsApp API integration',
    products: [
      {
        name: 'BM Verified + WhatsApp API (2,000 limit)',
        badge: 'WhatsApp',
        description:
          'Verified Business Manager with WhatsApp Business API — 2,000 message limit.',
        price: 280,
        purchased: 234,
      },
      {
        name: 'BM Verified + WhatsApp API (10,000 limit)',
        badge: 'WhatsApp',
        description:
          'Verified Business Manager with WhatsApp Business API — 10,000 message limit.',
        price: 1400,
        purchased: 89,
      },
    ],
  },
]

export const upsells: UpsellItem[] = [defaultUpsell]
