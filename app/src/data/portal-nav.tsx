import { HomeIcon, ShoppingCartIcon, WalletIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import Image from 'next/image'

import type { NavGroup } from '@/data/admin-nav'

/**
 * Portal (customer) nav.
 * Orders / Wallet use lucide icons. Product groups (BM, Profile, Page, Agency
 * Ad Account, TikTok) reuse the /portal/products?type= route (delivered items
 * by productType) with a live count badge, and each shows its own catalog logo
 * (same webp assets used by the pricing tabs). When the sidebar collapses to
 * icon-only, just the logo remains.
 */

/** Build a fixed-size image icon component from a /public logo (matches lucide size-4). */
function catalogIcon(src: string, alt: string): ComponentType {
  const Icon = () => (
    <Image
      src={src}
      alt={alt}
      width={34}
      height={34}
      className="size-[34px] shrink-0 rounded-[5px] object-contain"
    />
  )
  Icon.displayName = `CatalogIcon(${alt})`
  return Icon
}

// Section logos reused from the pricing catalog (see product-catalog-table-data).
const BmIcon = catalogIcon('/assets/BM.webp', 'BM')
const ProfileIcon = catalogIcon('/assets/PROFILES.webp', 'Profile')
const PageIcon = catalogIcon('/navbar/pages.webp', 'Page')
const AgencyIcon = catalogIcon('/assets/META.webp', 'Agency Ad Account')
const TiktokIcon = catalogIcon('/navbar/tiktok.webp', 'TikTok')

export function buildPortalNavGroups(productCounts: Record<string, number>): NavGroup[] {
  const badge = (type: string) => {
    const n = productCounts[type] ?? 0
    return n > 0 ? String(n) : undefined
  }

  return [
    {
      items: [
        { icon: HomeIcon, label: 'Home', href: '/portal' },
        { icon: ShoppingCartIcon, label: 'Orders', href: '/portal/orders' },
        { icon: WalletIcon, label: 'Wallet', href: '/portal/wallet' },
        // Product groups share one route (?type=) → instant client-side tab switch
        { icon: BmIcon, label: 'BM', href: '/portal/products?type=bm', badge: badge('bm') },
        { icon: ProfileIcon, label: 'Profile', href: '/portal/products?type=profile', badge: badge('profile') },
        { icon: PageIcon, label: 'Page', href: '/portal/products?type=page', badge: badge('page') },
        { icon: AgencyIcon, label: 'Agency Ad Account', href: '/portal/products?type=agency_account', badge: badge('agency_account') },
        { icon: TiktokIcon, label: 'TikTok', href: '/portal/products?type=tiktok_account', badge: badge('tiktok_account') },
      ],
    },
  ]
}
