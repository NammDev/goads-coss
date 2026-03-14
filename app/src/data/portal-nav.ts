import {
  StoreIcon,
  ShoppingCartIcon,
  PackageIcon,
  WalletIcon,
  WrenchIcon,
  UserIcon,
  ShieldIcon,
  DatabaseIcon,
  SettingsIcon,
  PuzzleIcon,
} from 'lucide-react'

import type { NavItem, NavSubItem, NavGroup } from '@/data/admin-nav'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'
import { TOOL_CATEGORIES, getToolsByCategory } from '@/data/tools-registry'

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

/** Icons for tool category nav items */
const toolCategoryIcons: Record<string, typeof WrenchIcon> = {
  security: ShieldIcon,
  data: DatabaseIcon,
  utility: SettingsIcon,
}

/** Build tool category nav items for sidebar */
export function buildToolsNavItems(): NavItem[] {
  const categoryItems: NavItem[] = TOOL_CATEGORIES.map((cat) => {
    const tools = getToolsByCategory(cat.id)
    return {
      icon: toolCategoryIcons[cat.id] ?? WrenchIcon,
      label: cat.label,
      href: `/portal/tools`,
      children: tools.map((t): NavSubItem => ({
        label: t.title,
        href: `/portal/tools/${t.slug}`,
      })),
    }
  })

  // Extensions category
  categoryItems.push({
    icon: PuzzleIcon,
    label: 'Extensions',
    href: '/portal/tools/extensions',
    children: [
      { label: 'BM Invite Extension', href: '/portal/tools/extensions' },
    ],
  })

  return categoryItems
}

/** Build portal nav items — accepts product counts from server */
export function buildPortalNavItems(productCounts: Record<string, number>): NavItem[] {
  return [
    { icon: StoreIcon, label: 'Shop', href: '/portal' },
    { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
    { icon: WalletIcon, label: 'Wallet', href: '/portal/wallet' },
    {
      icon: PackageIcon,
      label: 'Products',
      href: '/portal/products',
      children: buildProductChildren(productCounts),
    },
    { icon: UserIcon, label: 'Profile', href: '/portal/profile' },
  ]
}

/** Build portal nav groups including tools group */
export function buildPortalNavGroups(productCounts: Record<string, number>): NavGroup[] {
  return [
    { items: buildPortalNavItems(productCounts) },
    { label: 'Tools', items: buildToolsNavItems() },
  ]
}
