import { MessageCircleIcon, HashIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import LogoVector from '@/assets/svg/logo-vector'

const CTASection = () => {
  return (
    <section className='pt-8 pb-16 sm:py-16 lg:py-24'>
      <div className='container'>
        <Card className='relative overflow-hidden rounded-3xl border-none bg-black pt-20 pb-32 text-center shadow-2xl max-sm:pt-10 max-sm:pb-15'>
          {/* Dotted grid overlay */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 z-0'
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <CardContent className='relative z-1 px-6'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                <Badge variant='outline' className='border-white text-sm font-normal text-white'>
                  Get in touch
                </Badge>
              </MotionPreset>
              <MotionPreset
                component='h2'
                className='text-2xl font-semibold text-white md:text-3xl lg:text-4xl'
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.6}
                transition={{ duration: 0.5 }}
              >
                Ready to Scale Your Ads?
              </MotionPreset>

              <MotionPreset
                component='p'
                className='text-xl text-balance text-white/80 lg:w-10/12'
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.9}
                transition={{ duration: 0.5 }}
              >
                Join 500+ advertisers scaling with GoAds agency accounts. Get instant support, 7-day warranty, and accounts
                that actually last.
              </MotionPreset>
            </div>
            <MotionPreset
              className='absolute top-0 -left-64 text-[#F4F4F5]/10 max-sm:-left-60'
              fade
              slide
              transition={{ duration: 0.8 }}
            >
              <LogoVector className='size-150 rotate-143 max-sm:size-100' />
            </MotionPreset>

            <MotionPreset
              className='absolute top-0 -right-64 text-[#F4F4F5]/10 max-sm:-right-60'
              fade
              slide={{ direction: 'right' }}
              transition={{ duration: 0.8 }}
            >
              <LogoVector className='size-150 rotate-25 max-sm:size-100' />
            </MotionPreset>
          </CardContent>
        </Card>

        <MotionPreset fade blur zoom={{ initialScale: 0.95 }} delay={1.2} transition={{ duration: 0.7 }}>
          <div className='border-primary bg-background relative mx-auto -mt-9.25 flex size-fit gap-3 rounded-xl border-2 p-3'>
            <Button size='lg' className='rounded-lg text-base' asChild>
              <a href='https://t.me/GoAdsSupport' target='_blank' rel='noopener noreferrer'>
                <MessageCircleIcon className='size-5' />
                <span className='max-sm:hidden'>Telegram</span>
              </a>
            </Button>
            <Button size='lg' variant='secondary' className='rounded-lg text-base' asChild>
              <a href='https://discord.gg/goads' target='_blank' rel='noopener noreferrer'>
                <HashIcon className='size-5' />
                <span className='max-sm:hidden'>Discord</span>
              </a>
            </Button>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default CTASection
