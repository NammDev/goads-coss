// Foreplay product showcase — div.section.overflow-hidden > .container.section-container > .home-product
// REUSABLE: used for "Spark creative genius" (Swipe File) and "Identify winning patterns" (Discovery)
// .home-product: flex col, gap-20 (80px via grid-row-gap), pt-32 (128px), pb-10 (40px)
// .home-product-grid: flex (display:flex override), gap-4 (16px), min-h-[640px]
// .home-product-content: flex col, gap-8 (32px), flex-[3_1_0], rounded-3xl, p-8, border ring neutral-700
// .home-product-figure: bg neutral-800, rounded-3xl, flex-[7_1_0], h-[640px], relative, overflow-hidden

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

interface ProductTab {
  icon: React.ReactNode
  label: string
}

interface ForeplayHomeProductShowcaseProps {
  subtitle: string
  title: string
  description: React.ReactNode
  sidebarOverline: string
  sidebarTitle: string
  ctaLabel?: string
  ctaHref?: string
  learnMoreLabel?: string
  learnMoreHref?: string
  tabs: ProductTab[]
  sidebarVideoSrc?: string // .home-product-animation video
  tabImages?: string[] // .home-product-figure tab pane images (one per tab)
  showSectionHead?: boolean // false to skip section-head (when multiple products share one head)
  className?: string
}

export function ForeplayHomeProductShowcase({
  subtitle,
  title,
  description,
  sidebarOverline,
  sidebarTitle,
  ctaLabel = "Get Started",
  ctaHref = "/talk-to-sales",
  learnMoreLabel = "Learn More",
  learnMoreHref = "#",
  tabs,
  sidebarVideoSrc,
  tabImages,
  showSectionHead = true,
  className,
}: ForeplayHomeProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={cn("overflow-hidden", className)}>
      <ForeplaySectionContainer>
        {/* .home-product */}
        <div className="flex flex-col gap-20 pt-32 pb-10">
          {/* .section-head (centered, dark bg) — optional, shared across products */}
          {showSectionHead && (
            <ForeplaySectionHead
              subtitle={subtitle}
              title={title}
              titleTag="h2" titleSize="h2"
              description={description}
              descSize="l"
              variant="light"
            />
          )}

          {/* .home-product-grid: flex, gap-4, min-h-[640px] */}
          <div className="flex min-h-[640px] gap-4">
            {/* .home-product-content: sidebar card */}
            <div className="relative flex flex-[3_1_0] flex-col gap-8 overflow-hidden rounded-3xl p-8 shadow-[0_0_0_1px_var(--card)]">
              {/* .home-research-sidebar-head */}
              <div className="relative z-[2] flex flex-col gap-2">
                <div className="text-[var(--fp-alpha-50)]">
                  <div className={fpText.overline}>
                    {sidebarOverline}
                  </div>
                </div>
                <div className="text-foreground">
                  <h3 className={fpText.displayH3}>
                    {sidebarTitle}
                  </h3>
                </div>
              </div>

              {/* .main-cta-buttons */}
              <div className="relative z-[2] flex items-center gap-3">
                <ForeplayCtaButton href={ctaHref} variant="secondary">
                  {ctaLabel}
                </ForeplayCtaButton>
                <ForeplayCtaButton href={learnMoreHref} variant="ghost">
                  {learnMoreLabel}
                </ForeplayCtaButton>
              </div>

              {/* .home-product-tabs-links */}
              <div className="relative z-[2] flex flex-1 flex-col gap-1.5">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={cn(
                      // .home-product-tab-link
                      "flex cursor-pointer items-center gap-1.5 rounded-[10px] py-1.5 pr-5 pl-1.5",
                      "transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                      activeTab === i
                        ? "text-foreground"
                        : "text-[var(--fp-alpha-200)] hover:text-foreground",
                    )}
                  >
                    <div className="flex size-5 items-center justify-center">{tab.icon}</div>
                    <div className={fpText.labelM}>
                      {tab.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* .home-product-animation: absolute, bottom-[-16%] left-[-15%], w-full */}
              {sidebarVideoSrc && (
                <div className="pointer-events-none absolute bottom-[-16%] left-[-15%] flex w-full items-center justify-center">
                  <div className="origin-center translate-y-[-15%] scale-[1.6]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="size-full"
                    >
                      <source src={sidebarVideoSrc} />
                    </video>
                  </div>
                </div>
              )}
            </div>

            {/* .home-product-figure: right side image area, bg neutral-800, rounded-3xl, flex-[7_1_0] */}
            <div className="relative flex flex-[7_1_0] items-center justify-center overflow-hidden rounded-3xl bg-muted">
              {tabImages?.map((src, i) => (
                <div
                  key={i}
                  className={cn(
                    // .home-product-tab-pane: absolute fill, center
                    "size-full items-center justify-center",
                    activeTab === i ? "flex" : "hidden",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="size-full object-cover" />
                </div>
              ))}
              {!tabImages && <span className="text-muted-foreground">Tab preview</span>}
            </div>
          </div>
        </div>
      </ForeplaySectionContainer>
    </div>
  )
}
