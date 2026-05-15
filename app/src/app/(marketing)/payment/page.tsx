// Foreplay /payment — hero (aboutus pattern) + Community & Resources section.

import type { Metadata } from "next"
import {
  ForeplaySectionContainer,
  ForeplayHomeFeaturesGrid,
  ForeplayCtaButton,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { paymentHero } from "@/data/goads-payment-page-data"

export const metadata: Metadata = {
  title: "Payment Methods | GoAds",
  description:
    "Secure, flexible payment options to fund your GoAds account the way that works best for your business.",
}

export default function ForeplayPaymentPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <ForeplayUniversityHero
        bgImage={paymentHero.bgImage}
        title={
          <>
            <span className="text-foreground">Flexible Payment</span>
            <br />
            <span className="text-[var(--fp-alpha-100)]">Options for Every Client</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            {paymentHero.description}
          </p>
          <ForeplayCtaButton href={paymentHero.ctaHref} variant="hero">
            {paymentHero.ctaLabel}
          </ForeplayCtaButton>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Community & Resources ═══ */}
      <section className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeFeaturesGrid />
        </ForeplaySectionContainer>
      </section>
    </>
  )
}
