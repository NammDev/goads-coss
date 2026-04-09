// Foreplay solution product tabs — .comparison-tabs-menu + ForeplayHomeProductShowcase
// 5 product tab buttons at top, clicking shows corresponding ProductShowcase below
// Source: /industries/ecommerce "5 Apps in One" section
// .comparison-tabs-menu: grid 5col, gap-4, p-1
// .comparison-product-tab: border 1px neutral-500, opacity 0.44, rounded-[15px], p-2.5, current: opacity 1

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayHomeProductShowcase } from "@/components/foreplay/foreplay-home-product-showcase"
import { lensTabs, spyderTabs, swipeFileTabs, discoveryTabs, briefsTabs } from "@/data/foreplay-product-tabs"

const products = [
  {
    name: "Lens",
    icon: "/foreplay/footer_4.webp",
    overline: "Lens",
    title: "Creative Analytics & Reporting",
    ctaHref: "/lens",
    learnMoreHref: "/lens",
    tabs: lensTabs,
    sidebarVideoSrc: "/video/lens_video.mp4",
    tabImages: ["/foreplay/lens_tab1.webp", "/foreplay/lens_tab2.webp", "/foreplay/lens_tab3.webp"],
  },
  {
    name: "Spyder",
    icon: "/foreplay/footer_3.webp",
    overline: "Spyder",
    title: "Automatically track competitors",
    ctaHref: "/spyder",
    learnMoreHref: "/spyder",
    tabs: spyderTabs,
    sidebarVideoSrc: "/video/cta-spyder.mov",
    tabImages: ["/foreplay/6810ff44da8facf8efaa1529_Spyder-1.webp", "/foreplay/6810ff44da8facf8efaa1529_Spyder-1.webp"],
  },
  {
    name: "Swipe File",
    icon: "/foreplay/footer_1.webp",
    overline: "Swipe File",
    title: "Save ads from anywhere, forever",
    ctaHref: "/swipe-file",
    learnMoreHref: "/swipe-file",
    tabs: swipeFileTabs,
    sidebarVideoSrc: "/video/cta-swipe-file.mov",
    tabImages: ["/foreplay/Group429.png", "/foreplay/swipe_tab2.webp"],
  },
  {
    name: "Discovery",
    icon: "/foreplay/footer_2.webp",
    overline: "Discovery",
    title: "The smartest ad search engine",
    ctaHref: "/discovery",
    learnMoreHref: "/discovery",
    tabs: discoveryTabs,
    sidebarVideoSrc: "/video/cta-discovery.mov",
    tabImages: ["/foreplay/discovery.webp", "/foreplay/discovery.webp", "/foreplay/discovery.webp"],
  },
  {
    name: "Briefs",
    icon: "/foreplay/footer_5.webp",
    overline: "Briefs",
    title: "Go from concept to launched, faster",
    ctaHref: "/briefs",
    learnMoreHref: "/briefs",
    tabs: briefsTabs,
    sidebarVideoSrc: "/video/brief_video.webm",
    tabImages: ["/foreplay/brief_tab1.webp", "/foreplay/brief_tab2.webp"],
  },
]

interface ForeplaySolutionProductTabsProps {
  subtitle: string
  title: string
  description: string
}

export function ForeplaySolutionProductTabs({ subtitle, title, description }: ForeplaySolutionProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const product = products[activeTab]

  return (
    <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
      <ForeplaySectionContainer>
        <ForeplaySectionHead
          subtitle={subtitle}
          title={title}
          titleSize="h2"
          description={description}
          descSize="l"
          variant="light"
        />

        {/* .comparison-tabs-menu: grid 5col, gap-4, p-1, pt-12 */}
        <div className="grid auto-cols-fr grid-cols-5 gap-4 p-1 pt-12">
          {products.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActiveTab(i)}
              className={cn(
                // .comparison-product-tab
                "flex cursor-pointer items-center gap-2.5 rounded-[15px] border border-[var(--fp-alpha-700)] p-2.5",
                "transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                activeTab === i ? "opacity-100" : "opacity-[0.44] hover:opacity-70",
              )}
            >
              {/* .comparison-product-icon: w-10 */}
              <div className="size-10 bg-[position:0px_0px] bg-[size:auto_100%] bg-no-repeat" style={{ backgroundImage: `url(${p.icon})` }} />
              <div className={cn(fpText.labelM, "text-foreground")}>{p.name}</div>
            </button>
          ))}
        </div>

        {/* .product-page-tabs-content > .w-tab-pane > .tabs-video-wrapper
            Source CSS: flex col, gap-20px, py-20px */}
        <div className="flex flex-col gap-5 py-5">
          {/* Active product showcase — only .home-product-grid (no .home-product wrapper) */}
          <ForeplayHomeProductShowcase
            subtitle="" title="" description=""
            sidebarOverline={product.overline}
            sidebarTitle={product.title}
            ctaHref={product.ctaHref}
            learnMoreHref={product.learnMoreHref}
            tabs={product.tabs}
            sidebarVideoSrc={product.sidebarVideoSrc}
            tabImages={product.tabImages}
            gridOnly
          />
        </div>
      </ForeplaySectionContainer>
    </div>
  )
}
