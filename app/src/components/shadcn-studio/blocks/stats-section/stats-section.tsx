import { MotionPreset } from '@/components/ui/motion-preset'
import { SectionHeader, WavyUnderline } from '@/components/section-header'
import { STATS_DATA } from '@/data/landing-stats'

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
            {STATS_DATA.map((stat, i) => (
              <div
                key={i}
                className={[
                'flex flex-col items-center gap-6 border-dashed px-4 py-6 sm:px-6 sm:py-9',
                // 1-col (mobile): all but last get bottom border
                i < 3 ? 'max-sm:border-b' : '',
                // 2-col (sm): first row (i<2) gets bottom border; odd columns (i%2===0 except last row) get right border
                i < 2 ? 'sm:max-lg:border-b' : '',
                i % 2 === 0 ? 'sm:max-lg:border-r' : '',
                // 4-col (lg): all but last get right border
                i < 3 ? 'lg:border-r' : '',
              ].join(' ')}
              >
                <div className='flex flex-col items-center gap-3'>
                  <h3 className='text-3xl font-semibold sm:text-4xl'>
                    <span className='inline-block tabular-nums'>{stat.value}</span>
                    {stat.suffix}
                  </h3>
                  <p className='text-muted-foreground text-lg sm:text-xl'>{stat.label}</p>
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
