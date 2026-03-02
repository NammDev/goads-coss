'use client'

import { ArrowUpRightIcon, RocketIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'

import { Rating } from '@/components/ui/rating'
import { Marquee } from '@/components/ui/marquee'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/components/ui/craft-button'

import { Badge } from '@/components/ui/badge'
import CardStack from '@/components/shadcn-studio/blocks/hero-section-36/card-stack'

type AvatarData = {
  src: string
  fallback: string
  name: string
}[]

const HeroSection = ({ avatars }: { avatars: AvatarData }) => {
  return (
    <section className='flex-1'>
      <div className='mx-auto grid h-full max-w-6xl grid-cols-1 flex-col gap-12 px-4 py-12 sm:gap-16 sm:px-6 sm:py-16 md:grid-cols-2 lg:gap-24 lg:px-8 lg:py-24'>
        <div className='space-y-5'>
          <MotionPreset fade slide blur transition={{ duration: 0.5 }}>
            <Badge className='px-2.5 py-1 shadow-sm' variant='outline'>
              <span className='relative flex size-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75 dark:bg-green-400'></span>
                <span className='relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-400'></span>
              </span>
              Available for next months | 2 slots free
            </Badge>
          </MotionPreset>

          <MotionPreset fade blur transition={{ duration: 0.9 }} delay={0.2}>
            <div className='flex flex-col gap-2 text-2xl font-bold sm:text-3xl lg:text-5xl'>
              <div className='flex items-center gap-2.25'>
                <MotionPreset
                  slide={{ direction: 'left', offset: 40 }}
                  blur='6px'
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  delay={0.8}
                  motionProps={{
                    initial: { rotate: -5, opacity: 0.7 },
                    animate: { rotate: 0, opacity: 0.7 }
                  }}
                >
                  <span className='text-muted-foreground'>Crafting</span>
                </MotionPreset>
                <MotionPreset
                  zoom={{ initialScale: 0.3, scale: 1 }}
                  blur='10px'
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  delay={1}
                  motionProps={{
                    initial: { rotate: 30 },
                    animate: { rotate: 0 },
                    whileHover: { scale: 1.1, rotate: 5 }
                  }}
                >
                  <div className='relative flex'>
                    <span className='flex size-10 shrink-0 rotate-[10deg] items-center justify-center rounded-[7px] bg-sky-600/20 dark:bg-sky-400/20'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/framer-logo.png'
                        alt='framer'
                        className='max-w-6 object-cover'
                      />
                    </span>
                    <span className='ring-background flex size-10 shrink-0 rotate-[-6.2deg] items-center justify-center rounded-[7px] bg-[color-mix(in_oklab,var(--destructive)_20%,#fff)] ring-3'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/figma-icon.png'
                        alt='figma'
                        className='max-w-6 object-cover'
                      />
                    </span>
                  </div>
                </MotionPreset>
                <MotionPreset
                  zoom={{ initialScale: 0.8, scale: 1 }}
                  blur='6px'
                  transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                  delay={1.15}
                  motionProps={{
                    initial: { rotate: 3 },
                    animate: { rotate: 0 }
                  }}
                >
                  <span>Designs</span>
                </MotionPreset>
              </div>
              <div className='flex items-center gap-2.25'>
                <MotionPreset
                  slide={{ direction: 'up', offset: 35 }}
                  blur='6px'
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  delay={1.25}
                  motionProps={{
                    initial: { rotate: -2 },
                    animate: { rotate: 0 }
                  }}
                >
                  <span>That Work</span>
                </MotionPreset>
                <MotionPreset
                  zoom={{ initialScale: 0.7, scale: 1 }}
                  blur='8px'
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  delay={1.4}
                  motionProps={{
                    initial: { rotate: 8 },
                    animate: { rotate: 0 },
                    whileHover: { scale: 1.05, rotate: -2 }
                  }}
                >
                  <span className='inline-block'>Harder,</span>
                </MotionPreset>
              </div>
              <div className='flex items-center gap-2.25'>
                <MotionPreset
                  slide={{ direction: 'right', offset: 40 }}
                  blur='6px'
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  delay={1.5}
                  motionProps={{
                    initial: { rotate: 4 },
                    animate: { rotate: 0 }
                  }}
                >
                  <span>Think</span>
                </MotionPreset>

                <MotionPreset
                  zoom={{ initialScale: 0, scale: 1 }}
                  blur='12px'
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 12,
                    mass: 0.8
                  }}
                  delay={1.65}
                  motionProps={{
                    initial: { rotate: 180 },
                    animate: { rotate: 0 },
                    whileHover: { scale: 1.15, rotate: 10 }
                  }}
                >
                  <span className='bg-destructive/20 flex size-10 shrink-0 items-center justify-center rounded-[7px]'>
                    <RocketIcon className='fill-destructive size-6 stroke-0' />
                  </span>
                </MotionPreset>

                <MotionPreset
                  zoom={{ initialScale: 0.5, scale: 1 }}
                  blur='10px'
                  transition={{
                    duration: 0.9,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  delay={1.8}
                  motionProps={{
                    initial: { rotate: -5, opacity: 0.7 },
                    animate: { rotate: 0, opacity: 0.7 },
                    whileHover: { scale: 1.05 }
                  }}
                >
                  <span className='text-muted-foreground'>Bigger.</span>
                </MotionPreset>
              </div>
            </div>
          </MotionPreset>

          {/* Para */}
          <MotionPreset fade slide blur transition={{ duration: 0.5 }} delay={0.5}>
            <p className='text-muted-foreground'>
              From brand identity to web design, <span className='text-foreground'>I create tailored solutions</span>{' '}
              that engage audiences, elevate your brand, and drive growth. Whether it&apos;s a{' '}
              <span className='text-foreground'>logo, website, or rebrand,</span> let&apos;s work together to bring your
              vision to life.
            </p>
          </MotionPreset>

          <MotionPreset fade slide blur transition={{ duration: 0.5 }} delay={0.7}>
            <CraftButton asChild>
              <a href='#'>
                <CraftButtonLabel>Hire Me</CraftButtonLabel>
                <CraftButtonIcon>
                  <ArrowUpRightIcon className='size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45' />
                </CraftButtonIcon>
              </a>
            </CraftButton>
          </MotionPreset>
        </div>
        {/* Stack card */}
        <MotionPreset
          fade
          blur
          transition={{ duration: 0.5 }}
          delay={0.8}
          className='flex w-full items-center justify-center max-md:mt-12 max-md:-mb-12'
        >
          <CardStack />
        </MotionPreset>
      </div>
      <MotionPreset
        fade
        blur
        transition={{ duration: 0.5 }}
        delay={0.4}
        className='border-primary/10 relative flex border-t border-b'
      >
        <div className='m-1.75 w-full [background-image:radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] [background-size:18px_18px]'></div>

        <div className='bg-background border-primary/10 flex max-w-6xl gap-2.5 overflow-hidden px-4 py-2.5 max-sm:flex-col sm:px-6 lg:px-8'>
          <MotionPreset
            fade
            slide
            blur
            transition={{ duration: 0.5 }}
            delay={0.8}
            className='flex flex-1 items-center gap-1.75 max-sm:flex-col max-sm:justify-center max-sm:text-center'
          >
            <div className='flex -space-x-4'>
              {avatars.map((avatar, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md'>
                      <AvatarImage src={avatar.src} alt={avatar.name} />
                      <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{avatar.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div>
              <div className='flex items-center gap-1.75'>
                <Rating
                  readOnly
                  variant='yellow'
                  size={24}
                  value={4.5}
                  precision={0.5}
                  className='max-sm:justify-center'
                />
                <p className='font-medium'>4.5</p>
              </div>
              <p className='text-sm text-nowrap'>Trusted by 1000+ designers</p>
            </div>
          </MotionPreset>
          <MotionPreset fade blur delay={0.9} transition={{ duration: 0.5 }} className='relative overflow-hidden'>
            <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-25 bg-gradient-to-r via-85% to-transparent' />
            <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-25 bg-gradient-to-l via-85% to-transparent' />
            <Marquee pauseOnHover duration={20} reverse gap={4} className='*:items-center'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/dailydev-logo-bw.png'
                alt='Daily Dev'
                className='h-9.5 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/ycombinator-logo-bw.png'
                alt='Y Combinator'
                className='h-9 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/bestofjs-logo-bw.png'
                alt='Best of JS'
                className='h-9 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/product-hunt-logo-bw.png'
                alt='Product Hunt'
                className='h-9 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/reddit-logo-bw.png'
                alt='Reddit'
                className='h-9 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/launchtory-logo-bw.png'
                alt='Launchtory'
                className='h-11 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/medium-logo-bw.png'
                alt='Medium'
                className='h-8.5 shrink-0'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/devto-logo-bw.png'
                alt='Dev.to'
                className='h-11.5 shrink-0'
              />
            </Marquee>
          </MotionPreset>
        </div>
        <div className='m-1.75 w-full [background-image:radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] [background-size:18px_18px]'></div>
      </MotionPreset>
    </section>
  )
}

export default HeroSection
