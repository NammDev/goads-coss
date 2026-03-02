import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Particles } from '@/components/ui/particles'

import Logo from '@/assets/svg/logo'
import Rocket from '@/assets/svg/rocket'

const CardParticles = () => {
  return (
    <Card className='bg-muted h-full border-0 shadow-none'>
      <MotionPreset
        fade
        slide={{ direction: 'down', offset: 50 }}
        delay={0.7}
        transition={{ duration: 0.45 }}
        className='relative flex flex-1 justify-center px-6 py-4'
      >
        <Rocket />
        <Particles className='absolute inset-0 z-0' quantity={25} staticity={75} size={1.2} color='#808080' refresh />
        <div className='absolute bottom-18 flex items-center gap-6'>
          <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
            <Logo className='size-8' />
          </span>
          <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/react-logo.png?width=32&format=auto'
              alt='React Logo'
              className='size-8'
            />
          </span>
          <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/claude-icon.png?width=32&format=auto'
              alt='Claude Logo'
              className='size-8'
            />
          </span>
        </div>
      </MotionPreset>
      <CardHeader className='gap-4'>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.85} transition={{ duration: 0.45 }}>
          <CardTitle className='text-2xl font-semibold'>Ready to launch, built to scale</CardTitle>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={1} transition={{ duration: 0.45 }}>
          <CardDescription className='text-lg'>
            Quickly deploy your UI from design to code with AI and cloud-ready performance.
          </CardDescription>
        </MotionPreset>
      </CardHeader>
    </Card>
  )
}

export default CardParticles
