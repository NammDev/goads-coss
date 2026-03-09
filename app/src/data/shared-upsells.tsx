import { HeadphonesIcon } from 'lucide-react'
import type { UpsellItem } from '@/components/product-catalog'

/** Default enterprise upsell — shared across product pages (profiles / BM / TikTok pattern) */
export const defaultUpsell: UpsellItem = {
  icon: <HeadphonesIcon className="size-5" />,
  title: 'Custom Enterprise Solutions',
  description:
    'Need a custom setup? Contact us for volume discounts, a dedicated account manager, and priority delivery.',
  price: 'Custom',
  features: ['Volume discounts', 'Dedicated manager', 'Custom configuration', 'Priority support'],
  buttonText: 'Contact Sales',
}
