import type { Metadata } from "next"
import { LayersIcon, ShoppingBagIcon } from 'lucide-react'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import TikTokHeroCard from '@/components/shadcn-studio/blocks/tiktok-hero-card'
import { ProductPageTemplate } from '@/components/product-page-template'
import { CONTACT } from '@/data/contact-info'
import { avatars, tiktokCategories } from '@/data/tiktok-page-data'

export const metadata: Metadata = {
  title: "Buy TikTok Ad Accounts | Verified & Agency-Backed",
  description: "Get verified TikTok advertising accounts. Agency-backed, ready to scale with 7-day warranty and 24/7 support.",
}

export default function TikTokAccountsPage() {
  return (
    <ProductPageTemplate
      heroProps={{
        avatars,
        heading: "Buy Aged TikTok Accounts",
        subheading: (
          <>
            Stop worrying about unstable or restricted accounts.
            GoAds provides <strong>aged TikTok accounts ready for advertising, content growth, and scaling campaigns</strong>, trusted by agencies and media buyers worldwide.
          </>
        ),
        primaryCta: { label: 'Get Your TikTok Account', href: '/tiktok-accounts#pricing' },
        secondaryCta: { label: 'Talk to Support', href: CONTACT.telegram.support },
        card1: (
          <StatisticsCard
            title="Account Types"
            badgeContent="Shop · Ads · Channel"
            value="5 Types"
            changePercentage="+3"
            icon={<LayersIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        ),
        card2: (
          <RatingsCard
            title="Accounts Active"
            badgeContent="Currently live"
            value="987"
            changePercentage={31.4}
            svg={<ShoppingBagIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        ),
        card3: <TikTokHeroCard className="sm:w-full sm:max-w-100" />,
      }}
      catalogCategories={tiktokCategories}
      enterpriseCard={{ description: 'Need bulk TikTok accounts or custom configurations? Contact us for volume discounts and dedicated support.' }}
    />
  )
}
