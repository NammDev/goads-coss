import {
  ForeplaySectionContainer,
  ForeplayDotBg,
  ForeplaySectionWhiteBlock,
  ForeplayHomeHero,
  ForeplayHomeWinning,
  ForeplayHomeProductShowcase,
  ForeplayHomeChromeExtension,
  ForeplayHomeCollab,
  ForeplayHomeFeaturesGrid,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { swipeFileTabs, spyderTabs, discoveryTabs, lensTabs, briefsTabs } from "@/data/foreplay-product-tabs"

export default function ForeplayHomePage() {
  return (
    <>
      {/* Section 0: Hero (dark bg + dot grid) */}
      <section className="relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer>
          <ForeplayHomeHero />
        </ForeplaySectionContainer>
      </section>

      {/* Section 1: Before/After + Product Showcases */}
      <section className="section">
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayHomeWinning />
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>

        <ForeplayHomeProductShowcase
          subtitle="PRODUCTS & SOLUTIONS"
          title="Infrastructure designed for your success"
          description="Verified assets, instant delivery, real support. Everything you need to keep your ads live."
          sidebarOverline="Assets"
          sidebarTitle="Premium assets, ready to scale"
          ctaHref="/agency-ad-account"
          learnMoreHref="/agency-ad-account"
          tabs={swipeFileTabs}
          sidebarVideoSrc="/video/cta-swipe-file.mov"
          tabImages={[
            "/foreplay/Group429.png",
            "/foreplay/swipe_tab2.webp",
            "/foreplay/swipe_tab3.webp",
          ]}
        />

        {/* Spyder — no section head (shares with Swipe File) */}
        <ForeplayHomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Solutions"
          sidebarTitle="Fix issues, stay scaling"
          ctaHref="/unban"
          learnMoreHref="/unban"
          tabs={spyderTabs}
          sidebarVideoSrc="/video/cta-spyder.mov"
          tabImages={[
            "/foreplay/6810ff44da8facf8efaa1529_Spyder-1.webp",
            "/foreplay/6810ff44da8facf8efaa1529_Spyder-1.webp",
          ]}
          showSectionHead={false}
        />

        {/* Discovery — no section head */}
        <ForeplayHomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Agency Ad Accounts"
          sidebarTitle="Grow without limits"
          ctaHref="/agency-ad-account"
          learnMoreHref="/agency-ad-account"
          tabs={discoveryTabs}
          sidebarVideoSrc="/video/cta-discovery.mov"
          tabImages={[
            "/foreplay/discovery.webp",
            "/foreplay/discovery.webp",
          ]}
          showSectionHead={false}
        />

        {/* Chrome Extension banner */}
        <div className="py-20">
          <ForeplayHomeChromeExtension />
        </div>
      </section>

      {/* Section: "Identify winning patterns" — Lens + Briefs */}
      <section className="section">
        <ForeplayHomeProductShowcase
          subtitle="TOOLS & SERVICES"
          title="Powerful tools built from real experience"
          description="Extensions, tools and services designed to solve real problems. So you can focus on scaling."
          sidebarOverline="Technology"
          sidebarTitle="Optimize Your Workflow"
          ctaHref="/tools"
          learnMoreHref="/tools"
          tabs={lensTabs}
          sidebarVideoSrc="/video/lens_video.mp4"
          tabImages={[
            "/foreplay/lens_tab1.webp",
            "/foreplay/lens_tab2.webp",
            "/foreplay/lens_tab3.webp",
          ]}
        />

        <ForeplayHomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Service"
          sidebarTitle="Always On, Always Reliable"
          ctaHref="/talk-to-sales"
          learnMoreHref="/talk-to-sales"
          tabs={briefsTabs}
          showSectionHead={false}
          sidebarVideoSrc="/video/brief_video.webm"
          tabImages={[
            "/foreplay/brief_tab1.webp",
            "/foreplay/brief_tab2.webp",
          ]}
        />
      </section>

      {/* Section 2: Collaboration — white block */}
      <section className="section">
        <ForeplaySectionWhiteBlock>
          <ForeplayHomeCollab />
        </ForeplaySectionWhiteBlock>
      </section>

      {/* Section 3: Features — "Miles beyond the status quo" */}
      <section className="section">
        {/* Uses .container (1440px) not .section-container (1216px) */}
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeFeaturesGrid />
        </ForeplaySectionContainer>
      </section>
      {/* Final CTA — "Ready to ship more winning ads?" */}
      <div className="overflow-hidden">
        <ForeplaySectionContainer>
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
