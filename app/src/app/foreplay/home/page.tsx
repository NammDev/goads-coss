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
          subtitle="Research & Inspiration"
          title="Spark creative genius and crush competitors."
          description={<>Ad creative research is your shortcut to success. <br />Reverse engineer ads that are already crushing and identify trends.</>}
          sidebarOverline="Swipe File"
          sidebarTitle="Save ads from anywhere, forever"
          ctaHref="/sign-up"
          learnMoreHref="/swipe-file"
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
          sidebarOverline="Spyder"
          sidebarTitle="Automatically track competitors"
          ctaHref="/sign-up"
          learnMoreHref="/spyder"
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
          sidebarOverline="Discovery"
          sidebarTitle="The smartest ad search engine"
          ctaHref="/sign-up"
          learnMoreHref="/discovery"
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
          subtitle="Creative Analytics &amp; Production"
          title="Identify winning patterns and replicate success."
          description="Instantly turn insights into action. Uncover what's working across your ads and translate those learnings into crystal clear creative direction."
          sidebarOverline="Lens"
          sidebarTitle="Know what's working and why"
          ctaHref="/sign-up"
          learnMoreHref="/lens"
          tabs={lensTabs}
        />

        <ForeplayHomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Briefs"
          sidebarTitle="Go from concept to launched, faster"
          ctaHref="/sign-up"
          learnMoreHref="/briefs"
          tabs={briefsTabs}
          showSectionHead={false}
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
