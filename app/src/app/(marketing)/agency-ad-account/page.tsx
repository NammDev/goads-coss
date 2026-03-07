import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import BentoGrid01 from '@/components/shadcn-studio/blocks/bento-grid-01/bento-grid-01'
import BentoGrid13 from '@/components/shadcn-studio/blocks/bento-grid-13/bento-grid-13'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { faqTabsData } from '@/data/landing-faq'

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
