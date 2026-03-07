import { ComingSoonHero } from '@/components/coming-soon-hero'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'

/* Facebook / Meta icon */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-16 sm:size-20">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function AgencyAdAccountPage() {
  return (
    <main className="flex-1">
      <ComingSoonHero
        platformIcon={<FacebookIcon />}
        accentClass="text-[#1877F2]"
        badge="Facebook"
        heading="Facebook Agency Ad Accounts Are Coming"
        description="Verified Meta agency ad accounts for Facebook & Instagram. High trust scores, unlimited spend potential, and 7-day replacement warranty — built for serious media buyers."
        features={[
          'Verified Agency Setup',
          'Unlimited Daily Spend',
          '7-Day Warranty',
          'Facebook & Instagram',
          '<2h Support Response',
        ]}
      />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
