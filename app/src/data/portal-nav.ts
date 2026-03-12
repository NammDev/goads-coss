import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  WalletIcon,
  WrenchIcon,
  UserIcon,
} from 'lucide-react'

import type { NavItem, NavSubItem } from '@/data/admin-nav'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'

/** Ordered product types for sidebar display */
const sidebarProductTypeOrder: ProductType[] = [
  'agency_account',
  'bm',
  'profile',
  'page',
  'google_agency',
  'tiktok_agency',
  'tiktok_account',
  'blue_verification',
  'unban',
]

/** Build product sub-items from real product counts */
function buildProductChildren(productCounts: Record<string, number>): NavSubItem[] {
  return sidebarProductTypeOrder
    .filter((type) => (productCounts[type] ?? 0) > 0)
    .map((type) => ({
      label: productTypeLabels[type],
      href: `/portal/products/${type}`,
      badge: String(productCounts[type]),
    }))
}

/** Build portal nav items — accepts product counts from server */
export function buildPortalNavItems(productCounts: Record<string, number>): NavItem[] {
  return [
    { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/portal' },
    { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
    { icon: WalletIcon, label: 'Wallet', href: '/portal/wallet' },
    {
      icon: PackageIcon,
      label: 'Products',
      href: '/portal/products',
      children: buildProductChildren(productCounts),
    },
    { icon: WrenchIcon, label: 'Tools', href: '/portal/tools' },
    { icon: UserIcon, label: 'Profile', href: '/portal/profile' },
  ]
}
