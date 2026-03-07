'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/components/ui/craft-button'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { Separator } from '@/components/ui/separator'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'
import { Card, CardContent } from '@/components/ui/card'
import { WavyUnderline } from '@/components/section-header'
import { WordRotate, Typewriter } from './word-rotate'
import HeroGridBg from './hero-grid-bg'
import { ROTATE_WORDS, TYPEWRITER_WORDS, AVATARS, PLATFORM_LOGOS, BRAND_LOGOS } from '@/data/landing-hero'

export default function HeroClone() {
  return (
    <section id="hero" className="relative overflow-hidden space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24">
      <HeroGridBg />
      <div className="relative z-10 mx-auto flex max-w-[1416px] flex-col items-center gap-7 px-4 text-center lg:px-6">

        {/* Badge with BorderBeam */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
          <div className="z-10">
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs bg-background relative font-normal">
              <span className="bg-primary text-primary-foreground rounded-full px-1.5">New</span>
              <span className="text-sm text-wrap">
                Meta, Google &amp; TikTok - Premium Agency Ad Accounts
              </span>
              <BorderBeam size={60} duration={8} colorFrom="var(--primary)" colorTo="var(--ring)" />
            </span>
          </div>
        </MotionPreset>

        {/* H1 with rotating word and SVG underline */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.15} transition={{ duration: 0.5 }}>
          <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
            Stop Losing Accounts. Start{' '}
            <span className="relative font-extrabold">
              <WordRotate words={ROTATE_WORDS} />
              <WavyUnderline className="-bottom-0.5" />
            </span>
            <br />
            with Confidence
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
          <p className="text-muted-foreground z-10 max-w-2xl text-lg">
            Scale your ad campaigns with Meta, Google, TikTok Premium Agency Ads Accounts with Verified Asset - 24/7 SUPPORT
          </p>
        </MotionPreset>

        {/* Built for + Typewriter */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.45} transition={{ duration: 0.5 }}>
          <div className="text-muted-foreground z-10 flex items-center gap-1 text-xl">
            <span>Built for</span>
            <div className="text-foreground inline-flex items-center gap-0.5">
              <Typewriter words={TYPEWRITER_WORDS} />
            </div>
          </div>
        </MotionPreset>

        {/* Social proof: Avatars + Rating | Platform logos */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
          <div className="z-10 flex items-center gap-6 max-md:flex-col-reverse">
            <div className="flex items-center gap-3">
              <div className="flex flex-row items-center justify-center">
                {AVATARS.map((av, i) => (
                  <div key={av.id} className={`relative ${i < AVATARS.length - 1 ? '-me-4' : ''} [&>[data-slot='avatar']]:size-12`}>
                    <Avatar className="size-10 ring-2 ring-background">
                      <AvatarImage src={`https://cdn.shadcnstudio.com/ss-assets/avatar/${av.id}.png?width=48&format=auto`} alt={av.alt} />
                      <AvatarFallback>{av.fallback}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              <div className="space-y-1 text-start">
                <div className="flex items-center gap-1.5">
                  <Rating value={4.8} precision={0.5} readOnly size={16} variant="yellow" />
                  <span className="text-sm">4.8</span>
                </div>
                <p className="text-sm text-nowrap">Trusted by 500+ advertisers</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-12 max-md:hidden" />
            <div className="flex items-center gap-5 dark:invert">
              {PLATFORM_LOGOS.map(logo => (
                <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-[26px]" />
              ))}
            </div>
          </div>
        </MotionPreset>

        {/* CTA Button */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.75} transition={{ duration: 0.5 }}>
          <div className="z-10 flex flex-wrap justify-center gap-4">
            <CraftButton asChild size='lg' className='text-base'>
              <a href='/#pricing'>
                <CraftButtonLabel>Get Started</CraftButtonLabel>
                <CraftButtonIcon>
                  <ArrowUpRightIcon className='size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45' />
                </CraftButtonIcon>
              </a>
            </CraftButton>
            <Button asChild variant='outline' className='btn-mirror-sweep btn-tertiary text-base' size='lg'>
              <a href='/talk-to-sales'>
                Talk to Sales
              </a>
            </Button>
          </div>
        </MotionPreset>

      </div>

      {/* Logo Cloud Marquee */}
      <MotionPreset fade blur slide={{ direction: 'up', offset: 30 }} delay={0.9} transition={{ duration: 0.5 }} className="relative z-10 mx-auto max-w-[1416px] px-4 lg:px-6">
        <div className="relative overflow-hidden">
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-35 bg-gradient-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-35 bg-gradient-to-l to-transparent" />
          <div className="w-full overflow-hidden">
            <Marquee pauseOnHover duration={40} gap={1.5}>
              {BRAND_LOGOS.slice(0, 7).map((logo, index) => (
                <Card key={index} className="rounded-lg border-none shadow-md">
                  <CardContent className="flex items-center gap-2.5 px-9">
                    <img src={logo.icon} alt={logo.name} className="h-6 w-6" />
                    <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{logo.name}</span>
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          </div>
          <div className="w-full overflow-hidden">
            <Marquee pauseOnHover duration={40} gap={1.5} reverse>
              {BRAND_LOGOS.slice(7).map((logo, index) => (
                <Card key={index} className="rounded-lg border-none shadow-md">
                  <CardContent className="flex items-center gap-2.5 px-9">
                    <img src={logo.icon} alt={logo.name} className="h-6 w-6" />
                    <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{logo.name}</span>
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          </div>
        </div>
      </MotionPreset>
    </section>
  )
}
