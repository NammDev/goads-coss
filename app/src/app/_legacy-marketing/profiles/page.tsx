import type { Metadata } from "next"
import { CalendarIcon, PackageCheckIcon } from 'lucide-react'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import ProfileHeroCard from '@/components/shadcn-studio/blocks/profile-hero-card'
import { ProductPageTemplate } from '@/components/product-page-template'
import { CONTACT } from '@/data/contact-info'
import { avatars, profileCategories } from '@/data/profiles-page-data'

export const metadata: Metadata = {
  title: "Buy Facebook Profiles | Aged & Verified Accounts",
  description: "Get aged, verified Facebook profiles for ad management. Multiple tiers available with 7-day warranty and instant delivery.",
}

export default function ProfilesPage() {
  return (
    <ProductPageTemplate
      heroProps={{
        avatars,
        heading: "Buy Verified Facebook Account",
        subheading: (
          <>
            Stop worrying about weak or newly created accounts.
            GoAds provides <strong>aged and verified Facebook profiles ready for advertising</strong>, trusted by agencies and media buyers worldwide.
            Each profile is aged, verified and covered by our <strong>7-day unlimited replacement warranty</strong>.
          </>
        ),
        primaryCta: { label: 'Get Your Profile Today', href: '/profiles#pricing' },
        secondaryCta: { label: 'Talk to Support', href: CONTACT.telegram.support },
        card1: (
          <StatisticsCard
            title="Account Age"
            badgeContent="Aged profiles"
            value="7+ Years"
            changePercentage="+100%"
            icon={<CalendarIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        ),
        card2: (
          <RatingsCard
            title="Profiles Sold"
            badgeContent="This month"
            value="1,842"
            changePercentage={24.5}
            svg={<PackageCheckIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        ),
        card3: <ProfileHeroCard className="sm:w-full sm:max-w-100" />,
      }}
      catalogCategories={profileCategories}
      enterpriseCard={{ description: 'Need bulk profiles or custom configurations? Contact us for volume discounts and dedicated support.' }}
    />
  )
}
