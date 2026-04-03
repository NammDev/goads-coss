// Shared scroll animation hook — used by foreplay-home-hero and foreplay-product-hero
// Observes triggerRef intersection ratio to animate stickyRef opacity/scale/translateY
// Animation: opacity 0→1, scale 0.75→1, translateY -33%→0

import { useRef, useEffect } from "react"

interface HeroScrollAnimationRefs {
  triggerRef: React.RefObject<HTMLDivElement | null>
  stickyRef: React.RefObject<HTMLDivElement | null>
}

export function useHeroScrollAnimation(): HeroScrollAnimationRefs {
  const triggerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = triggerRef.current
    const sticky = stickyRef.current
    if (!trigger || !sticky) return

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio
        const opacity = ratio
        const scale = 0.75 + ratio * 0.25
        const translateY = -33 + ratio * 33
        sticky.style.opacity = String(opacity)
        sticky.style.transform = `translate3d(0, ${translateY}%, 0) scale3d(${scale}, ${scale}, 1)`
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) },
    )
    observer.observe(trigger)
    return () => observer.disconnect()
  }, [])

  return { triggerRef, stickyRef }
}
