'use client'

import { ArrowRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { Separator } from '@/components/ui/separator'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { WordRotate, Typewriter } from './word-rotate'
import HeroGridBg from './hero-grid-bg'

const ROTATE_WORDS = ['Scaling', 'Growing', 'Winning', 'Profiting']
const TYPEWRITER_WORDS = ['Media Buyers', 'Agencies', 'E-commerce Brands', 'Dropshippers', 'Lead Gen Teams']

const AVATARS = [
  { id: 'avatar-38', alt: 'client', fallback: 'C1' },
  { id: 'avatar-42', alt: 'client', fallback: 'C2' },
  { id: 'avatar-27', alt: 'client', fallback: 'C3' },
  { id: 'avatar-34', alt: 'client', fallback: 'C4' },
  { id: 'avatar-29', alt: 'client', fallback: 'C5' },
]

const PLATFORM_LOGOS = [
  { src: 'https://cdn.simpleicons.org/meta/000000', alt: 'Meta' },
  { src: 'https://cdn.simpleicons.org/googleads/000000', alt: 'Google Ads' },
  { src: 'https://cdn.simpleicons.org/tiktok/000000', alt: 'TikTok' },
  { src: 'https://cdn.simpleicons.org/facebook/000000', alt: 'Facebook' },
  { src: 'https://cdn.simpleicons.org/instagram/000000', alt: 'Instagram' },
]

export default function HeroClone() {
  return (
    <section id="hero" className="relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24">
      <HeroGridBg />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8">

        {/* Badge with BorderBeam */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
          <div className="z-10">
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs bg-background relative font-normal">
              <span className="bg-primary text-primary-foreground rounded-full px-1.5">New</span>
              <span className="text-sm text-wrap">
                Meta, Google &amp; TikTok Agency Accounts — Now with 7-Day Warranty
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
              <svg width="453" height="8" fill="none" className="absolute -bottom-0.5 left-0 w-full">
                <path d="M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            with Confidence
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
          <p className="text-muted-foreground z-10 max-w-2xl text-lg">
            Scale your ad campaigns with premium, verified{' '}
            <span className="text-foreground font-medium">
              Meta Agency Accounts, Google Whitelisted, TikTok Verified, and Business Managers
            </span>
            {' '}— backed by 7-day warranty.
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
            <a href="#pricing" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground h-10 px-6 rounded-lg text-base shadow-sm hover:bg-secondary/80 transition-colors">
              Get Started <ArrowRight className="size-4" />
            </a>
          </div>
        </MotionPreset>

      </div>
    </section>
  )
}
