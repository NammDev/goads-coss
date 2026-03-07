import {
  BadgeCheckIcon,
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

export const verificationCategories: ProductCategory[] = [
  {
    icon: <BadgeCheckIcon className="size-5" />,
    title: 'Blue Badge Verification',
    badge: 'Premium',
    description:
      'Official blue badge verification services for Facebook, Instagram, and Business Manager',
    products: [
      {
        name: 'Business Manager Verification Service',
        badge: 'BM',
        description: 'Official Meta Business Manager verification service.',
        price: 100,
        purchased: 890,
        isPopular: true,
      },
      {
        name: 'Facebook Profile Blue Badge Verification',
        badge: 'Facebook',
        description: 'Official Facebook profile blue badge verification.',
        price: 600,
        purchased: 345,
      },
      {
        name: 'Instagram Profile Blue Badge Verification',
        badge: 'Instagram',
        description: 'Official Instagram profile blue badge verification.',
        price: 600,
        purchased: 312,
      },
      {
        name: 'Facebook Page Blue Badge Verification',
        badge: 'Page',
        description: 'Official Facebook Page blue badge verification.',
        price: 600,
        purchased: 278,
      },
      {
        name: 'Social Media Engagement Boost',
        badge: 'Engagement',
        description: 'Likes, followers, comments, and reviews boost service.',
        price: 'contact',
        purchased: 567,
      },
    ],
  },
]

export const verificationUpsells: UpsellItem[] = [
  {
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom Verification Solutions',
    description:
      'Need verification for multiple accounts or platforms? Contact us for volume discounts and dedicated support.',
    price: 'Custom',
    features: ['Multi-platform', 'Volume discounts', 'Dedicated manager', 'Priority processing'],
    buttonText: 'Contact Sales',
  },
]
