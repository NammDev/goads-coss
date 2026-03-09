'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

/* ---------- spotlight + 3D tilt effect hook ---------- */

const CARD_SELECTOR = '[data-card-3d]'

export function useCard3DEffects(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>(CARD_SELECTOR)

    /* spotlight blob follows cursor across all cards */
    const handleMouseMove = (ev: MouseEvent) => {
      cards.forEach((card) => {
        const blob = card.querySelector<HTMLElement>('.blob')
        const fblob = card.querySelector<HTMLElement>('.fake-blob')
        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()
        blob.style.opacity = '1'
        blob.animate(
          [{ transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)` }],
          { duration: 300, fill: 'forwards' },
        )
      })
    }

    /* per-card 3D tilt via requestAnimationFrame */
    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>('.card-inner')
      if (!inner) return

      let rect: DOMRect
      let animFrame: number | undefined

      const animate = (mouseX: number, mouseY: number) => {
        if (!rect) rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const rx = -(mouseY - cy) * 0.02
        const ry = (mouseX - cx) * 0.02
        inner.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`
      }

      const onEnter = () => { inner.style.transition = 'transform 0.2s ease-out'; rect = card.getBoundingClientRect() }
      const onMove = (e: MouseEvent) => { if (animFrame) cancelAnimationFrame(animFrame); animFrame = requestAnimationFrame(() => animate(e.clientX, e.clientY)) }
      const onLeave = () => { if (animFrame) cancelAnimationFrame(animFrame); inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'; inner.style.transition = 'transform 0.4s ease-out' }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      ;(card as any).__cleanup3D = () => { if (animFrame) cancelAnimationFrame(animFrame); card.removeEventListener('mouseenter', onEnter); card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
    })

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cards.forEach((card) => { ;(card as any).__cleanup3D?.() })
    }
  }, [containerRef])
}

/* ---------- 3D card shell with spotlight + tilt ---------- */

export function Card3D({
  index = 0,
  className,
  contentClassName,
  children,
  onClick,
  inView,
}: {
  index?: number
  className?: string
  contentClassName?: string
  children: ReactNode
  onClick?: (e: React.MouseEvent) => void
  inView?: boolean
}) {
  return (
    <MotionPreset
      fade
      slide={{ direction: 'up', offset: 20 }}
      blur='4px'
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      delay={0.05 * index}
      inView={inView}
    >
      <div
        data-card-3d
        className={cn(
          'group/card relative cursor-pointer overflow-hidden rounded-xl bg-border p-px transition-all duration-200 ease-out',
          className,
        )}
        onClick={onClick}
      >
        <div className='card-inner h-full'>
          <Card className='h-full border-none transition-all duration-200 ease-out group-hover/card:bg-card/90 group-hover/card:backdrop-blur-[20px]'>
            <CardContent className={cn('flex h-full flex-col justify-between px-5 py-4', contentClassName)}>
              {children}
            </CardContent>
          </Card>
        </div>
        <div className='blob absolute top-0 left-0 size-20 rounded-full bg-foreground/20 opacity-0 blur-2xl transition-all duration-200 ease-out' />
        <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
      </div>
    </MotionPreset>
  )
}

/* ---------- grid container that wires up 3D effects ---------- */

export function Card3DGrid({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  useCard3DEffects(containerRef)

  return (
    <div ref={containerRef} className={cn('grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3', className)}>
      {children}
    </div>
  )
}
