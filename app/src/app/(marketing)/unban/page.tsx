import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import UnbanHeroCard from '@/components/shadcn-studio/blocks/unban-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, unbanCategories, unbanUpsells, reviews } from './unban-page-data'
import { faqTabsData } from '@/data/landing-faq'

export default function UnbanPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Professional Unban Services"
        subheading={
          <>
            GoAds provides <strong>professional unban services for Facebook, Instagram, TikTok accounts and pages</strong>.
            Recover restricted or disabled assets quickly with support trusted by agencies and media buyers worldwide.
          </>
        }
        primaryCta={{ label: 'Request Service', href: '/unban#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' }}
        card3={<UnbanHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={unbanCategories}
        upsells={unbanUpsells}
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
