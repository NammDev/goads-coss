import {
  StoreIcon,
  ShoppingCartIcon,
  PackageIcon,
  WalletIcon,
  WrenchIcon,
  UserIcon,
  StarIcon,
  PuzzleIcon,
  MessagesSquareIcon,
} from 'lucide-react'

import type { NavItem, NavSubItem, NavGroup } from '@/data/admin-nav'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'
import { TOOLS } from '@/data/tools-registry'

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

/** Build tool nav items: Popular Tools + All Tools */
export function buildToolsNavItems(): NavItem[] {
  const popularTools = TOOLS.filter((t) => t.featured)
  const allTools = TOOLS

  return [
    {
      icon: PuzzleIcon,
      label: 'Extensions',
      href: '/portal/tools/extensions',
      alwaysOpen: true,
      children: [
        { label: 'BM Invite Extension', href: '/portal/tools/extensions' },
      ],
    },
    {
      icon: StarIcon,
      label: 'Popular Tools',
      href: '/portal/tools',
      alwaysOpen: true,
      children: popularTools.map((t): NavSubItem => ({
        label: t.title,
        href: t.href || `/portal/tools/${t.slug}`,
      })),
    },
    {
      icon: WrenchIcon,
      label: 'All Tools',
      href: '#all-tools',
      children: allTools
        .filter((t) => !t.featured)
        .map((t): NavSubItem => ({
          label: t.title,
          href: t.href || `/portal/tools/${t.slug}`,
        })),
    },
  ]
}

/** Build portal nav items — accepts product counts from server */
export function buildPortalNavItems(productCounts: Record<string, number>): NavItem[] {
  return [
    { icon: StoreIcon, label: 'Shop', href: '/portal' },
    { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
    { icon: PackageIcon, label: 'Products', href: '/portal/products' },
    { icon: MessagesSquareIcon, label: 'Community', href: '/portal/community' },
  ]
}

/** Build portal nav groups including tools group */
export function buildPortalNavGroups(productCounts: Record<string, number>): NavGroup[] {
  return [
    { items: buildPortalNavItems(productCounts) },
    { label: 'Tools', items: buildToolsNavItems() },
  ]
}
