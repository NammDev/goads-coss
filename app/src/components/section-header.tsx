import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

export function WavyUnderline({ className }: { className?: string }) {
  return (
    <svg
      width='453'
      height='8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('absolute -bottom-1 left-0 w-full', className)}
    >
      <path
        d='M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

const VARIANT_CONFIG = {
  underline: {
    slide: { direction: 'down' as const },
    delays: [0, 0.1, 0.2],
    blur: false,
  },
  badge: {
    slide: { direction: 'down' as const, offset: 50 },
    delays: [0, 0.3, 0.6],
    blur: false,
  },
  uppercase: {
    slide: { direction: 'up' as const, offset: 50 },
    delays: [0, 0.3, 0.6],
    blur: true,
  },
}

type SectionHeaderProps = {
  label: string
  labelVariant?: 'underline' | 'badge' | 'uppercase'
  heading: ReactNode
  description?: string
  descriptionClassName?: string
  align?: 'center' | 'left'
  inView?: boolean
  className?: string
}

export function SectionHeader({
  label,
  labelVariant = 'underline',
  heading,
  description,
  descriptionClassName,
  align = 'center',
  inView = false,
  className,
}: SectionHeaderProps) {
  const config = VARIANT_CONFIG[labelVariant]

  const labelElement =
    labelVariant === 'badge' ? (
      <Badge variant='outline' className='text-sm font-normal'>
        {label}
      </Badge>
    ) : labelVariant === 'uppercase' ? (
      <p className='text-primary text-sm font-medium uppercase'>{label}</p>
    ) : (
      <span className='font-medium underline underline-offset-6'>{label}</span>
    )

  const motionBase = {
    fade: true as const,
    slide: config.slide,
    ...(config.blur && { blur: true as const }),
    transition: { duration: 0.5 },
    inView,
  }

  return (
    <div
      className={cn(
        align === 'center'
          ? 'flex flex-col items-center gap-4 text-center'
          : 'space-y-4',
        className
      )}
    >
      <MotionPreset {...motionBase}>{labelElement}</MotionPreset>
      <MotionPreset {...motionBase} delay={config.delays[1]}>
        <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
          {heading}
        </h2>
      </MotionPreset>
      {description && (
        <MotionPreset {...motionBase} delay={config.delays[2]}>
          <p className={cn('text-muted-foreground max-w-2xl text-lg', descriptionClassName)}>
            {description}
          </p>
        </MotionPreset>
      )}
    </div>
  )
}
