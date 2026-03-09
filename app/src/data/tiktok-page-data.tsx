import { ShieldCheckIcon } from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { defaultAvatars } from '@/data/shared-avatars'
import { defaultUpsell } from '@/data/shared-upsells'

export const avatars = defaultAvatars

export const tiktokCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'TikTok Accounts',
    badge: 'Verified',
    description:
      'Aged TikTok accounts ready for advertising, content growth, and scaling campaigns',
    products: [
      {
        name: 'Fresh TikTok Channel Account (0 Followers)',
        badge: 'Channel',
        description: 'Fresh TikTok channel account ready for content creation.',
        price: 60,
        purchased: 1245,
      },
      {
        name: 'TikTok Shop Info USA',
        badge: 'Shop',
        description: 'TikTok Shop account with USA business info.',
        price: 80,
        purchased: 987,
        isPopular: true,
      },
      {
        name: 'TikTok Ads Business Account (Verified for Ads)',
        badge: 'Ads',
        description: 'Verified TikTok business account ready for ad campaigns.',
        price: 120,
        purchased: 756,
      },
      {
        name: 'TikTok Affiliate Account (1,000+ Followers)',
        badge: 'Affiliate',
        description: 'TikTok affiliate account with 1,000+ real followers.',
        price: 180,
        purchased: 432,
      },
      {
        name: 'TikTok Shop Info USA (Jumio Verified)',
        badge: 'Jumio',
        description: 'TikTok Shop account with Jumio identity verification.',
        price: 400,
        purchased: 198,
      },
    ],
  },
]

export const tiktokUpsells: UpsellItem[] = [
  {
    ...defaultUpsell,
    description:
      'Need bulk TikTok accounts or custom configurations? Contact us for volume discounts and dedicated support.',
  },
]
