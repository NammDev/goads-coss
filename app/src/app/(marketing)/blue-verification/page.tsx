import type { Metadata } from "next"
import { BadgeCheckIcon, GlobeIcon } from 'lucide-react'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import VerificationHeroCard from '@/components/shadcn-studio/blocks/verification-hero-card'
import { ProductPageTemplate } from '@/components/product-page-template'
import { CONTACT } from '@/data/contact-info'
import { avatars, verificationCategories } from '@/data/verification-page-data'

export const metadata: Metadata = {
  title: "Meta Blue Verification Service | Get Verified on Facebook",
  description: "Get Meta Blue Verification for your Facebook page or profile. Professional verification service with guaranteed results.",
}

export default function BlueVerificationPage() {
  return (
    <ProductPageTemplate
      heroProps={{
        avatars,
        heading: "Blue Badge Verification Services",
        subheading: (
          <>
            Get verified across major platforms.
            GoAds provides <strong>blue badge verification and business verification services</strong> for Facebook, Instagram, TikTok and Business Manager.
          </>
        ),
        primaryCta: { label: 'Request Verification', href: '/blue-verification#pricing' },
        secondaryCta: { label: 'Talk to Support', href: CONTACT.telegram.support },
        card1: (
          <StatisticsCard
            title="Platforms"
            badgeContent="Supported"
            value="3 Platforms"
            changePercentage="+1"
            icon={<GlobeIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        ),
        card2: (
          <RatingsCard
            title="Verified"
            badgeContent="Total verifications"
            value="1,500+"
            changePercentage={42.1}
            svg={<BadgeCheckIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        ),
        card3: <VerificationHeroCard className="sm:w-full sm:max-w-100" />,
      }}
      catalogCategories={verificationCategories}
      enterpriseCard={{
        title: 'Custom Verification Solutions',
        description: 'Need verification for multiple accounts or platforms? Contact us for volume discounts and dedicated support.',
        features: ['Multi-platform', 'Volume discounts', 'Dedicated manager', 'Priority processing'],
      }}
    />
  )
}
