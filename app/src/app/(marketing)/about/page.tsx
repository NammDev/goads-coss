import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-03/about-us-page-03'
import Team from '@/components/shadcn-studio/blocks/team-section-05/team-section-05'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { aboutUsData, teamMembers } from '@/data/about-page-data'

/* ---------- page ---------- */

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        label="About Us"
        heading={
          <>
            The Team Behind{' '}
            <span className="relative inline-block">
              GoAds
              <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
            </span>
          </>
        }
        description="5+ years of helping advertisers scale with premium ad infrastructure, verified accounts, and dedicated support."
      />
      <SectionDivider />
      <AboutUs aboutUsData={aboutUsData} />
      <SectionDivider />
      <Team teamMembers={teamMembers} />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
