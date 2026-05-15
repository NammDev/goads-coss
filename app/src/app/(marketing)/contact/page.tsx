// Foreplay /contact — hero (aboutus pattern) + Community & Resources section.

import type { Metadata } from "next"
import {
  ForeplaySectionContainer,
  ForeplayContactChannels,
  ForeplayCtaButton,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { contactHero } from "@/data/goads-contact-page-data"

export const metadata: Metadata = {
  title: "Contact | GoAds",
  description:
    "Get in touch with the GoAds team — real people, fast answers, 24/7 support across Telegram, WhatsApp and Discord.",
}

export default function ForeplayContactPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <ForeplayUniversityHero
        bgImage={contactHero.bgImage}
        title={
          <>
            <span className="text-foreground">Get in Touch</span>
            <br />
            <span className="text-[var(--fp-alpha-100)]">With Our Team</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            {contactHero.description}
          </p>
          <ForeplayCtaButton href={contactHero.ctaHref} variant="hero">
            {contactHero.ctaLabel}
          </ForeplayCtaButton>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Contact channels ═══ */}
      <section className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayContactChannels />
        </ForeplaySectionContainer>
      </section>
    </>
  )
}
