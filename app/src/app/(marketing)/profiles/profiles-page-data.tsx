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

export const profileCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'Facebook Profiles',
    badge: 'Verified',
    description:
      'Aged and verified Facebook profiles ready for advertising, trusted by agencies and media buyers worldwide',
    products: [
      {
        name: 'Asia Reinstated Aged Facebook Profile',
        badge: 'Asia',
        description: 'Reinstated aged profile from Asia region.',
        price: 30,
        purchased: 1842,
      },
      {
        name: 'USA Reinstated Aged Facebook Profile',
        badge: 'USA',
        description: 'Reinstated aged profile from USA region.',
        price: 40,
        purchased: 1356,
      },
      {
        name: 'Premium Asia Reinstated Facebook Profile',
        badge: 'Premium',
        description: 'Premium reinstated profile from Asia with higher trust score.',
        price: 40,
        purchased: 987,
        isPopular: true,
      },
      {
        name: 'Premium USA Reinstated Facebook Profile',
        badge: 'Premium',
        description: 'Premium reinstated profile from USA with higher trust score.',
        price: 50,
        purchased: 745,
      },
      {
        name: 'Asia Super Aged (7+ Years) Double Reinstated Profile',
        badge: 'Super Aged',
        description: 'Super aged 7+ year profile, double reinstated for maximum stability.',
        price: 95,
        purchased: 312,
      },
      {
        name: 'USA Super Aged (7+ Years) Double Reinstated Profile',
        badge: 'Super Aged',
        description: 'Super aged 7+ year USA profile, double reinstated for maximum stability.',
        price: 110,
        purchased: 198,
      },
    ],
  },
]

export const profileUpsells: UpsellItem[] = [
  {
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom Enterprise Solutions',
    description:
      'Need bulk profiles or custom configurations? Contact us for volume discounts and dedicated support.',
    price: 'Custom',
    features: ['Volume discounts', 'Dedicated manager', 'Custom configuration', 'Priority support'],
    buttonText: 'Contact Sales',
  },
]
