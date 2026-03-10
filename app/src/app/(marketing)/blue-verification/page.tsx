import type { Metadata } from "next"
import { BadgeCheckIcon, GlobeIcon } from 'lucide-react'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import VerificationHeroCard from '@/components/shadcn-studio/blocks/verification-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { CONTACT } from '@/data/contact-info'
import { avatars, verificationCategories } from '@/data/verification-page-data'
import { reviews } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

export const metadata: Metadata = {
  title: "Meta Blue Verification Service | Get Verified on Facebook",
  description: "Get Meta Blue Verification for your Facebook page or profile. Professional verification service with guaranteed results.",
}

export default function BlueVerificationPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Blue Badge Verification Services"
        subheading={
          <>
            Get verified across major platforms.
            GoAds provides <strong>blue badge verification and business verification services</strong> for Facebook, Instagram, TikTok and Business Manager.
          </>
        }
        primaryCta={{ label: 'Request Verification', href: '/blue-verification#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: CONTACT.telegram.support }}
        card1={
          <StatisticsCard
            title="Platforms"
            badgeContent="Supported"
            value="3 Platforms"
            changePercentage="+1"
            icon={<GlobeIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        }
        card2={
          <RatingsCard
            title="Verified"
            badgeContent="Total verifications"
            value="1,500+"
            changePercentage={42.1}
            svg={<BadgeCheckIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        }
        card3={<VerificationHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={verificationCategories}
        enterpriseCard={{
          title: 'Custom Verification Solutions',
          description: 'Need verification for multiple accounts or platforms? Contact us for volume discounts and dedicated support.',
          features: ['Multi-platform', 'Volume discounts', 'Dedicated manager', 'Priority processing'],
        }}
      />
      <SectionDivider />

      <TestimonialsComponent reviews={reviews} />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
