import { ShieldCheckIcon } from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { defaultAvatars } from '@/data/shared-avatars'
import { defaultUpsell } from '@/data/shared-upsells'

export const avatars = defaultAvatars

export const pageCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'Facebook Pages',
    badge: 'Ads Ready',
    description:
      'Aged and reinstated Facebook Pages ready for advertising. Change name, branding, and assets freely.',
    products: [
      {
        name: 'Aged Reinstated Facebook Page',
        badge: 'Aged',
        description: 'Reinstated aged Facebook Page ready for ads.',
        price: 35,
        purchased: 2134,
      },
      {
        name: '1,000–3,000 Follower Facebook Page',
        badge: 'Followers',
        description: 'Facebook Page with 1K-3K real followers.',
        price: 45,
        purchased: 1567,
        isPopular: true,
      },
      {
        name: '5,000 Follower Facebook Page',
        badge: 'Followers',
        description: 'Facebook Page with 5K real followers.',
        price: 65,
        purchased: 1023,
      },
      {
        name: '10,000 Follower Facebook Page',
        badge: 'Followers',
        description: 'Facebook Page with 10K real followers.',
        price: 110,
        purchased: 678,
      },
      {
        name: 'Livestream Ads Ready Facebook Page',
        badge: 'Livestream',
        description: 'Facebook Page enabled for livestream advertising.',
        price: 200,
        purchased: 234,
      },
      {
        name: 'Monetized Facebook Page (10,000 Followers)',
        badge: 'Monetized',
        description: 'Monetized Facebook Page with 10K followers.',
        price: 300,
        purchased: 145,
      },
      {
        name: 'Verified Facebook Page (Blue Badge)',
        badge: 'Verified',
        description: 'Blue badge verified Facebook Page.',
        price: 600,
        purchased: 89,
      },
    ],
  },
]

export const pageUpsells: UpsellItem[] = [
  {
    ...defaultUpsell,
    description:
      'Need bulk pages or custom configurations? Contact us for volume discounts and dedicated support.',
    features: ['Volume discounts', 'Dedicated manager', 'Custom branding', 'Priority support'],
  },
]
