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
            "/foreplay/landingpage/assets/Rectangle%20652.svg",
            "/foreplay/landingpage/assets/Rectangle%20653.svg",
            "/foreplay/landingpage/assets/Rectangle%20652.svg",
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
          sidebarVideoSrc="/video/brief_video.webm"
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
