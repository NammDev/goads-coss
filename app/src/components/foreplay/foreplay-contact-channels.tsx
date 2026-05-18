// Foreplay contact channels — real support channels grid for /contact.
// Data sourced from the single source of truth CONTACT (contact-info.ts).

import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { TelegramLogo, WhatsAppLogo } from "@/assets/svg/ad-platform-logos"
import { CONTACT } from "@/data/contact-info"

const channels = [
  {
    name: "Telegram",
    handle: "@goads_official",
    description: "Fastest way to reach us. Live support, 24/7.",
    href: CONTACT.telegram.officialWithMessage,
    cta: "Message on Telegram",
    icon: <TelegramLogo className="size-7" />,
  },
  {
    name: "WhatsApp",
    // Phone number intentionally hidden — button links directly to the line.
    handle: "Direct line · 24/7",
    description: "Prefer WhatsApp? We answer there too.",
    href: CONTACT.whatsapp.withMessage,
    cta: "Chat on WhatsApp",
    icon: <WhatsAppLogo className="size-7" />,
  },
  {
    name: "Email",
    handle: CONTACT.email,
    description: "For detailed requests, invoices and documents.",
    href: `mailto:${CONTACT.email}`,
    cta: "Send an Email",
    icon: <MailIcon />,
  },
]

export function ForeplayContactChannels() {
  return (
    <div className="py-27">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-12">
        <ForeplaySectionHead
          subtitle="GET IN TOUCH"
          title="Reach us your way"
          titleTag="h2"
          titleSize="h2"
          description="Real people, fast answers, no tickets. Pick the channel that works for you."
          descSize="l"
          variant="light"
        />

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {channels.map((c) => (
            // Foreplay card (.home-winning-card spec): rounded-[24px],
            // 1px solid-50 hairline ring, p-6, gap-6, overflow-hidden.
            <div
              key={c.name}
              className="relative flex flex-col gap-6 overflow-hidden rounded-[24px] bg-[var(--fp-alpha-700)] p-6 shadow-[0_0_0_1px_var(--fp-solid-50)] transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:shadow-[0_0_0_1px_var(--fp-alpha-300)]"
            >
              {/* icon tile — foreplay icon container: size-12, rounded-[12px],
                  1px alpha-600 hairline, on background */}
              <div className="flex size-12 items-center justify-center rounded-[12px] border border-[var(--fp-alpha-600)] bg-background">
                {c.icon}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3 className={`${fpText.labelL} text-foreground`}>{c.name}</h3>
                <p className={`${fpText.labelS} text-[var(--fp-alpha-100)]`}>{c.handle}</p>
                <p className={`${fpText.bodyS} text-[var(--fp-alpha-50)]`}>{c.description}</p>
              </div>

              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${fpText.labelS} inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-primary px-4 py-2.5 text-primary-foreground no-underline transition-all duration-150 hover:bg-[var(--fp-alpha-50)]`}
              >
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
