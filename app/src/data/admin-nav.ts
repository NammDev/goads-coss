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
import { mockDeliveredItems } from '@/data/mock-delivered-items'

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

/** Build admin product sub-items grouped by type with delivered items count */
function buildAdminProductChildren(): NavSubItem[] {
  const countByType = new Map<ProductType, number>()
  for (const d of mockDeliveredItems) {
    const type = d.productType as ProductType
    countByType.set(type, (countByType.get(type) ?? 0) + 1)
  }

  return Array.from(countByType.entries()).map(([type, count]) => ({
    label: productTypeLabels[type],
    href: `/admin/products/${type}`,
    badge: String(count),
  }))
}

/** Admin sidebar navigation — ordered by design spec */
export const adminNavGroups: NavGroup[] = [
  {
    items: [
      { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/admin' },
      { icon: ShoppingCartIcon, label: 'Orders', href: '/admin/orders', badge: '5' },
      { icon: UsersIcon, label: 'Customers', href: '/admin/customers' },
      {
        icon: PackageIcon,
        label: 'Products',
        href: '/admin/products',
        children: buildAdminProductChildren(),
      },
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
