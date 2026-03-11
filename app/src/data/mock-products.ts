export type ProductType = 'agency' | 'bm' | 'google' | 'tiktok' | 'asset' | 'profile'

export type MockProduct = {
  id: string
  name: string
  type: ProductType
  /** Price in VND */
  price: number
  description: string
  /** -1 means unlimited */
  stock: number
}

/** Product type labels for display */
export const productTypeLabels: Record<ProductType, string> = {
  agency: 'Meta Agency',
  bm: 'Business Manager',
  google: 'Google Whitelisted',
  tiktok: 'TikTok Verified',
  asset: 'Meta Assets',
  profile: 'Facebook Profile',
}

export const mockProducts: MockProduct[] = [
  {
    id: 'prod-001',
    name: 'Premium Setup',
    type: 'agency',
    price: 5_000_000,
    description: 'Meta Agency Account + BM full setup, includes support for launching the first campaign.',
    stock: -1,
  },
  {
    id: 'prod-002',
    name: 'Agency Account',
    type: 'agency',
    price: 2_000_000,
    description: 'Verified Meta Agency Account, ready to run ads immediately.',
    stock: 15,
  },
  {
    id: 'prod-003',
    name: 'Business Manager',
    type: 'bm',
    price: 1_000_000,
    description: 'Clean, unused Business Manager with high spend limit.',
    stock: 8,
  },
  {
    id: 'prod-004',
    name: 'Meta Assets Bundle',
    type: 'asset',
    price: 500_000,
    description: 'Bundle of Facebook Pages + Profiles for warming up ad accounts.',
    stock: 20,
  },
  {
    id: 'prod-005',
    name: 'Google Whitelisted',
    type: 'google',
    price: 3_000_000,
    description: 'Whitelisted Google Ads account with unlimited spend.',
    stock: 5,
  },
  {
    id: 'prod-006',
    name: 'TikTok Verified',
    type: 'tiktok',
    price: 2_500_000,
    description: 'Business-verified TikTok Ads account, ready to run ads immediately.',
    stock: 3,
  },
  {
    id: 'prod-007',
    name: 'BM Aged 2024',
    type: 'bm',
    price: 1_500_000,
    description: 'Aged Business Manager from 2024 with high trust score.',
    stock: 10,
  },
  {
    id: 'prod-008',
    name: 'Facebook Profile Warmed',
    type: 'profile',
    price: 300_000,
    description: 'Facebook Profile warmed up for 30 days, ready to create BM.',
    stock: 25,
  },
]
