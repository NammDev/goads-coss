import {
  ForeplaySectionContainer,
  ForeplayDotBg,
  ForeplaySectionWhiteBlock,
  ForeplayHomeHero,
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

      {/* Section 1: Product Showcases (white founder block removed — was empty placeholder) */}
      <section className="section">
        <ForeplayHomeProductShowcase
          subtitle="PRODUCTS & SOLUTIONS"
          title="Infrastructure designed for your success"
          description="Verified assets, instant delivery, real support. Everything you need to keep your ads live."
          sidebarOverline="Assets"
          sidebarTitle="Premium assets, ready to scale"
          ctaHref="/agency-ad-account"
          learnMoreHref="/agency-ad-account"
          tabs={swipeFileTabs}
          tabImages={[
            // [0] Meta Assets → custom GoAds visual; [1] TikTok Assets → original (unchanged)
            "/foreplay/goads/goads-meta-assets.webp",
            "/foreplay/tiktok%20asset.svg",
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
          tabImages={[
            // [0] Unban & Recovery, [1] Verified Services — both custom GoAds visuals
            "/foreplay/goads/goads-unban-extension.webp",
            "/foreplay/goads/goads-verified-services.webp",
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
          tabImages={[
            "/foreplay/goads/goads-agency-ad-account.webp",
            "/foreplay/goads/goads-agency-ad-account.webp",
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
          tabImages={[
            // [0] All Tools → tools library; [1] GoAds Extensions → launcher (both custom)
            "/foreplay/goads/goads-all-tools.webp",
            "/foreplay/goads/goads-extension-launcher.webp",
            "/foreplay/goads/goads-extension-launcher.webp",
          ]}
        />

        <ForeplayHomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Service"
          sidebarTitle="Always On, Always Reliable"
          ctaHref="/book-demo"
          learnMoreHref="/book-demo"
          tabs={briefsTabs}
          showSectionHead={false}
          tabImages={[
            // [0] 24/7 support, [1] Quick replacements — custom GoAds visuals
            "/foreplay/goads/goads-service-support.webp",
            "/foreplay/goads/goads-service-replacements.webp",
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
