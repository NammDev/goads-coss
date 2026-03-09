'use client'

import type { ReactNode } from 'react'

import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import HeroGridBg from '@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg'
import { WavyUnderline } from '@/components/section-header'
import Link from 'next/link'

type CTA = {
  label: string
  href: string
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
  external?: boolean
}

type PageHeroBigProps = {
  badge: string
  tagline: string
  heading: ReactNode
  description: string
  ctas: CTA[]
  /** Optional illustration below CTAs */
  illustration?: ReactNode
}

export function PageHeroBig({
  badge,
  tagline,
  heading,
  description,
  ctas,
  illustration,
}: PageHeroBigProps) {
  return (
    <section className={`relative overflow-hidden pt-12 sm:pt-16 lg:pt-24 ${illustration ? '' : 'pb-12 sm:pb-16 lg:pb-24'}`}>
      <HeroGridBg />

      <div className="relative z-10 mx-auto flex max-w-[1416px] flex-col items-center gap-6 px-4 text-center lg:px-6 pb-4">
        {/* Badge + tagline */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
          <span className="relative inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full border bg-background px-2.5 py-1 text-sm">
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {badge}
            </span>
            <span>{tagline}</span>
            <BorderBeam size={60} duration={8} colorFrom="var(--primary)" colorTo="var(--ring)" />
          </span>
        </MotionPreset>

        {/* Heading */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.15} transition={{ duration: 0.5 }}>
          <h1 className="max-w-4xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
            {heading}
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">
            {description}
          </p>
        </MotionPreset>

        {/* CTA Buttons */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.45} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap justify-center gap-3">
            {ctas.map((cta) => (
              <Button key={cta.label} size="lg" variant={cta.variant ?? 'default'} className={cta.className} asChild>
                {cta.external ? (
                  <a href={cta.href} target="_blank" rel="noopener noreferrer">
                    {cta.label}
                  </a>
                ) : (
                  <Link href={cta.href}>{cta.label}</Link>
                )}
              </Button>
            ))}
          </div>
        </MotionPreset>

        {/* Optional illustration */}
        {illustration && (
          <MotionPreset fade blur slide={{ direction: 'up', offset: 30 }} delay={0.6} transition={{ duration: 0.5 }} className="mt-6 sm:mt-10">
            {illustration}
          </MotionPreset>
        )}
      </div>
    </section>
  )
}
