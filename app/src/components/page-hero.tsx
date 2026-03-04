import type { ReactNode } from 'react'

import { SectionHeader } from '@/components/section-header'
import HeroGridBg from '@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg'
import { MotionPreset } from '@/components/ui/motion-preset'

type PageHeroProps = {
  label: string
  heading: ReactNode
  description?: string
  descriptionClassName?: string
  children?: ReactNode
}

export function PageHero({
  label,
  heading,
  description,
  descriptionClassName,
  children,
}: PageHeroProps) {
  return (
    <section className="relative z-[1] overflow-hidden py-12 md:py-14">
      <HeroGridBg />

      <div className="relative z-10 mx-auto max-w-[1416px] space-y-4 px-4 lg:px-6">
        <SectionHeader
          label={label}
          heading={heading}
          description={description}
          descriptionClassName={descriptionClassName}
        />

        {children && (
          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            delay={0.3}
          >
            {children}
          </MotionPreset>
        )}
      </div>
    </section>
  )
}
