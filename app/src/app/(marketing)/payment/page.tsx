// Foreplay /payment — hero (aboutus pattern) + Community & Resources section.

import type { Metadata } from "next"
import { CtaButton } from "@/components/atoms/cta-button"
import { SectionContainer } from "@/components/atoms/section-container"
import { HomeFeaturesGrid } from "@/components/home/features-grid"
import type { HomeFeatureCard } from "@/components/home/features-grid"
import { UniversityHero } from "@/components/university/hero"
import { paymentHero } from "@/data/payment-page-content"
import { CONTACT } from "@/data/contact-info"

// PAYMENT METHODS — reuses the features-grid UI (3-card layout). Images left
// empty → "Illustration coming soon" placeholder until final art is ready.
const paymentMethodCards: HomeFeatureCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.667" />
        <path d="M9.5 8h3.25a2.25 2.25 0 0 1 0 4.5H9.5m0 0h3.5a2.25 2.25 0 0 1 0 4.5H9.5m0-9V6.5m0 11V16m0-8v8m2-9.5v-1m0 12v-1" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Crypto",
    description:
      "Pay with USDT (TRC20 / ERC20). Instant confirmation, transparent rate, no hidden fees.",
    ctaLabel: "Pay with Crypto",
    ctaHref: CONTACT.telegram.officialWithMessage,
    image: "/payment/crypto.svg",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 7h11l-2.5-2.5M19 17H8l2.5 2.5" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7l4 7h2l-3-7m4 3l3 7h2l-4-10" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Wise",
    description:
      "International bank transfer via Wise. Multi-currency, low fees, real exchange rate.",
    ctaLabel: "Pay with Wise",
    ctaHref: CONTACT.telegram.officialWithMessage,
    isMiddle: true,
    image: "/payment/wise.svg",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5.5h14c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5h-7l-4 3v-3H5c-.83 0-1.5-.67-1.5-1.5V7c0-.83.67-1.5 1.5-1.5Z" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" />
      </svg>
    ),
    title: "Need another method?",
    description:
      "Prefer a different payment option? Contact our team and we'll find the right setup for you.",
    ctaLabel: "Contact us",
    ctaHref: "/contact",
    image: "/payment/support.svg",
  },
]

export const metadata: Metadata = {
  title: "Payment Methods | GOADS",
  description:
    "Secure, flexible payment options to fund your GOADS account the way that works best for your business.",
}

export default function PaymentPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <UniversityHero
        bgImage={paymentHero.bgImage}
        title={
          <>
            <span className="text-foreground">Flexible Payment</span>
            <br />
            <span className="text-[var(--alpha-100)]">Options for Every Client</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--alpha-50)] [text-wrap:balance]">
            {paymentHero.description}
          </p>
          <CtaButton href={paymentHero.ctaHref} variant="hero">
            {paymentHero.ctaLabel}
          </CtaButton>
        </div>
      </UniversityHero>

      {/* ═══ Section 2: COMMUNITY & RESOURCES ═══ */}
      <section className="section">
        <SectionContainer variant="wide">
          <HomeFeaturesGrid
            subtitle="PAYMENT METHODS"
            title="Pay the way you prefer"
            description="Fund your account with the method that suits you best. Need something else? Just reach out."
            cards={paymentMethodCards}
            imageFade
          />
        </SectionContainer>
      </section>
    </>
  )
}
