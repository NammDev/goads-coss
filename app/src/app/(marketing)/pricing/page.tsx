import type { Metadata } from "next"
import Pricing from '@/components/shadcn-studio/blocks/pricing-component-09/pricing-component-09'
import { ProductCatalogGrid } from '@/components/product-catalog-grid'
import { pricingCategories } from '@/data/pricing-catalog-data'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { faqTabsData } from '@/data/landing-faq'
import { pricingPlans } from '@/data/pricing-plans-data'

/* ---------- page ---------- */

export const metadata: Metadata = {
  title: "Pricing | GoAds Ad Account Plans & Packages",
  description: "View GoAds pricing for agency ad accounts, Business Managers, profiles, and more. Transparent pricing with 7-day warranty.",
}

export default function PricingPage() {
  return (
    <main className="flex-1">
      <PageHero
        label="Pricing"
        heading={
          <>
            Simple, Transparent{' '}
            <span className="relative inline-block">
              Pricing
              <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
            </span>
          </>
        }
      />
      <SectionDivider />
      <Pricing plans={pricingPlans} />
      <SectionDivider />

      <ProductCatalogGrid
        heading="All Products & Services"
        categories={pricingCategories}
        enterpriseCard={{}}
      />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
