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

/** Admin sidebar navigation — ordered by design spec */
export const adminNavGroups: NavGroup[] = [
  {
    items: [
      { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/admin' },
      { icon: ShoppingCartIcon, label: 'Orders', href: '/admin/orders', badge: '5' },
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
