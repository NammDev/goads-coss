import { ShieldCheckIcon } from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { defaultAvatars } from '@/data/shared-avatars'
import { defaultUpsell } from '@/data/shared-upsells'

export const avatars = defaultAvatars

export const unbanCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'Unban Services',
    badge: 'Recovery',
    description:
      'Professional unban services for Facebook, Instagram, and TikTok accounts and pages',
    products: [
      {
        name: 'Unban Facebook Profile Service',
        badge: 'Facebook',
        description: 'Professional Facebook profile unban and recovery service.',
        price: 'contact',
        purchased: 567,
      },
      {
        name: 'Unban Facebook Page Service',
        badge: 'Facebook',
        description: 'Professional Facebook Page unban and recovery service.',
        price: 'contact',
        purchased: 423,
      },
      {
        name: 'Unban Instagram Profile Service',
        badge: 'Instagram',
        description: 'Professional Instagram profile unban and recovery service.',
        price: 'contact',
        purchased: 312,
      },
    ],
  },
]

export const unbanUpsells: UpsellItem[] = [
  {
    ...defaultUpsell,
    title: 'Custom Recovery Solutions',
    description:
      'Have a complex case? Contact us for a tailored recovery plan with dedicated support and priority handling.',
    features: ['Case assessment', 'Dedicated manager', 'Priority handling', '98% success rate'],
  },
]
