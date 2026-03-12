import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  WrenchIcon,
  UserIcon,
} from 'lucide-react'

import type { NavItem, NavSubItem } from '@/data/admin-nav'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'
import { getDeliveredItemsForCustomer } from '@/data/mock-delivered-items'

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

/** Build product sub-items filtered by customer's delivered items */
function buildProductChildren(customerId: string): NavSubItem[] {
  const items = getDeliveredItemsForCustomer(customerId)

  // Count items per product type
  const countByType = new Map<ProductType, number>()
  for (const item of items) {
    const type = item.productType as ProductType
    countByType.set(type, (countByType.get(type) ?? 0) + 1)
  }

  // Only show types that have items, in defined order
  return sidebarProductTypeOrder
    .filter((type) => countByType.has(type))
    .map((type) => ({
      label: productTypeLabels[type],
      href: `/portal/products/${type}`,
      badge: String(countByType.get(type)!),
    }))
}

/** Build portal nav items for a specific customer */
export function buildPortalNavItems(customerId: string): NavItem[] {
  return [
    { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/portal' },
    { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
    {
      icon: PackageIcon,
      label: 'Products',
      href: '/portal/products',
      children: buildProductChildren(customerId),
    },
    { icon: WrenchIcon, label: 'Tools', href: '/portal/tools' },
    { icon: UserIcon, label: 'Profile', href: '/portal/profile' },
  ]
}
