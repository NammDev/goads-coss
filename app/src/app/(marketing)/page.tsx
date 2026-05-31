import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeChromeExtension } from "@/components/home/chrome-extension"
import { HomeCollab } from "@/components/home/collab"
import { HomeCta } from "@/components/home/cta"
import { HomeFeaturesGrid } from "@/components/home/features-grid"
import { HomeHero } from "@/components/home/hero"
import { HomeProductShowcase } from "@/components/home/product-showcase"
import { assetsTabs, solutionsTabs, platformsTabs, technologyTabs, supportTabs } from "@/data/home-product-tabs"

export default function HomePage() {
  return (
    <>
      {/* Section 0: Hero (dark bg + dot grid) */}
      <section className="relative">
        <DotBg />
        <SectionContainer>
          <HomeHero />
        </SectionContainer>
      </section>

      {/* Section 1: Product Showcases (white founder block removed — was empty placeholder) */}
      <section className="section">
        <HomeProductShowcase
          subtitle="PRODUCTS & SOLUTIONS"
          title="Infrastructure designed for your success"
          description="Verified assets, instant delivery, real support. Everything you need to keep your ads live."
          sidebarOverline="Assets"
          sidebarTitle="Premium assets, ready to scale"
          ctaHref="/pricing"
          learnMoreHref="/docs"
          tabs={assetsTabs}
          tabImages={[
            // [0] Meta Assets → custom GoAds visual; [1] TikTok Assets → original (unchanged)
            "/assets/meta-assets.webp",
            "/assets/tiktok%20asset.svg",
          ]}
        />

        {/* Spyder — no section head (shares with Swipe File) */}
        <HomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Solutions"
          sidebarTitle="Fix issues, stay scaling"
          ctaHref="/pricing"
          learnMoreHref="/docs"
          tabs={solutionsTabs}
          tabImages={[
            // [0] Unban & Recovery, [1] Verified Services — both custom GoAds visuals
            "/assets/unban-extension.webp",
            "/assets/verified-services.webp",
          ]}
          showSectionHead={false}
        />

        {/* Discovery — no section head */}
        <HomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Agency Ad Accounts"
          sidebarTitle="Grow without limits"
          ctaHref="/pricing"
          learnMoreHref="/docs"
          tabs={platformsTabs.filter(
            (t) => t.label !== "TikTok" && t.label !== "Google",
          )}
          tabImages={[
            "/assets/agency-ad-account.webp",
            "/assets/agency-ad-account.webp",
          ]}
          showSectionHead={false}
        />

        {/* Chrome Extension banner */}
        <div className="py-20">
          <HomeChromeExtension />
        </div>
      </section>

      {/* Section: "Identify winning patterns" — Lens + Briefs */}
      <section className="section">
        <HomeProductShowcase
          subtitle="TOOLS & SERVICES"
          title="Powerful tools built from real experience"
          description="Extensions, tools and services designed to solve real problems. So you can focus on scaling."
          sidebarOverline="Technology"
          sidebarTitle="Optimize Your Workflow"
          ctaHref="/tools/goads-extension"
          learnMoreHref="/docs"
          tabs={technologyTabs}
          tabImages={[
            // [0] All Tools → tools library; [1] GoAds Extensions → launcher (both custom)
            "/assets/all-tools.webp",
            "/assets/extension-launcher.webp",
            "/assets/extension-launcher.webp",
          ]}
        />

        <HomeProductShowcase
          subtitle="" title="" description=""
          sidebarOverline="Service"
          sidebarTitle="Always On, Always Reliable"
          ctaHref="/pricing"
          learnMoreHref="/docs"
          tabs={supportTabs}
          showSectionHead={false}
          tabImages={[
            // [0] 24/7 support, [1] Quick replacements — custom GoAds visuals
            "/assets/service-support.webp",
            "/assets/service-replacements.webp",
          ]}
        />
      </section>

      {/* Section 2: Collaboration — white block */}
      <section className="section">
        <SectionWhiteBlock>
          <HomeCollab />
        </SectionWhiteBlock>
      </section>

      {/* Section 3: Features — "Miles beyond the status quo" */}
      <section className="section">
        {/* Uses .container (1440px) not .section-container (1216px) */}
        <SectionContainer variant="wide">
          <HomeFeaturesGrid />
        </SectionContainer>
      </section>
      {/* Final CTA — "Ready to ship more winning ads?" */}
      <div className="overflow-hidden">
        <SectionContainer>
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
