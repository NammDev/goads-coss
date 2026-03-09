import { HeadphonesIcon } from 'lucide-react'
import type { UpsellItem } from '@/components/product-catalog'

import { profileCategories } from './profiles-page-data'
import { bmCategories } from './bm-page-data'
import { pageCategories } from './pages-page-data'
import { tiktokCategories } from './tiktok-page-data'
import { unbanCategories } from './unban-page-data'
import { verificationCategories } from './verification-page-data'

/** Aggregated product catalog for pricing page — derives from page-data files */
export const pricingCategories = [
  ...profileCategories,
  ...bmCategories,
  ...pageCategories,
  ...tiktokCategories,
  ...unbanCategories,
  ...verificationCategories,
]

/* ---------- upsells ---------- */

export const pricingUpsells: UpsellItem[] = [
  {
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom Enterprise Solutions',
    description:
      'Need a custom setup? Contact us directly for a tailored quote, dedicated account manager, and priority delivery.',
    price: 'Custom',
    features: ['Volume discounts', 'Dedicated manager', 'Custom configuration', 'Priority support'],
    buttonText: 'Contact Sales',
  },
]
