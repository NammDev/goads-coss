import { GithubIcon, ComponentIcon, BlocksIcon, UsersRoundIcon, type LucideIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'
import { SectionHeader, WavyUnderline } from '@/components/section-header'
import { STATS_DATA } from '@/data/landing-stats'

const ICON_MAP: Record<string, LucideIcon> = {
  GithubIcon,
  ComponentIcon,
  BlocksIcon,
  UsersRoundIcon,
}

const stats = STATS_DATA.map(s => ({ ...s, icon: ICON_MAP[s.iconName] }))

const StatsSection = () => {
  return (
    <section id='stats' className='space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24'>
      <SectionHeader
        label='Stats'
        heading={<><span className='relative font-bold'>GoAds<WavyUnderline /></span>{' '}Impact</>}
        description='Celebrating the milestones achieved with our clients worldwide.'
        descriptionClassName='max-w-4xl'
        inView
        className='container'
      />

      <MotionPreset fade slide={{ direction: 'up' }} transition={{ duration: 0.5 }} delay={0.3} inView>
        <div className='container'>
          <div className='grid grid-cols-1 border-y border-dashed sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-6 border-dashed px-4 py-6 sm:px-6 sm:py-9 ${
                  i < 3 ? 'max-lg:border-b' : ''
                } ${i % 2 === 0 && i < 3 ? 'sm:border-r' : ''} ${i === 1 ? 'lg:border-r' : ''}`}
              >
                <stat.icon className='text-muted-foreground size-7 stroke-1' aria-hidden='true' />
                <div className='flex flex-col items-center gap-3'>
                  <h3 className='text-4xl font-semibold'>
                    <span className='inline-block tabular-nums'>{stat.value}</span>
                    {stat.suffix}
                  </h3>
                  <p className='text-muted-foreground text-xl'>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionPreset>
    </section>
  )
}

export default StatsSection
