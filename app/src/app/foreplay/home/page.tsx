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
            "/foreplay/meta%20assets.svg",
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
            "/foreplay/landingpage/solutions/Mask%20group.svg",
            "/foreplay/landingpage/solutions/Mask%20group%20(1).svg",
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
            "/foreplay/landingpage/technology/Mask%20group%20(2).svg",
            "/foreplay/landingpage/technology/Mask%20group%20(2).svg",
            "/foreplay/landingpage/technology/Mask%20group%20(2).svg",
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
          tabImages={[
            "/foreplay/landingpage/service/Mask%20group.svg",
            "/foreplay/landingpage/service/Mask%20group%20(1).svg",
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
