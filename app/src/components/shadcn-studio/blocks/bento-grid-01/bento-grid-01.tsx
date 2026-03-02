import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'

import Features from '@/components/shadcn-studio/blocks/bento-grid-01/features'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-[1416px] space-y-12 px-4 sm:space-y-16 lg:space-y-24 lg:px-6'>
        {/* Header Section */}
        <div className='space-y-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Main features
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
            className='text-2xl font-semibold sm:text-3xl lg:text-4xl'
          >
            All Essentials in One Place
          </MotionPreset>

          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
            className='text-muted-foreground text-xl'
          >
            Save countless hours by using Shadcn Studio&apos;s ready-made components, blocks, and templates, designed to
            simplify your workflow and bring your projects to life with ease.
          </MotionPreset>
        </div>

        {/* Feature Cards */}
        <Features />
      </div>
    </section>
  )
}

export default BentoGrid
