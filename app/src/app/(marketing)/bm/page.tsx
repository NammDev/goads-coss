import type { Metadata } from "next"
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, bmCategories } from '@/data/bm-page-data'
import { reviews } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

export const metadata: Metadata = {
  title: "Buy Business Managers | Verified BMs with 7-Day Warranty",
  description: "Purchase verified Facebook Business Managers. Unlimited spend, pre-warmed, 7-day replacement warranty. Scale your ad campaigns safely.",
}

export default function BMPage() {
  return (
    <main className="flex-1">
      <HeroSection avatars={avatars} />
      <SectionDivider />

      <ProductCatalog
        categories={bmCategories}
        enterpriseCard={{}}
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
