import type { Metadata } from "next"
import { UsersIcon, TrendingUpIcon } from 'lucide-react'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import PageHeroCard from '@/components/shadcn-studio/blocks/page-hero-card'
import { ProductPageTemplate } from '@/components/product-page-template'
import { CONTACT } from '@/data/contact-info'
import { avatars, pageCategories } from '@/data/pages-page-data'

export const metadata: Metadata = {
  title: "Buy Facebook Pages | Aged & Ready for Ads",
  description: "Purchase aged Facebook Pages ready for advertising. Pre-warmed, verified, with 7-day replacement warranty.",
}

export default function PagesPage() {
  return (
    <ProductPageTemplate
      heroProps={{
        avatars,
        heading: "Buy Aged Facebook Pages Ready for Ads",
        subheading: (
          <>
            GoAds provides <strong>aged and reinstated Facebook Pages ready for advertising</strong>.
            Change name, branding, and assets freely, trusted by agencies and media buyers worldwide.
          </>
        ),
        primaryCta: { label: 'Get Your Page Today', href: '/pages#pricing' },
        secondaryCta: { label: 'Talk to Support', href: CONTACT.telegram.support },
        card1: (
          <StatisticsCard
            title="Followers"
            badgeContent="Avg. per page"
            value="10K+"
            changePercentage="+52%"
            icon={<UsersIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        ),
        card2: (
          <RatingsCard
            title="Pages Delivered"
            badgeContent="All time"
            value="2,134"
            changePercentage={18.3}
            svg={<TrendingUpIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        ),
        card3: <PageHeroCard className="sm:w-full sm:max-w-100" />,
      }}
      catalogCategories={pageCategories}
      enterpriseCard={{
        description: 'Need bulk pages or custom configurations? Contact us for volume discounts and dedicated support.',
        features: ['Volume discounts', 'Dedicated manager', 'Custom branding', 'Priority support'],
      }}
    />
  )
}
