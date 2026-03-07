import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import VerificationHeroCard from '@/components/shadcn-studio/blocks/verification-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, verificationCategories, verificationUpsells, reviews } from './verification-page-data'
import { faqTabsData } from '@/data/landing-faq'

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
        secondaryCta={{ label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' }}
        card3={<VerificationHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={verificationCategories}
        upsells={verificationUpsells}
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
