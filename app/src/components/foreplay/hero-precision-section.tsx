"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react"
import {
  TrendingUp,
  Users,
  Shield,
  Headphones,
} from "lucide-react"

/**
 * Foreplay-style Before/After section.
 * Two side-by-side cards:
 * - Before (white, border): descending line with pain labels
 * - After (dark): GoAds logo center, orbiting benefit badges
 * Cards are compact square-ish (~470×516) with p-6 (24px).
 */

/* ─── Orbit badges for After card ─── */
const ORBIT_BADGES = [
  { icon: TrendingUp, label: "Revenue", angle: -50 },
  { icon: Users, label: "500+ Clients", angle: 40 },
  { icon: Shield, label: "7-Day Warranty", angle: 150 },
  { icon: Headphones, label: "< 2h Support", angle: 240 },
]

/* ─── Pain labels for Before card ─── */
const PAIN_ITEMS = [
  { text: "Account Restricted", top: "45%", left: "8%", rotate: -4, delay: 1.0 },
  { text: "Ad Rejected", top: "55%", left: "45%", rotate: 3, delay: 1.2 },
  { text: "BM Disabled", top: "65%", left: "15%", rotate: -2, delay: 1.4 },
  { text: "Policy Violation", top: "72%", left: "50%", rotate: 5, delay: 1.6 },
  { text: "Spend Wasted", top: "82%", left: "30%", rotate: -3, delay: 1.8 },
]

export function HeroPrecisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px] lg:text-[32px]">
            Your new secret weapon for ads
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Stop losing accounts. Trade guesswork for the
            infrastructure used by Vietnam&apos;s fastest growing
            ecommerce brands.
          </p>
        </div>

        {/* Two cards — compact, square-ish */}
        <div className="mx-auto mt-16 grid max-w-[960px] gap-6 md:grid-cols-2">

          {/* ── Before card (white) ── */}
          <div className="flex flex-col rounded-2xl border border-border/50 bg-background p-6">
            <p className="text-lg font-medium text-foreground">Before ...</p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
              Banned accounts, wasted spend and sleepless nights.
            </p>

            {/* Descending line area */}
            <div className="relative mt-4 flex flex-1 items-end overflow-hidden rounded-xl" style={{ minHeight: 340 }}>
              {/* SVG descending line */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 340"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <motion.path
                  d="M 30,60 C 100,70 140,110 200,160 S 300,250 380,310"
                  stroke="oklch(0.70 0.15 25)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                {/* Glow */}
                <motion.path
                  d="M 30,60 C 100,70 140,110 200,160 S 300,250 380,310"
                  stroke="oklch(0.70 0.15 25)"
                  strokeWidth={12}
                  strokeLinecap="round"
                  opacity={0.08}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                {/* Arrow */}
                <motion.path
                  d="M 370,300 L 382,315 L 365,312 Z"
                  fill="oklch(0.65 0.18 25)"
                  fillOpacity={0.4}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 2, duration: 0.3 }}
                />
              </svg>

              {/* Pain labels */}
              {PAIN_ITEMS.map((item) => (
                <motion.span
                  key={item.text}
                  className="absolute rounded-md border border-red-200/40 bg-red-50/80 px-2 py-0.5 text-[10px] font-medium text-red-500 dark:border-red-900/30 dark:bg-red-950/60 dark:text-red-400"
                  style={{ top: item.top, left: item.left, rotate: `${item.rotate}deg` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: item.delay, duration: 0.25 }}
                >
                  {item.text}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── After card (dark) ── */}
          <div className="flex flex-col rounded-2xl bg-[oklch(0.08_0.01_260)] p-6">
            <p className="text-lg font-medium text-white">After GoAds</p>
            <p className="mt-1 text-[15px] leading-relaxed text-white/50">
              Stable accounts, growing revenue, total control.
            </p>

            {/* Orbit system */}
            <div className="relative mt-4 flex flex-1 items-center justify-center overflow-hidden rounded-xl" style={{ minHeight: 340 }}>
              {/* Orbit rings */}
              <div className="absolute size-[240px] rounded-full border border-white/[0.06]" />
              <div className="absolute size-[150px] rounded-full border border-white/[0.04]" />

              {/* Center GoAds logo */}
              <motion.div
                className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              >
                <span className="text-sm font-bold text-white">GoAds</span>
              </motion.div>

              {/* Orbiting badges */}
              {ORBIT_BADGES.map((badge, i) => {
                const Icon = badge.icon
                const r = 120
                const rad = (badge.angle * Math.PI) / 180
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r

                return (
                  <motion.div
                    key={badge.label}
                    className="absolute z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm"
                    style={{ left: "50%", top: "50%" }}
                    initial={{ opacity: 0, scale: 0, x, y }}
                    animate={isInView ? { opacity: 1, scale: 1, x, y } : {}}
                    transition={{
                      delay: 0.6 + i * 0.12,
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <Icon className="size-3.5 text-white/60" />
                    <span className="whitespace-nowrap">{badge.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
