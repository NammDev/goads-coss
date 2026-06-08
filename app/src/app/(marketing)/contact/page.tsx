// Foreplay /contact — hero (aboutus pattern) + Community & Resources section.

import type { Metadata } from "next"
import { CtaButton } from "@/components/atoms/cta-button"
import { SectionContainer } from "@/components/atoms/section-container"
import { UniversityHero } from "@/components/university/hero"
import {
  HomeFeaturesGrid,
  type HomeFeatureCard,
} from "@/components/home/features-grid"
import { contactHero } from "@/data/contact-page-data"
import { TelegramLogo, WhatsAppLogo } from "@/assets/svg/ad-platform-logos"
import { CONTACT } from "@/data/contact-info"

// GET IN TOUCH channels — reuses the features-grid UI (3-card layout + images
// kept as placeholders for now; channel logo images to be swapped in later).
const contactChannelCards: HomeFeatureCard[] = [
  {
    icon: <TelegramLogo className="size-6" />,
    title: "Telegram",
    description:
      "@goads_official, Fastest way to reach us. Live support, 24/7.",
    ctaLabel: "Message on Telegram",
    ctaHref: CONTACT.telegram.officialWithMessage,
    image: "/contact/telegram.webp",
  },
  {
    icon: <WhatsAppLogo className="size-6" />,
    title: "WhatsApp",
    description:
      "Direct line · 24/7, Prefer WhatsApp? We answer there too.",
    ctaLabel: "Chat on WhatsApp",
    ctaHref: CONTACT.whatsapp.withMessage,
    isMiddle: true,
    image: "/contact/whats%20app.webp",
  },
  {
    icon: <MailIcon />,
    title: "Email",
    description: `${CONTACT.email}, For detailed requests, invoices and documents.`,
    ctaLabel: "Send an Email",
    ctaHref: `mailto:${CONTACT.email}`,
    image: "/contact/gmail.webp",
  },
]

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: "Contact | GOADS",
  description:
    "Get in touch with the GOADS team, real people, fast answers, 24/7 support across Telegram, WhatsApp and Discord.",
}

export default function ContactPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <UniversityHero
        bgImage={contactHero.bgImage}
        title={
          <>
            <span className="text-foreground">Get in Touch</span>
            <br />
            <span className="text-[var(--alpha-100)]">With Our Team</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--alpha-50)] [text-wrap:balance]">
            {contactHero.description}
          </p>
          <CtaButton href={contactHero.ctaHref} variant="hero">
            {contactHero.ctaLabel}
          </CtaButton>
        </div>
      </UniversityHero>

      {/* ═══ Section 2: COMMUNITY & RESOURCES ═══ */}
      <section className="section">
        <SectionContainer variant="wide">
          <HomeFeaturesGrid
            subtitle="GET IN TOUCH"
            title="Reach us your way"
            description="Real people, fast answers, no tickets. Pick the channel that works for you."
            cards={contactChannelCards}
            imageFade
          />
        </SectionContainer>
      </section>
    </>
  )
}
