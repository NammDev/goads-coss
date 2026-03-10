import type { Metadata } from "next"
import ChangelogContent from '@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHeroBig } from '@/components/page-hero-big'
import { WavyUnderline } from '@/components/section-header'
import { MilestonesIllustration } from '@/components/hero-illustrations/milestones-illustration'
import { milestoneReleases } from '@/data/milestones-page-data'

export const metadata: Metadata = {
  title: "Milestones | GoAds Company Timeline",
  description: "Explore GoAds journey — key milestones from founding to serving 500+ clients with premium ad infrastructure.",
}

export default function MilestonesPage() {
  return (
    <main className='flex-1'>
      <PageHeroBig
        badge='Our Journey'
        tagline='From day one to 500+ clients worldwide.'
        heading={
          <>
            Key{' '}
            <span className='relative inline-block'>
              Milestones
              <WavyUnderline className='-bottom-1.5 left-[8%] h-2 w-5/6' />
            </span>
          </>
        }
        description='From a small team helping local advertisers to a full-stack ad infrastructure platform serving 500+ clients in 30+ countries.'
        ctas={[
          { label: 'Get Started', href: '/#pricing' },
          { label: 'Contact Us', href: '/help', variant: 'outline' },
        ]}
        illustration={<MilestonesIllustration className="h-93.5" />}
      />
      <SectionDivider />
      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-4xl px-4 lg:px-6'>
          <ChangelogContent releases={milestoneReleases} />
        </div>
      </section>
      <SectionDivider />
      <CTASection />
    </main>
  )
}
