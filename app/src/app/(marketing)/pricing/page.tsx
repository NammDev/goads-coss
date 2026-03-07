import {
  HeadphonesIcon,
  CreditCardIcon,
  SettingsIcon,
  TagIcon,
} from 'lucide-react'

import Pricing from '@/components/shadcn-studio/blocks/pricing-component-09/pricing-component-09'
import { ProductCatalogGrid } from '@/components/product-catalog-grid'
import { pricingCategories, pricingUpsells } from './pricing-catalog-data'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'

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

/* ---------- FAQ data ---------- */

const faqTabsData = [
  {
    value: 'pricing',
    label: 'Pricing & Plans',
    icon: TagIcon,
    faqs: [
      {
        question: 'What does each plan include?',
        answer:
          'Each plan includes a set number of agency ad accounts, Business Managers, and support hours. Higher tiers unlock more accounts, priority support, and dedicated account managers.',
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer:
          'Yes! You can upgrade at any time and the price difference will be prorated. Downgrades take effect at the next billing cycle.',
      },
      {
        question: 'Is there a free trial?',
        answer:
          'We don\'t offer free trials, but all plans come with a 7-day warranty. If any account gets restricted within 7 days (not due to policy violations), we replace it free of charge.',
      },
      {
        question: 'What happens if I exceed my plan limits?',
        answer:
          'You can purchase additional accounts at any time. We\'ll also reach out to suggest upgrading if a higher tier would save you money.',
      },
    ],
  },
  {
    value: 'warranty',
    label: 'Warranty',
    icon: SettingsIcon,
    faqs: [
      {
        question: 'What does the 7-day warranty cover?',
        answer:
          'Our warranty covers any account issues not caused by policy violations. If your account gets restricted or disabled within 7 days, we replace it at no cost.',
      },
      {
        question: 'How fast are replacements?',
        answer:
          'We process warranty replacements within 2 hours during business hours. For bulk orders, we offer instant replacements via dedicated Telegram channels.',
      },
    ],
  },
  {
    value: 'payment',
    label: 'Payment',
    icon: CreditCardIcon,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers, cryptocurrency (USDT, BTC, ETH), PayPal, Wise, and major credit cards.',
      },
      {
        question: 'Do you offer bulk discounts?',
        answer:
          'Yes. Orders of 5+ accounts receive 10% off. Orders of 20+ receive 20% off. Contact us for custom enterprise pricing.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support',
    icon: HeadphonesIcon,
    faqs: [
      {
        question: 'How do I reach support?',
        answer:
          'Via live chat, Telegram (@GoAdsSupport), or email. Average response time is under 2 hours.',
      },
      {
        question: 'Do higher plans get faster support?',
        answer:
          'Yes. Agency and Enterprise plans include priority support with sub-1h response times and dedicated Telegram channels.',
      },
    ],
  },
]

/* ---------- page ---------- */

export default function PricingPage() {
  return (
    <main className="flex-1">
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
