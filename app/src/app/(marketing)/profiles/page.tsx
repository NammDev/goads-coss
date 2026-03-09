import { CalendarIcon, PackageCheckIcon } from 'lucide-react'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import ProfileHeroCard from '@/components/shadcn-studio/blocks/profile-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { CONTACT } from '@/data/contact-info'
import { avatars, profileCategories } from '@/data/profiles-page-data'
import { reviews } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

export default function ProfilesPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Buy Verified Facebook Account"
        subheading={
          <>
            Stop worrying about weak or newly created accounts.
            GoAds provides <strong>aged and verified Facebook profiles ready for advertising</strong>, trusted by agencies and media buyers worldwide.
            Each profile is aged, verified and covered by our <strong>7-day unlimited replacement warranty</strong>.
          </>
        }
        primaryCta={{ label: 'Get Your Profile Today', href: '/profiles#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: CONTACT.telegram.support }}
        card1={
          <StatisticsCard
            title="Account Age"
            badgeContent="Aged profiles"
            value="7+ Years"
            changePercentage="+100%"
            icon={<CalendarIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        }
        card2={
          <RatingsCard
            title="Profiles Sold"
            badgeContent="This month"
            value="1,842"
            changePercentage={24.5}
            svg={<PackageCheckIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        }
        card3={<ProfileHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={profileCategories}
        enterpriseCard={{ description: 'Need bulk profiles or custom configurations? Contact us for volume discounts and dedicated support.' }}
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
