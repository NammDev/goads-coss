import type { Metadata } from "next"
import { ComingSoonHero } from '@/components/coming-soon-hero'
import { comingSoonPages } from '@/data/coming-soon-data'

const data = comingSoonPages['tiktok-agency']

export const metadata: Metadata = {
  title: "TikTok Agency Accounts | Coming Soon",
  description: "GoAds TikTok agency advertising accounts coming soon. Premium TikTok ad infrastructure.",
}

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
    </main>
  )
}
