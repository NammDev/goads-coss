import { Orbiting } from '@/components/ui/orbiting'

import Logo from '@/assets/svg/logo'
import { MetaLogo, GoogleLogo, TikTokLogo, InstagramLogo, BingLogo, YouTubeLogo } from '@/assets/svg/ad-platform-logos'

const EnterpriseCollaboration = () => {
  return (
    <div className='relative flex min-h-58 flex-1 items-center justify-center overflow-hidden'>
      <div className='absolute flex size-88 flex-col items-center justify-center'>
        <Orbiting duration={30} radius={175} strokeWidth={1} startingAngle={45}>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <MetaLogo className='size-7.5' />
          </span>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <GoogleLogo className='size-7.5' />
          </span>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <TikTokLogo className='size-7.5' />
          </span>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <InstagramLogo className='size-7.5' />
          </span>
        </Orbiting>
        <Orbiting duration={30} radius={135.5} strokeWidth={1} startingAngle={90}>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <BingLogo className='size-7.5' />
          </span>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <YouTubeLogo className='size-7.5' />
          </span>
        </Orbiting>
        <Orbiting duration={30} radius={90} strokeWidth={1}>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <MetaLogo className='size-7.5' />
          </span>
          <span className='bg-background grid size-13 place-content-center rounded-full border shadow-sm'>
            <GoogleLogo className='size-7.5' />
          </span>
        </Orbiting>

        <Logo className='absolute top-1/2 left-1/2 z-10 size-20.5 -translate-x-1/2 -translate-y-1/2' />
      </div>
      <div className='from-card pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b to-transparent' />
      <div className='from-card pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent' />
      <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent' />
      <div className='from-card pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r to-transparent' />
    </div>
  )
}

export default EnterpriseCollaboration
