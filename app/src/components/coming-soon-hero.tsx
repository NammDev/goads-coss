'use client'

import type { ReactNode } from 'react'
import { MessageCircleIcon, BellIcon } from 'lucide-react'
import { CONTACT } from '@/data/contact-info'

import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import HeroGridBg from '@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg'

import LogoVector from '@/assets/svg/logo-vector'

type ComingSoonHeroProps = {
  /** Platform icon rendered large behind the heading */
  platformIcon: ReactNode
  /** Platform accent color class, e.g. "text-blue-500" */
  accentClass?: string
  /** Badge text, e.g. "Facebook" */
  badge: string
  /** Main heading */
  heading: string
  /** Sub-description */
  description: string
  /** Features teaser list */
  features?: string[]
}

export function ComingSoonHero({
  platformIcon,
  accentClass = 'text-primary',
  badge,
  heading,
  description,
  features = [],
}: ComingSoonHeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-16 sm:py-24 lg:py-32">
      <HeroGridBg />

      {/* Decorative logo watermarks */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-20 opacity-[0.03]">
        <LogoVector className="size-[500px] rotate-[-15deg]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-20 opacity-[0.03]">
        <LogoVector className="size-[500px] rotate-[25deg]" />
      </div>

      {/* Animated gradient orb */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full opacity-[0.08] blur-[120px] ${accentClass} bg-current`}
      />

      <div className="container relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Platform icon */}
        <MotionPreset fade zoom={{ initialScale: 0.5 }} transition={{ duration: 0.6 }}>
          <div className={`${accentClass} mb-2`}>
            {platformIcon}
          </div>
        </MotionPreset>

        {/* Coming Soon badge */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.15} transition={{ duration: 0.5 }}>
          <span className="relative inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full border bg-background px-2.5 py-1 text-sm">
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {badge}
            </span>
            <span className="text-muted-foreground">Coming Soon</span>
            <BorderBeam size={60} duration={8} colorFrom="var(--primary)" colorTo="var(--ring)" />
          </span>
        </MotionPreset>

        {/* Heading */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
          <h1 className="max-w-4xl text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-[1.15]">
            {heading}
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.45} transition={{ duration: 0.5 }}>
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">
            {description}
          </p>
        </MotionPreset>

        {/* Features teaser */}
        {features.length > 0 && (
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap justify-center gap-3">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {feature}
                </span>
              ))}
            </div>
          </MotionPreset>
        )}

        {/* CTA buttons */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.75} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="btn-mirror-sweep btn-secondary">
              <a href={CONTACT.telegram.support} target="_blank" rel="noopener noreferrer">
                <BellIcon className="size-4" />
                Notify Me on Launch
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="btn-mirror-sweep btn-tertiary">
              <a href={CONTACT.telegram.support} target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon className="size-4" />
                Talk to Sales
              </a>
            </Button>
          </div>
        </MotionPreset>

        {/* Pulsing indicator */}
        <MotionPreset fade delay={0.9} transition={{ duration: 0.5 }}>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            In development
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}
