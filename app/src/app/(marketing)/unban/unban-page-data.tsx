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
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom Recovery Solutions',
    description:
      'Have a complex case? Contact us for a tailored recovery plan with dedicated support and priority handling.',
    price: 'Custom',
    features: ['Case assessment', 'Dedicated manager', 'Priority handling', '98% success rate'],
    buttonText: 'Contact Sales',
  },
]
