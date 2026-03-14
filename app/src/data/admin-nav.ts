import type { ComponentType } from 'react'

import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
  WalletIcon,
  UserCogIcon,
  SettingsIcon,
} from 'lucide-react'

import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'

export type NavSubItem = {
  label: string
  href: string
  badge?: string
}

export type NavItem = {
  icon: ComponentType
  label: string
  href: string
  badge?: string
  children?: NavSubItem[]
}

export type NavGroup = {
  label?: string
  items: NavItem[]
  /** Only visible to super_admin role */
  superAdminOnly?: boolean
}

/** Ordered product types for admin sidebar */
const adminProductTypeOrder: ProductType[] = [
  'agency_account',
  'bm',
  'profile',
  'google_agency',
  'tiktok_agency',
  'tiktok_account',
  'blue_verification',
  'unban',
  'other',
]

/** Build admin product sub-items from real product counts */
function buildAdminProductChildren(productCounts: Record<string, number>): NavSubItem[] {
  return adminProductTypeOrder
    .filter((type) => (productCounts[type] ?? 0) > 0)
    .map((type) => ({
      label: productTypeLabels[type],
      href: `/admin/products/${type}`,
      badge: String(productCounts[type]),
    }))
}

/** Build admin sidebar nav groups — accepts product counts from server */
export function buildAdminNavGroups(productCounts: Record<string, number>): NavGroup[] {
  return [
    {
      items: [
        { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/admin' },
        { icon: ShoppingCartIcon, label: 'Orders', href: '/admin/orders' },
        { icon: UsersIcon, label: 'Customers', href: '/admin/customers' },
        { icon: PackageIcon, label: 'Products', href: '/admin/products' },
      ],
    },
    {
      label: 'Management',
      superAdminOnly: true,
      items: [
        { icon: WalletIcon, label: 'Finance', href: '/admin/finance' },
        { icon: UserCogIcon, label: 'Staff', href: '/admin/staff' },
        { icon: SettingsIcon, label: 'Settings', href: '/admin/settings' },
      ],
    },
  ]
}
