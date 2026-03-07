import Pricing from '@/components/shadcn-studio/blocks/pricing-component-09/pricing-component-09'
import { ProductCatalogGrid } from '@/components/product-catalog-grid'
import { pricingCategories, pricingUpsells } from './pricing-catalog-data'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { faqTabsData } from '@/data/landing-faq'

/* ---------- pricing data ---------- */

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 468,
    features: [
      '2 Agency Ad Accounts',
      '1 Business Manager',
      '7-day account warranty',
      'Email & chat support',
      'Basic account setup guide',
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: 149,
    annualPrice: 1428,
    features: [
      '5 Agency Ad Accounts',
      '2 Business Managers',
      '7-day account warranty',
      'Priority support (<2h response)',
      'Account health monitoring',
    ],
  },
  {
    name: 'Agency',
    monthlyPrice: 399,
    annualPrice: 3828,
    isPopular: true,
    features: [
      '15 Agency Ad Accounts',
      '5 Business Managers',
      '7-day account warranty',
      'Dedicated Telegram channel',
      'Instant replacement service',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 999,
    annualPrice: 9588,
    features: [
      'Unlimited Ad Accounts',
      'Unlimited Business Managers',
      'Extended warranty period',
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
        description="Choose the plan that fits your scale. All plans include a 7-day warranty and priority support."
      />
      <SectionDivider />
      <Pricing plans={plans} />
      <SectionDivider />

      <ProductCatalogGrid
        heading="All Products & Services"
        subheading="Browse our full catalog. Every product includes a 7-day warranty and priority support."
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
