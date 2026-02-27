'use client'

import { ArrowRightIcon, StarIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { Separator } from '@/components/ui/separator'

import TextFlip from '@/components/shadcn-studio/blocks/hero-section-39/text-flip'

export type TestimonialItem = {
  name: string
  role: string
  avatar: string
  content: string
}

type HeroSectionProps = {
  testimonials: TestimonialItem[]
}

const HeroSection = ({ testimonials }: HeroSectionProps) => {
  return (
    <section className='relative py-12 sm:py-20 lg:py-28'>
      <div className='container'>
        <BackgroundRippleEffect />
        <div className='pointer-events-none absolute inset-x-0 top-0 z-5 h-128 bg-[radial-gradient(transparent_20%,var(--background)_90%)]' />

        <div className='space-y-16 sm:space-y-20'>
          {/* Hero Top */}
          <div className='flex flex-col items-center gap-5'>
            {/* Badge */}
            <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView={false} className='z-10'>
              <Badge variant='outline' className='bg-background px-4 py-1.5 text-sm font-normal'>
                New ✨ Agency Ad Accounts, 7-Day Warranty, 24/7 Support & more...
              </Badge>
            </MotionPreset>

            {/* H1 */}
            <MotionPreset
              fade
              slide={{ direction: 'down' }}
              transition={{ duration: 0.5 }}
              inView={false}
              delay={0.2}
              component='h1'
              className='z-10 text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.15]'
            >
              Stop Losing Accounts. Start{' '}
              <TextFlip words={['Scaling', 'Growing', 'Winning']} /> ⚡
            </MotionPreset>

            {/* Subtitle */}
            <MotionPreset
              fade
              slide={{ direction: 'down' }}
              transition={{ duration: 0.5 }}
              inView={false}
              delay={0.4}
              component='p'
              className='text-muted-foreground z-10 max-w-2xl text-center text-lg leading-relaxed'
            >
              Buy verified agency ad accounts & Business Managers with{' '}
              <span className='text-foreground font-medium'>7-Day Warranty, 24/7 Support, Instant Delivery</span>{' '}
              and dedicated account managers.
            </MotionPreset>

            {/* Tailored for [TextFlip] */}
            <MotionPreset
              fade
              slide={{ direction: 'down' }}
              transition={{ duration: 0.5 }}
              inView={false}
              delay={0.5}
              className='z-10'
            >
              <p className='text-center text-lg'>
                Tailored for{' '}
                <span className='font-bold'>
                  <TextFlip
                    words={['Media Buyers', 'Agencies', 'E-commerce Brands', 'Dropshippers', 'Affiliates']}
                    duration={2500}
                  />
                </span>
              </p>
            </MotionPreset>

            {/* Social Proof: Avatars + Rating | Brand Logos */}
            <MotionPreset
              fade
              slide={{ direction: 'down' }}
              transition={{ duration: 0.5 }}
              inView={false}
              delay={0.6}
              className='z-10 mt-2'
            >
              <div className='flex items-center gap-4 sm:gap-6'>
                {/* Avatars + Rating */}
                <div className='flex items-center gap-3'>
                  <div className='flex -space-x-2.5'>
                    {testimonials.slice(0, 5).map((t, i) => (
                      <Avatar key={i} className='ring-background size-10 ring-2'>
                        <AvatarImage src={t.avatar} alt={t.name} />
                        <AvatarFallback>{t.name.split(' ', 2).map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <div className='flex items-center gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className='size-4 fill-yellow-500 text-yellow-500' />
                      ))}
                      <span className='ml-1 text-sm font-semibold'>4.9</span>
                    </div>
                    <p className='text-muted-foreground text-xs'>3,242+ BMs sold</p>
                  </div>
                </div>

                <Separator orientation='vertical' className='h-10' />

                {/* Platform Logos */}
                <div className='flex items-center gap-3'>
                  {['Meta', 'Google', 'TikTok', 'Shopify'].map(name => (
                    <div key={name} className='bg-muted flex size-9 items-center justify-center rounded-full'>
                      <span className='text-xs font-bold'>{name[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionPreset>

            {/* CTA Button */}
            <MotionPreset
              fade
              slide={{ direction: 'down' }}
              transition={{ duration: 0.5 }}
              inView={false}
              delay={0.7}
              className='z-10 mt-1'
            >
              <PrimaryFlowButton size='lg' asChild>
                <a href='#'>
                  Get Started
                  <ArrowRightIcon />
                </a>
              </PrimaryFlowButton>
            </MotionPreset>
          </div>

          {/* Logo Ticker */}
          <MotionPreset fade slide={{ direction: 'up' }} transition={{ duration: 0.6 }} inView={false} delay={0.9} className='z-10'>
            <div className='space-y-6'>
              <p className='text-muted-foreground text-center text-sm font-medium tracking-wide uppercase'>
                Trusted by fast-growing companies around the world
              </p>
              <div className='relative'>
                <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-24 bg-gradient-to-r to-transparent sm:w-40' />
                <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-24 bg-gradient-to-l to-transparent sm:w-40' />
                <Marquee duration={30} gap={3}>
                  {PARTNER_LOGOS.map((logo) => (
                    <span key={logo} className='text-muted-foreground/60 hover:text-foreground shrink-0 text-xl font-semibold tracking-tight transition-colors duration-300'>
                      {logo}
                    </span>
                  ))}
                </Marquee>
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

const PARTNER_LOGOS = [
  'Rho', 'Deel', 'Framer', 'Ramp', 'PlanetScale', 'Coinbase',
  'Storyblok', 'AngelList', 'Raycast', 'Vercel', 'Supabase', 'Udemy',
]

export default HeroSection
