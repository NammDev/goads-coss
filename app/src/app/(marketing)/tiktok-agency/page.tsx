import { ComingSoonHero } from '@/components/coming-soon-hero'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { comingSoonPages } from '@/data/coming-soon-data'

const data = comingSoonPages['tiktok-agency']

export default function TikTokAgencyPage() {
  return (
    <main className="flex-1">
      <ComingSoonHero
        platformIcon={data.platformIcon}
        accentClass={data.accentClass}
        badge={data.badge}
        heading={data.heading}
        description={data.description}
        features={[...data.features]}
      />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
