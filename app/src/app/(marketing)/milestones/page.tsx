import ChangelogContent from '@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05'
import type { Release } from '@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05'
import Milestone2025 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2025'
import Milestone2023 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2023'
import Milestone2021 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2021'
import Milestone2019 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2019'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'

const releases: Release[] = [
  {
    version: '2025',
    date: 'Present',
    content: <Milestone2025 />,
  },
  {
    version: '2023',
    date: 'Growth Year',
    content: <Milestone2023 />,
  },
  {
    version: '2021',
    date: 'Expansion',
    content: <Milestone2021 />,
  },
  {
    version: '2019',
    date: 'Founded',
    content: <Milestone2019 />,
  },
]

export default function MilestonesPage() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Our Journey'
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
      />
      <SectionDivider />
      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-4xl px-4 lg:px-6'>
          <ChangelogContent releases={releases} />
        </div>
      </section>
      <SectionDivider />
      <CTASection />
    </main>
  )
}
