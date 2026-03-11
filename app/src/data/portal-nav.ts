import type { ComponentType } from 'react'

import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  WrenchIcon,
  UserIcon,
} from 'lucide-react'

export type PortalNavItem = {
  icon: ComponentType
  label: string
  href: string
}

/** Portal sidebar navigation — simplified for customers */
export const portalNavItems: PortalNavItem[] = [
  { icon: LayoutDashboardIcon, label: 'Dashboard', href: '/portal' },
  { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
  { icon: PackageIcon, label: 'Products', href: '/portal/products' },
  { icon: WrenchIcon, label: 'Tools', href: '/portal/tools' },
  { icon: UserIcon, label: 'Profile', href: '/portal/profile' },
]
