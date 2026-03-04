import {
  BuildingIcon,
  ShieldCheckIcon,
  FileTextIcon,
  UserIcon,
  GlobeIcon,
  SearchIcon,
  VideoIcon,
  WrenchIcon,
  HeadphonesIcon,
} from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'

/* ---------- Meta Agency Ad Accounts ---------- */

const agencyAccounts: ProductCategory = {
  icon: <ShieldCheckIcon className="size-5" />,
  title: 'Meta Agency Ad Accounts',
  badge: 'Best Seller',
  description:
    'Pre-approved ad accounts under verified agency setups with higher trust scores',
  products: [
    {
      name: 'Agency Account $250',
      badge: 'Verified',
      description: 'Agency ad account with $250 daily spend limit. Ideal for testing campaigns.',
      price: 35,
      unit: 'account',
      purchased: 4210,
    },
    {
      name: 'Agency Account Nolimit',
      badge: 'Verified',
      description: 'Agency ad account with no spending cap. Scale without restrictions.',
      price: 55,
      unit: 'account',
      purchased: 2890,
      isPopular: true,
    },
    {
      name: 'Agency Account + Page',
      badge: 'Verified',
      description: 'Agency ad account bundled with a Facebook Page — ready to run ads instantly.',
      price: 65,
      unit: 'bundle',
      purchased: 1540,
    },
    {
      name: 'Agency Account VIA',
      description: 'Via-type agency account for specific geo-targeted campaigns.',
      price: 45,
      unit: 'account',
      purchased: 980,
    },
  ],
}

/* ---------- Business Managers ---------- */

const businessManagers: ProductCategory = {
  icon: <BuildingIcon className="size-5" />,
  title: 'Business Managers',
  description:
    'Full BM setups for managing multiple ad accounts, pages, and team members',
  products: [
    {
      name: 'BM1',
      description: 'Business Manager with 1 ad account — ready for immediate use.',
      price: 29,
      unit: 'unit',
      purchased: 3242,
    },
    {
      name: 'BM3',
      description: 'Business Manager with 3 ad accounts — ideal for scaling campaigns.',
      price: 69,
      unit: 'unit',
      purchased: 1849,
      isPopular: true,
    },
    {
      name: 'BM5',
      description: 'Business Manager with 5 ad accounts — great for agencies.',
      price: 99,
      unit: 'unit',
      purchased: 1205,
    },
    {
      name: 'BM5 Nolimit',
      description: 'Business Manager with 5 ad accounts — no daily spending limits.',
      price: 149,
      unit: 'unit',
      purchased: 812,
    },
    {
      name: 'BM10',
      description: 'Business Manager with 10 ad accounts — maximum capacity.',
      price: 199,
      unit: 'unit',
      purchased: 456,
    },
  ],
}

/* ---------- Facebook Pages ---------- */

const facebookPages: ProductCategory = {
  icon: <FileTextIcon className="size-5" />,
  title: 'Facebook Pages',
  description: 'Aged and verified Facebook Pages for ad campaigns and brand presence',
  products: [
    {
      name: 'New Page',
      description: 'Fresh Facebook Page — clean history, ready to customize.',
      price: 5,
      unit: 'page',
      purchased: 6820,
    },
    {
      name: 'Aged Page (1+ year)',
      description: 'Facebook Page aged 1+ year with organic history. Better trust score for ads.',
      price: 15,
      unit: 'page',
      purchased: 3150,
      isPopular: true,
    },
    {
      name: 'Aged Page (3+ years)',
      description: 'Facebook Page aged 3+ years. Highest trust, best ad approval rates.',
      price: 25,
      unit: 'page',
      purchased: 1780,
    },
    {
      name: 'Marketplace Page',
      description: 'Page with Marketplace access enabled — ideal for e-commerce sellers.',
      price: 20,
      unit: 'page',
      purchased: 940,
    },
  ],
}

/* ---------- Facebook Profiles ---------- */

const facebookProfiles: ProductCategory = {
  icon: <UserIcon className="size-5" />,
  title: 'Facebook Profiles',
  description: 'Verified and aged profiles for running personal ad accounts and BMs',
  products: [
    {
      name: 'New Profile',
      description: 'Fresh Facebook Profile with basic setup — ready for use.',
      price: 8,
      unit: 'profile',
      purchased: 5430,
    },
    {
      name: 'Aged Profile (1+ year)',
      description: 'Aged profile with friends and activity history. Safer for ad operations.',
      price: 20,
      unit: 'profile',
      purchased: 2760,
      isPopular: true,
    },
    {
      name: 'Aged Profile (3+ years)',
      description: 'Heavily aged profile — best stability, highest trust score.',
      price: 35,
      unit: 'profile',
      purchased: 1120,
    },
    {
      name: 'Profile + BM1',
      badge: 'Bundle',
      description: 'Aged profile bundled with a BM1 — complete starter kit.',
      price: 45,
      unit: 'bundle',
      purchased: 890,
    },
  ],
}

/* ---------- Google Ads Accounts ---------- */

const googleAds: ProductCategory = {
  icon: <SearchIcon className="size-5" />,
  title: 'Google Whitelisted Accounts',
  badge: 'New',
  description: 'Pre-approved Google Ads accounts with whitelisted payment methods',
  products: [
    {
      name: 'Google Ads — Threshold',
      description: 'Google Ads account with spending threshold — run ads before paying.',
      price: 45,
      unit: 'account',
      purchased: 1890,
      isPopular: true,
    },
    {
      name: 'Google Ads — Invoice',
      description: 'Invoice-billing Google Ads account — pay monthly after spending.',
      price: 65,
      unit: 'account',
      purchased: 980,
    },
    {
      name: 'Google Ads — Agency',
      badge: 'Whitelisted',
      description: 'Whitelisted agency account with higher spending limits and support.',
      price: 99,
      unit: 'account',
      purchased: 560,
    },
  ],
}

/* ---------- TikTok Ads Accounts ---------- */

const tiktokAds: ProductCategory = {
  icon: <VideoIcon className="size-5" />,
  title: 'TikTok Verified Accounts',
  description: 'Verified TikTok advertising accounts for running campaigns at scale',
  products: [
    {
      name: 'TikTok Agency Account',
      badge: 'Verified',
      description: 'Verified TikTok Ads account under agency setup — stable and scalable.',
      price: 55,
      unit: 'account',
      purchased: 1340,
      isPopular: true,
    },
    {
      name: 'TikTok Personal Account',
      description: 'Personal TikTok Ads account — great for testing and small campaigns.',
      price: 30,
      unit: 'account',
      purchased: 2100,
    },
  ],
}

/* ---------- upsells ---------- */

export const pricingUpsells: UpsellItem[] = [
  {
    icon: <WrenchIcon className="size-5" />,
    title: 'Full Bulletproof Setup — 2 BM + 2 Profiles + Pages',
    description:
      'Complete ready-to-go bulletproof setup. Includes 2 verified BMs, 2 aged profiles, pages, pixel setup, domain verification, and full configuration.',
    price: '$350',
    features: ['2 Verified BMs', '2 Aged Profiles', 'Pages included', 'Pixel & domain setup'],
    buttonText: 'Buy Now',
  },
  {
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Enterprise — Custom Bulk Order',
    description:
      'Need 50+ accounts or a custom mix of products? Contact us for a tailored quote, dedicated account manager, and priority delivery.',
    price: 'Custom',
    features: ['Volume discounts', 'Dedicated manager', 'Custom mix', 'Priority support'],
    buttonText: 'Contact Sales',
  },
]

/* ---------- all categories ---------- */

export const pricingCategories: ProductCategory[] = [
  agencyAccounts,
  businessManagers,
  facebookPages,
  facebookProfiles,
  googleAds,
  tiktokAds,
]
