// Foreplay GOADS Extension — info/install page inside tool design language.
// Spec: docs/foreplay/tool-design-language.md
// Pattern: hero copy + Install CTA + feature grid (bg-solid-25 cards).
// Copy mirrors homepage chromeExtension section (data/goads-home-content.ts).

import { Cookie, LogIn, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: LogIn,
    title: "Bypass BM Invites",
    description: "Auto-accept business manager invitations without the wait.",
  },
  {
    icon: Cookie,
    title: "Login by Cookie",
    description: "Restore sessions instantly from JSON cookies.",
  },
]

const CHROME_STORE_URL = "https://chrome.google.com/webstore"

export function ForeplayGoadsExtensionTool() {
  return (
    <>
      {/* Hero */}
      <div className="flex flex-col gap-5 max-md:gap-4">
        <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>
          Free Chrome Extension
        </span>
        <h2
          className={cn(
            fpText.displayH3,
            "text-[var(--fp-solid-900)] [text-wrap:balance]",
            "max-md:text-[1.75rem] max-md:leading-[2.25rem]",
          )}
        >
          Bypass Business Manager invites.
          <br />
          <span className="text-[var(--fp-solid-500)]">Login by cookie.</span>
        </h2>
        <p className={cn(fpText.bodyL, "text-[var(--fp-solid-500)]")}>
          Built by GOADS — Meta Asset specialists.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <ForeplayCtaButton href={CHROME_STORE_URL} variant="light-primary">
            Install Free
          </ForeplayCtaButton>
          <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
            Chrome only
          </span>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className={cn(
              "flex flex-col gap-3 rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-5 max-md:p-4",
              "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
              "hover:border-[var(--fp-solid-400)]",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-[10px] border border-[var(--fp-solid-50)] bg-white text-[var(--fp-solid-900)]">
              <Icon className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className={cn(fpText.labelL, "text-[var(--fp-solid-900)]")}>{title}</h3>
              <p className={cn(fpText.bodyS, "text-[var(--fp-solid-500)] [text-wrap:pretty]")}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
