import type { Metadata } from "next"
import { ComingSoonHero } from '@/components/coming-soon-hero'
import { comingSoonPages } from '@/data/coming-soon-data'

const data = comingSoonPages['agency-ad-account']

export const metadata: Metadata = {
  title: "Agency Ad Accounts | Coming Soon",
  description: "GoAds agency ad accounts — premium Facebook advertising accounts coming soon. Join the waitlist.",
}

export default function AgencyAdAccountPage() {
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
