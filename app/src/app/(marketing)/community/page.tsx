// /community — "under construction" placeholder. Hub coming later; for now we
// route community engagement to Telegram (real-time team chat already exists).

import type { Metadata } from "next"

import { CtaButton } from "@/components/atoms/cta-button"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { CONTACT } from "@/data/contact-info"

export const metadata: Metadata = {
  title: "Community | GOADS",
  description:
    "The GOADS community hub is under construction. In the meantime, join us on Telegram for live conversations with media buyers and our team.",
}

export default function CommunityPage() {
  return (
    <section className="section">
      <SectionContainer>
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 py-24 text-center max-md:py-16">
          {/* Construction icon — minimal, on-brand stroke */}
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--alpha-600)] bg-[var(--alpha-700)] text-foreground">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9.333 4h13.334l2 6.667h-17.334L9.333 4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M5.333 10.667h21.334V25.333a2.667 2.667 0 0 1-2.667 2.667H8a2.667 2.667 0 0 1-2.667-2.667V10.667Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M13.333 16.667h5.334M13.333 21.333h5.334"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <SectionHead
            subtitle="COMMUNITY"
            title="We're building something great"
            titleTag="h1"
            titleSize="h2"
            description="Our community hub is under construction. While we put the finishing touches on it, jump into our Telegram, real conversations with media buyers, agencies and the GOADS team."
            descSize="l"
            variant="light"
          />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <CtaButton href={CONTACT.telegram.officialWithMessage} variant="hero">
              Join us on Telegram
            </CtaButton>
            <CtaButton href="/contact" variant="secondary" showIcon={false}>
              Contact us
            </CtaButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
