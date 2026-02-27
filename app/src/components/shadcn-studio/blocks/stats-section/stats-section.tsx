import { GithubIcon, ComponentIcon, BlocksIcon, UsersRoundIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'

const stats = [
  { icon: GithubIcon, value: '3,242', suffix: '+', label: 'BMs Sold' },
  { icon: ComponentIcon, value: '$12M', suffix: '+', label: 'Ad Spend Managed' },
  { icon: BlocksIcon, value: '97', suffix: '%', label: 'Approval Rate' },
  { icon: UsersRoundIcon, value: '500', suffix: '+', label: 'Active Clients' }
]

const StatsSection = () => {
  return (
    <section id='stats' className='space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24'>
      <div className='container flex flex-col items-center gap-4 text-center'>
        <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView>
          <span className='font-medium underline underline-offset-6'>Stats</span>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.1} inView>
          <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            <span className='relative font-bold'>
              GoAds
              <svg
                width='453'
                height='8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute -bottom-1 left-0 w-full'
              >
                <path
                  d='M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                />
              </svg>
            </span>{' '}
            Impact
          </h2>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.2} inView>
          <p className='text-muted-foreground max-w-4xl text-lg'>
            Celebrating the milestones achieved with our clients worldwide.
          </p>
        </MotionPreset>
      </div>

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
