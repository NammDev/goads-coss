import {
  ShieldCheckIcon,
  HeadphonesIcon,
  CreditCardIcon,
  SettingsIcon,
} from 'lucide-react'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import BentoGrid01 from '@/components/shadcn-studio/blocks/bento-grid-01/bento-grid-01'
import BentoGrid13 from '@/components/shadcn-studio/blocks/bento-grid-13/bento-grid-13'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'

/* ---------- hero avatars ---------- */

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'DT',
    name: 'Duc Tran',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'ML',
    name: 'Mike Lee',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'SN',
    name: 'Sarah Nguyen',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
  },
]

/* ---------- reviews ---------- */

const reviews: ReviewCard[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'MC',
    name: 'Marley Calzoni',
    designation: 'Media Buyer',
    company: 'AdScale Agency',
    rating: 4.5,
    message:
      'Agency accounts from GoAds are a game-changer. Zero bans in 4 months of heavy spending. Support is lightning fast.',
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'TS',
    name: 'Tuan Son',
    designation: 'Performance Marketer',
    company: 'GrowthLab',
    rating: 5,
    message:
      'Switched from personal ad accounts to GoAds agency accounts. Night and day difference — stable, high trust score, no more random restrictions.',
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'AK',
    name: 'Anna Kim',
    designation: 'Agency Owner',
    company: 'Kim Digital',
    rating: 4.5,
    message:
      'We run 20+ agency accounts for our clients. The 7-day warranty and fast replacements make GoAds our go-to provider.',
  },
]

/* ---------- FAQ data ---------- */

const faqTabsData = [
  {
    value: 'agency',
    label: 'Agency Accounts',
    icon: ShieldCheckIcon,
    faqs: [
      {
        question: 'What is an agency ad account?',
        answer:
          'Agency ad accounts are Meta advertising accounts created under official agency Business Managers. They have higher trust scores, better ad approval rates, and more stability than personal accounts.',
      },
      {
        question: 'How are these different from personal ad accounts?',
        answer:
          'Agency accounts are created under verified agency infrastructure, giving them higher spending limits, better policy compliance rates, and priority support from Meta. They are far less likely to get restricted.',
      },
      {
        question: 'What platforms do you support?',
        answer:
          'We provide agency accounts for Meta (Facebook & Instagram), Google Ads (whitelisted), and TikTok (verified). Each platform has its own account tiers and pricing.',
      },
      {
        question: 'How quickly can I start running ads?',
        answer:
          'Most accounts are delivered within 1-2 hours after purchase. You can start running ads immediately after connecting your payment method and creating your first campaign.',
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
          'Our 7-day warranty covers any account issues not caused by policy violations. If your account gets restricted or disabled within 7 days, we replace it at no cost.',
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
        question: 'Do you help with setup?',
        answer:
          'Yes! We can configure your account, connect payment methods, install pixels, and verify your domain.',
      },
    ],
  },
]

/* ---------- page ---------- */

export default function AgencyAdAccountPage() {
  return (
    <main className="flex-1">
      <HeroSection avatars={avatars} />
      <SectionDivider />

      <BentoGrid01 />
      <SectionDivider />

      <BentoGrid13 />
      <SectionDivider />

      <TestimonialsComponent reviews={reviews} />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
