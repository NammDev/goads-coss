import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import ProfileHeroCard from '@/components/shadcn-studio/blocks/profile-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, profileCategories, profileUpsells, reviews } from './profiles-page-data'
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
        secondaryCta={{ label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' }}
        card3={<ProfileHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={profileCategories}
        upsells={profileUpsells}
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
