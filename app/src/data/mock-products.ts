import type { ProductType as DBProductType } from '@/lib/validators/credential-schemas'

export type ProductType = DBProductType

/** Product type labels for display */
export const productTypeLabels: Record<ProductType, string> = {
  agency_account: 'Meta Agency Account',
  bm: 'Business Manager',
  profile: 'Facebook Profile',
  page: 'Facebook Page',
  google_agency: 'Google Whitelisted',
  tiktok_agency: 'TikTok Agency',
  tiktok_account: 'TikTok Account',
  blue_verification: 'Blue Verification',
  unban: 'Account Unban',
  other: 'Other',
}

export type MockProduct = {
  id: string
  name: string
  /** Matches productTypeEnum values */
  type: ProductType
  /** Price as string (matches DB numeric field) */
  price: string
  currency: string
  description: string
  /** -1 means unlimited */
  stock: number
}

export const mockProducts: MockProduct[] = [
  {
    id: 'prod-001',
    name: 'Meta Agency Account',
    type: 'agency_account',
    price: '120.00',
    currency: 'USD',
    description: 'Verified Meta Agency Account, ready to run ads immediately.',
    stock: 15,
  },
  {
    id: 'prod-002',
    name: 'Business Manager',
    type: 'bm',
    price: '80.00',
    currency: 'USD',
    description: 'Clean, unused Business Manager with high spend limit.',
    stock: 8,
  },
  {
    id: 'prod-003',
    name: 'BM Aged 2024',
    type: 'bm',
    price: '100.00',
    currency: 'USD',
    description: 'Aged Business Manager from 2024 with high trust score.',
    stock: 10,
  },
  {
    id: 'prod-004',
    name: 'Facebook Profile Warmed',
    type: 'profile',
    price: '25.00',
    currency: 'USD',
    description: 'Facebook Profile warmed up for 30 days, ready to create BM.',
    stock: 25,
  },
  {
    id: 'prod-005',
    name: 'Google Whitelisted Account',
    type: 'google_agency',
    price: '200.00',
    currency: 'USD',
    description: 'Whitelisted Google Ads account with unlimited spend.',
    stock: 5,
  },
  {
    id: 'prod-006',
    name: 'TikTok Agency Account',
    type: 'tiktok_agency',
    price: '150.00',
    currency: 'USD',
    description: 'TikTok Agency account ready to run ads.',
    stock: 3,
  },
  {
    id: 'prod-007',
    name: 'TikTok Ad Account',
    type: 'tiktok_account',
    price: '100.00',
    currency: 'USD',
    description: 'Business-verified TikTok Ads account, ready to run immediately.',
    stock: 7,
  },
  {
    id: 'prod-008',
    name: 'Blue Verification Badge',
    type: 'blue_verification',
    price: '250.00',
    currency: 'USD',
    description: 'Meta blue verification badge for pages and profiles.',
    stock: -1,
  },
  {
    id: 'prod-009',
    name: 'Account Unban Service',
    type: 'unban',
    price: '300.00',
    currency: 'USD',
    description: 'Professional account unban service for Facebook/Meta.',
    stock: -1,
  },
]
