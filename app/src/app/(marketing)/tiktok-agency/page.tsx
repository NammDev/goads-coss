import { ComingSoonHero } from '@/components/coming-soon-hero'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'

/* TikTok icon */
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-16 sm:size-20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 4.76 1.52v-3.4c-.86 0-1.68-.18-2.42-.5l-.58.03z" />
    </svg>
  )
}

export default function TikTokAgencyPage() {
  return (
    <main className="flex-1">
      <ComingSoonHero
        platformIcon={<TikTokIcon />}
        accentClass="text-foreground"
        badge="TikTok"
        heading="TikTok Agency Ad Accounts Are Coming"
        description="Verified TikTok Ads accounts under official agency setup. Access premium ad features, higher spending limits, and dedicated account management for your campaigns."
        features={[
          'Verified Agency Setup',
          'Higher Spend Limits',
          'Premium Ad Features',
          'Business Center Access',
          'Dedicated Support',
        ]}
      />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
