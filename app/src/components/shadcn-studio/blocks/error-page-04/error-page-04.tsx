'use client'

import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionPreset } from "@/components/ui/motion-preset"
import HeroGridBg from "@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg"

const ErrorPage04 = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--header-height)-200px)] flex-col items-center justify-center overflow-hidden px-4">
      {/* Interactive grid background */}
      <HeroGridBg />

      {/* Large "404" watermark behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[clamp(10rem,30vw,20rem)] font-bold leading-none text-primary/[0.07] dark:text-primary/[0.05]">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Badge */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 30 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm">
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              404
            </span>
            <span>Page not found</span>
          </span>
        </MotionPreset>

        {/* Heading */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 30 }} delay={0.15} transition={{ duration: 0.5 }}>
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            This Page Went Off the Grid
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 30 }} delay={0.3} transition={{ duration: 0.5 }}>
          <p className="max-w-lg text-lg text-muted-foreground text-balance">
            Looks like this page doesn&apos;t exist — but your ad accounts are still scaling strong.
          </p>
        </MotionPreset>

        {/* CTA Buttons */}
        <MotionPreset fade blur slide={{ direction: 'down', offset: 30 }} delay={0.45} transition={{ duration: 0.5 }}>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" className="btn-mirror-sweep btn-secondary rounded-lg" asChild>
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-tertiary rounded-lg" asChild>
              <Link href="/talk-to-sales">
                <MessageCircle className="size-4" />
                Talk to Sales
              </Link>
            </Button>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default ErrorPage04
