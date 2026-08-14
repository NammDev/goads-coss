// Meta Asset Rental — /rental
//
// Rhythm: dark hero → WHITE block plan cards → dark "why rent" → FAQ → CTA.
//
// Section padding follows the Foreplay scale used by the product pages
// (`py-[108px] max-md:py-24 max-sm:py-20` = --py-section / -md / -sm). The hero
// keeps the pricing-page opening of pt-[72px], since the sticky header already
// supplies visual space above it.

import type { Metadata } from "next"

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { CtaButton } from "@/components/atoms/cta-button"
import { CrossLinkPanel } from "@/components/atoms/cross-link-panel"
import { HomeChromeExtension } from "@/components/home/chrome-extension"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { ProductUseCaseCarousel } from "@/components/product/use-case-carousel"
import { ProductPageFeatureTabs } from "@/components/product/page-feature-tabs"
import { ProductPageFeatureGridCards } from "@/components/product/page-feature-grid-cards"
import { ProductPageTestimonial } from "@/components/product/page-testimonial"
import { ProductPageCtaCard } from "@/components/product/page-cta-card"
import { SaveIcon, TagIcon, ShareIcon } from "@/components/misc/swipe-file-tab-icons"
import { RentalHero } from "@/components/rental/rental-hero"
import { RentalIntentDialog } from "@/components/rental/rental-intent-dialog"
import { RentalPlans } from "@/components/rental/rental-plans"
import { RentalBenefits } from "@/components/rental/rental-benefits"
import { RentalComparisonTable } from "@/components/rental/rental-comparison-table"
import {
  LOWEST_MONTHLY_FEE,
  RENTAL_FAQ_ITEMS,
  formatMonthlyFee,
} from "@/data/rental-page-data"
import {
  rentalUseCases,
  rentalCoreFeaturesSection,
  rentalCoreFeatureTabs,
  rentalFeatureGrid1,
  rentalTestimonial1,
  rentalFeatureGrid2,
  rentalTestimonial2,
  rentalProductCta,
} from "@/data/rental-showcase-data"

// Tab icons live on the component, not in the data file — same merge the
// product pages do, so the data stays serialisable.
const tabsWithIcons = rentalCoreFeatureTabs.map((tab, i) => ({
  ...tab,
  icon: [<SaveIcon key="save" />, <TagIcon key="tag" />, <ShareIcon key="share" />][i],
}))

export const metadata: Metadata = {
  title: "Meta Asset Rental | GOADS",
  description: `Rent a full Meta stack by the month from ${formatMonthlyFee(LOWEST_MONTHLY_FEE)}. Ad accounts, Business Manager, profiles and pages included, with unlimited same-day replacement on every asset. Plans for standard and high-risk verticals.`,
}

export default function RentalPage() {
  return (
    <>
      {/* Buy-or-rent question, once per browser. Rendered first so it is mounted
          before anything below can steal focus. */}
      <RentalIntentDialog />

      {/* ═══ Hero ═══
          Same mount as every other product page (/agency-ad-account, /bm …):
          `wide` container, dot grid, no wrapper padding — ProductHero inside
          RentalHero carries its own --py-section scale.

          NOT overflow-hidden: ProductHero's opening animation is position:sticky
          and a clipping ancestor would disable it. */}
      <section id="product-hero-section" className="section relative">
        <DotBg />
        <SectionContainer variant="wide">
          <RentalHero />
        </SectionContainer>
      </section>

      {/* ═══ Plan cards — the signature white block ═══ */}
      <RentalPlans />

      {/* ═══ Use cases ═══
          Straight after the plans, and ahead of the comparison: "is this built
          for someone like me" lands before "how does it compare".

          Padding is the /agency-ad-account block untouched — there it also
          follows a white block, so the leading py-[108px] + pt-12 is the gap
          that belongs against a white edge. */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          <div className="block pt-12 max-md:pt-10">
            <SectionContainer variant="section">
              <SectionHead
                subtitle={rentalUseCases.subtitle}
                title={rentalUseCases.title}
                titleTag="h2"
                titleSize="h2"
                description={rentalUseCases.description}
                descSize="l"
                variant="light"
              />
            </SectionContainer>

            <ProductUseCaseCarousel cards={rentalUseCases.cards} />
          </div>
        </div>
      </div>

      {/* ═══ GOADS vs a typical agency account ═══
          The customer has seen the price and who it is for; the next question is
          what that price actually buys compared with renting anywhere else. */}
      <section>
        <SectionContainer variant="section">
          <div className="flex flex-col gap-12 py-[108px] max-md:gap-10 max-md:py-24 max-sm:gap-8 max-sm:py-20">
            <SectionHead
              subtitle="The difference"
              title="Not every rented account is the same"
              titleTag="h2"
              titleSize="h2"
              description="How our rentals compare with a typical agency account."
              descSize="l"
              variant="light"
            />
            <RentalComparisonTable />
          </div>
        </SectionContainer>
      </section>

      {/* ═══ Core features tabs + Chrome extension ═══
          Sits ahead of "Why rent": how the thing works, then the argument for
          renting it. */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle={rentalCoreFeaturesSection.subtitle}
              title={rentalCoreFeaturesSection.title}
              titleTag="h2"
              titleSize="h2"
              variant="light"
            />

            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureTabs tabs={tabsWithIcons} />

              <div className="mt-8 max-fp-sm:hidden">
                <HomeChromeExtension />
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>

      {/* ═══ Why rent ═══
          No top padding: the section above always supplies its own 108px
          bottom, and doubling it opens a hole in the middle of the argument. */}
      <section>
        <SectionContainer variant="section">
          <div className="flex flex-col gap-12 pb-[108px] max-md:gap-10 max-md:pb-24 max-sm:gap-8 max-sm:pb-20">
            <SectionHead
              subtitle="Why rent"
              title="Your budget belongs in ads, not in assets"
              titleTag="h2"
              titleSize="h2"
              variant="light"
            />
            <RentalBenefits />

            {/* Back to the plans — the section argues for renting, so it should
                end at the thing you rent, not leave the reader to scroll up. */}
            <div className="flex justify-center">
              <CtaButton href="#plans" variant="hero">
                See rental plans
              </CtaButton>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ═══ Feature grids + testimonials (single container) ═══ */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle={rentalFeatureGrid1.subtitle}
              title={rentalFeatureGrid1.title}
              titleTag="h2"
              titleSize="h2"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={rentalFeatureGrid1.cards} />
            </div>

            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...rentalTestimonial1} />
              </div>
            </div>

            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={rentalFeatureGrid2.cards} />
            </div>

            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...rentalTestimonial2} />
              </div>
            </div>
          </SectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* ═══ Product CTA card ═══ */}
      <div className="section">
        <SectionContainer>
          <ProductPageCtaCard
            {...rentalProductCta}
            ctaHref="#plans"
            ctaLabel="See rental plans"
            contentClassName="md:max-w-[72%]"
          />
        </SectionContainer>
      </div>

      {/* ═══ FAQ ═══
          No wrapper padding: ProductPageFaqAccordion carries Foreplay's own
          `.faq` spacing (py-[140px] / max-md:py-20). Adding a section rhythm on
          top of it doubles the gap — this is how /bm and the other product pages
          mount it too. */}
      <section>
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion title="Rental questions answered" items={RENTAL_FAQ_ITEMS} />
        </SectionContainer>
      </section>

      {/* ═══ Way out to the one-time catalog ═══
          The arrival dialog offers this too, but only once per browser. Someone
          who dismissed it, or who read the whole page before deciding renting is
          not for them, needs a route out that is still on the page. */}
      <section>
        <SectionContainer variant="section">
          <div className="pb-[108px] max-md:pb-24 max-sm:pb-20">
            <CrossLinkPanel
              overline="PREFER TO BUY?"
              body="Every asset here can be bought outright instead: ad accounts, Business Managers, profiles and pages, one-time, yours to keep."
              ctaLabel="See the catalog"
              ctaHref="/pricing"
            />
          </div>
        </SectionContainer>
      </section>

    </>
  )
}
