import {
  UserIcon,
  BuildingIcon,
  FileTextIcon,
  VideoIcon,
  WrenchIcon,
  ShieldCheckIcon,
  HeadphonesIcon,
} from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'

/* ---------- Facebook Profiles ---------- */

const facebookProfiles: ProductCategory = {
  icon: <UserIcon className="size-5" />,
  title: 'Facebook Profiles',
  description:
    'If you need other types of Facebook profiles, feel free to contact us for custom options.',
  buttonText: 'Add to Cart',
  products: [
    { name: 'Asia Reinstated Aged Facebook Profile', price: 30 },
    { name: 'USA Reinstated Aged Facebook Profile', price: 40 },
    { name: 'Premium Asia Reinstated Facebook Profile', price: 40 },
    { name: 'Premium USA Reinstated Facebook Profile', price: 50 },
    { name: 'Asia Super Aged (7+ Years) Double Reinstated Profile', price: 95 },
    { name: 'USA Super Aged (7+ Years) Double Reinstated Profile', price: 110 },
  ],
}

/* ---------- Business Manager ---------- */

const businessManager: ProductCategory = {
  icon: <BuildingIcon className="size-5" />,
  title: 'Business Manager',
  description: 'Need a different BM setup? Contact us for custom configurations.',
  buttonText: 'Add to Cart',
  products: [
    { name: 'BM1 Verified', price: 80 },
    { name: 'BM3 Verified', price: 180, isPopular: true },
    { name: 'BM5 Verified ($250 DSL)', price: 320 },
    { name: 'BM5 Verified (Unlimited DSL)', price: 390 },
    { name: 'BM10 Verified ($250 DSL)', price: 'contact' },
    { name: 'BM10 Verified (Unlimited DSL)', price: 'contact' },
    { name: 'BM Verified WhatsApp API (250 limit)', price: 100 },
    { name: 'BM Verified WhatsApp API (2,000 limit)', price: 280 },
    { name: 'BM Verified WhatsApp API (10,000 limit)', price: 1400 },
  ],
}

/* ---------- Facebook Pages ---------- */

const facebookPages: ProductCategory = {
  icon: <FileTextIcon className="size-5" />,
  title: 'Facebook Pages',
  description: 'Need pages with different followers, niches, or history? Contact us.',
  buttonText: 'Add to Cart',
  products: [
    { name: 'Aged Reinstated Facebook Page', price: 35 },
    { name: '1,000–3,000 Follower Facebook Page', price: 45 },
    { name: '5,000 Follower Facebook Page', price: 65 },
    { name: '10,000 Follower Facebook Page', price: 110, isPopular: true },
    { name: 'Livestream Ads Ready Facebook Page', price: 200 },
    { name: 'Monetized Facebook Page (10,000 Followers)', price: 300 },
    { name: 'Verified Facebook Page (Blue Badge)', price: 600 },
  ],
}

/* ---------- TikTok Accounts ---------- */

const tiktokAccounts: ProductCategory = {
  icon: <VideoIcon className="size-5" />,
  title: 'TikTok Accounts',
  description: 'Looking for other TikTok assets or setups? Contact us.',
  buttonText: 'Add to Cart',
  products: [
    { name: 'Fresh TikTok Channel Account (0 Followers)', price: 60 },
    { name: 'TikTok Shop Info USA', price: 80 },
    { name: 'TikTok Ads Business Account (Verified for Ads)', price: 120, isPopular: true },
    { name: 'TikTok Affiliate Account (1,000+ Followers)', price: 180 },
    { name: 'TikTok Shop Info USA (Jumio Verified)', price: 400 },
  ],
}

/* ---------- Unban Services ---------- */

const unbanServices: ProductCategory = {
  icon: <WrenchIcon className="size-5" />,
  title: 'Unban Services',
  description:
    'If your case is not listed here, feel free to contact us for consultation.',
  buttonText: 'Request Service',
  products: [
    { name: 'Unban Facebook Profile Service', price: 'contact' },
    { name: 'Unban Facebook Page Service', price: 'contact' },
    { name: 'Unban Instagram Profile Service', price: 'contact' },
  ],
}

/* ---------- Blue Badge Verification ---------- */

const blueBadgeVerification: ProductCategory = {
  icon: <ShieldCheckIcon className="size-5" />,
  title: 'Blue Badge Verification',
  description: 'If your case is not listed here, contact us for consultation.',
  buttonText: 'Request Service',
  products: [
    { name: 'Business Manager Verification Service', price: 100 },
    { name: 'Facebook Profile Blue Badge Verification', price: 600 },
    { name: 'Instagram Profile Blue Badge Verification', price: 600 },
    { name: 'Facebook Page Blue Badge Verification', price: 600 },
    { name: 'Social Media Engagement Boost', price: 'contact' },
  ],
}

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

/* ---------- all categories ---------- */

export const pricingCategories: ProductCategory[] = [
  facebookProfiles,
  businessManager,
  facebookPages,
  tiktokAccounts,
  unbanServices,
  blueBadgeVerification,
]
