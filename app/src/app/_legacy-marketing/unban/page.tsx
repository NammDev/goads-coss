import type { Metadata } from "next"
import { ShieldCheckIcon, ClockIcon } from 'lucide-react'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import UnbanHeroCard from '@/components/shadcn-studio/blocks/unban-hero-card'
import { ProductPageTemplate } from '@/components/product-page-template'
import { CONTACT } from '@/data/contact-info'
import { avatars, unbanCategories } from '@/data/unban-page-data'

export const metadata: Metadata = {
  title: "Facebook Unban Service | Get Your Account Restored",
  description: "Professional Facebook account unban service. Restore disabled ad accounts, BMs, and profiles with expert support.",
}

export default function UnbanPage() {
  return (
    <ProductPageTemplate
      heroProps={{
        avatars,
        heading: "Professional Unban Services",
        subheading: (
          <>
            GoAds provides <strong>professional unban services for Facebook, Instagram, TikTok accounts and pages</strong>.
            Recover restricted or disabled assets quickly with support trusted by agencies and media buyers worldwide.
          </>
        ),
        primaryCta: { label: 'Request Service', href: '/unban#pricing' },
        secondaryCta: { label: 'Talk to Support', href: CONTACT.telegram.support },
        card1: (
          <StatisticsCard
            title="Success Rate"
            badgeContent="All recoveries"
            value="98%"
            changePercentage="+2.1%"
            icon={<ShieldCheckIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        ),
        card2: (
          <RatingsCard
            title="Turnaround"
            badgeContent="Avg. recovery time"
            value="< 24h"
            changePercentage={15.8}
            svg={<ClockIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        ),
        card3: <UnbanHeroCard className="sm:w-full sm:max-w-100" />,
      }}
      catalogCategories={unbanCategories}
      enterpriseCard={{
        title: 'Custom Recovery Solutions',
        description: 'Have a complex case? Contact us for a tailored recovery plan with dedicated support and priority handling.',
        features: ['Case assessment', 'Dedicated manager', 'Priority handling', '98% success rate'],
      }}
    />
  )
}
