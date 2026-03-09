import { ShieldCheckIcon } from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import { defaultAvatars } from '@/data/shared-avatars'
import { defaultUpsell } from '@/data/shared-upsells'

export const avatars = defaultAvatars

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
    ...defaultUpsell,
    description:
      'Need bulk profiles or custom configurations? Contact us for volume discounts and dedicated support.',
  },
]
