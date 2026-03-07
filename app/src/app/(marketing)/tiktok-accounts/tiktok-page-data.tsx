import {
  ShieldCheckIcon,
  HeadphonesIcon,
} from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'

export { reviews } from '@/data/landing-reviews-pricing-faq'

export const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'DT',
    name: 'Duc Tran',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'ML',
    name: 'Mike Lee',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'SN',
    name: 'Sarah Nguyen',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
  },
]

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
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom Enterprise Solutions',
    description:
      'Need bulk TikTok accounts or custom configurations? Contact us for volume discounts and dedicated support.',
    price: 'Custom',
    features: ['Volume discounts', 'Dedicated manager', 'Custom configuration', 'Priority support'],
    buttonText: 'Contact Sales',
  },
]
