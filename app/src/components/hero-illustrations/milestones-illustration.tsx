'use client'

import { useRef } from 'react'
import { Rocket, Users, Globe } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { AnimatedBeam } from '@/components/ui/animated-beam'

const milestones = [
  { year: '2019', label: 'Founded', icon: Rocket, desc: 'First 50 accounts sold' },
  { year: '2022', label: '500+ Clients', icon: Users, desc: 'Major growth milestone' },
  { year: '2025', label: 'Global Platform', icon: Globe, desc: '30+ countries served' },
]

export function MilestonesIllustration({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  return (
    <div ref={containerRef} className={`relative mx-auto flex w-full max-w-[320px] flex-col items-center justify-center gap-6 ${className ?? ''}`}>
      {milestones.map((m, i) => {
        const Icon = m.icon
        return (
          <div key={m.year} ref={cardRefs[i]} className="w-full">
            <Card className="relative overflow-hidden p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-bold">{m.year}</Badge>
                    <span className="text-sm font-semibold">{m.label}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs">{m.desc}</p>
                </div>
              </div>
              <BorderBeam size={50} duration={12} colorFrom="var(--primary)" colorTo="var(--primary)" />
            </Card>
          </div>
        )
      })}

      <AnimatedBeam containerRef={containerRef} fromRef={cardRefs[0]} toRef={cardRefs[1]} gradientStartColor="var(--primary)" duration={4} className="-z-1 max-md:hidden" />
      <AnimatedBeam containerRef={containerRef} fromRef={cardRefs[1]} toRef={cardRefs[2]} gradientStartColor="var(--primary)" duration={4} className="-z-1 max-md:hidden" />
    </div>
  )
}
