import {
  ShoppingCartIcon,
  WalletIcon,
  Building2Icon,
  UserIcon,
  FileTextIcon,
} from 'lucide-react'

import type { NavGroup } from '@/data/admin-nav'

/**
 * Portal (customer) nav — redesigned to 5 tabs only.
 * BM / Profile / Page reuse the /portal/products/[type] route (delivered items
 * by productType) and show a live count badge. Old tabs (Shop, Products index,
 * Community, Tools) are intentionally removed from the customer nav.
 */
export function buildPortalNavGroups(productCounts: Record<string, number>): NavGroup[] {
  const badge = (type: string) => {
    const n = productCounts[type] ?? 0
    return n > 0 ? String(n) : undefined
  }

  return [
    {
      items: [
        { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
        { icon: WalletIcon, label: 'Wallet', href: '/portal/wallet' },
        // BM/Profile/Page share one route (?type=) → instant client-side tab switch
        { icon: Building2Icon, label: 'BM', href: '/portal/products?type=bm', badge: badge('bm') },
        { icon: UserIcon, label: 'Profile', href: '/portal/products?type=profile', badge: badge('profile') },
        { icon: FileTextIcon, label: 'Page', href: '/portal/products?type=page', badge: badge('page') },
      ],
    },
  ]
}
