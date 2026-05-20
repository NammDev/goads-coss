"use client"

// Top navigation progress bar — zero external deps. App Router doesn't expose
// router start events, so we use the only reliable "navigation begins" signal:
// a capture-phase click on an internal <a>. Trickles toward 90%, then snaps to
// 100% + fades when the pathname resolves. Mounted once in the marketing layout.

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function ForeplayNavProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(0)
  const [fading, setFading] = useState(false)

  const activeRef = useRef(false)
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTrickle = useCallback(() => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current)
      trickleRef.current = null
    }
  }, [])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const start = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true
    clearTimers()
    setFading(false)
    setVisible(true)
    setValue(8)
    clearTrickle()
    // ease toward 90% — never reaches it until the route resolves
    trickleRef.current = setInterval(() => {
      setValue((v) => (v < 90 ? v + (90 - v) * 0.12 : v))
    }, 200)
  }, [clearTimers, clearTrickle])

  const done = useCallback(() => {
    if (!activeRef.current) return
    activeRef.current = false
    clearTrickle()
    setValue(100)
    // fill (200ms) → fade (250ms) → unmount
    timersRef.current.push(setTimeout(() => setFading(true), 200))
    timersRef.current.push(
      setTimeout(() => {
        setVisible(false)
        setValue(0)
        setFading(false)
      }, 480),
    )
  }, [clearTrickle])

  // START — capture internal left-clicks before navigation happens.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest("a")
      if (!a) return
      const href = a.getAttribute("href")
      if (!href || a.target === "_blank" || a.hasAttribute("download")) return
      let url: URL
      try {
        url = new URL(a.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      // ignore same-page + pure hash links
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return
      start()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [start])

  // COMPLETE — pathname changed → the new route has resolved.
  useEffect(() => {
    done()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // unmount cleanup
  useEffect(
    () => () => {
      clearTrickle()
      clearTimers()
    },
    [clearTrickle, clearTimers],
  )

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]"
    >
      <div
        // Pure white core + cyan-tinted soft halo — matches the site's
        // monochrome dark theme (`.foreplay` --primary = #fff). Linear-style.
        className="h-full w-full origin-left bg-white shadow-[0_0_10px_rgba(120,200,255,0.6),0_0_4px_rgba(255,255,255,0.8)] transition-[transform,opacity] duration-200 ease-out"
        style={{
          transform: `scaleX(${value / 100})`,
          opacity: fading ? 0 : 1,
        }}
      />
    </div>
  )
}
