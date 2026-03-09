import Pricing from '@/components/shadcn-studio/blocks/pricing-component-09/pricing-component-09'
import { ProductCatalogGrid } from '@/components/product-catalog-grid'
import { pricingCategories, pricingUpsells } from './pricing-catalog-data'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { faqTabsData } from '@/data/landing-faq'

/* ---------- pricing plans (content from landing page) ---------- */

const plans = [
  {
    name: 'Advanced Setup',
    monthlyPrice: 250,
    annualPrice: 2400,
    features: [
      '1x BM3 Verified (3 ad account slots)',
      '2x Premium Profiles',
      '1x Aged Reinstated Page',
      '14-Day Warranty',
    ],
  },
  {
    name: 'Premium Setup',
    monthlyPrice: 650,
    annualPrice: 6240,
    features: [
      '1x BM5 Verified ($250 spending limit)',
      '1x BM3 Verified (3 ad account slots)',
      '4x Premium Profiles',
      '3x Aged Reinstated Pages',
      '14-Day Warranty',
    ],
  },
  {
    name: 'Elite Setup',
    monthlyPrice: 890,
    annualPrice: 8544,
    isPopular: true,
    features: [
      '2x BM5 Verified ($250 limit each)',
      '6x Premium Profiles',
      '3x Aged Reinstated Pages',
      '1x 10,000 Followers Page',
      '14-Day Warranty',
    ],
  },
  {
    name: 'Customize',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Custom number of ad accounts',
      'Custom BMs, profiles, pages & more',
      'Flexible warranty options',
      'Dedicated account manager',
      'Custom SLA & onboarding',
    ],
  },
]

/* ---------- page ---------- */

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
      <Pricing plans={plans} />
      <SectionDivider />

      <ProductCatalogGrid
        heading="All Products & Services"
        categories={pricingCategories}
        upsells={pricingUpsells}
      />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
