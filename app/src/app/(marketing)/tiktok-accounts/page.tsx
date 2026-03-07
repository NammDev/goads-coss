import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import TikTokHeroCard from '@/components/shadcn-studio/blocks/tiktok-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, tiktokCategories, tiktokUpsells, reviews } from './tiktok-page-data'
import { faqTabsData } from '@/data/landing-faq'

export default function TikTokAccountsPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Buy Aged TikTok Accounts"
        subheading={
          <>
            Stop worrying about unstable or restricted accounts.
            GoAds provides <strong>aged TikTok accounts ready for advertising, content growth, and scaling campaigns</strong>, trusted by agencies and media buyers worldwide.
          </>
        }
        primaryCta={{ label: 'Get Your TikTok Account', href: '/tiktok-accounts#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' }}
        card3={<TikTokHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={tiktokCategories}
        upsells={tiktokUpsells}
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
