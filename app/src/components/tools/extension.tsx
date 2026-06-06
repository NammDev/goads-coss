// Foreplay GOADS Extension — download + install page inside tool design language.
// Spec: docs/foreplay/tool-design-language.md
// Pattern: hero copy + Download CTA → /downloads/goads-extension.zip, then a
// "How to install" steps strip (manual / load-unpacked), then a feature grid.
// The extension is NOT on the Chrome Web Store — it ships as a downloadable zip
// that users load unpacked. Zip is built by extension/build-zip.sh.

import { Download, Link2, Cookie, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Link2,
    title: "BM Invite",
    description:
      "Invite users into your Business Manager by email, straight from the BM page — no invite link needed.",
  },
  {
    icon: Cookie,
    title: "Cookie Login",
    description:
      "Log in to any Facebook account by importing its cookie — no username or password.",
  },
]

const steps = [
  "Download the .zip and unzip it.",
  "Open chrome://extensions and turn on Developer mode (top-right).",
  'Click "Load unpacked" and select the GOADS-Extension folder.',
  "Open any website and click the GOADS icon to launch.",
]

const ZIP_URL = "/downloads/GOADS-Extension.zip"

export function ExtensionTool() {
  return (
    <>
      {/* Hero */}
      <div className="flex flex-col gap-5 max-md:gap-4">
        <span className={cn(siteText.overline, "text-[var(--solid-400)]")}>
          Free Chrome Extension · No sign-in
        </span>
        <h2
          className={cn(
            siteText.displayH3,
            "text-[var(--solid-900)] [text-wrap:balance]",
            "max-md:text-[1.75rem] max-md:leading-[2.25rem]",
          )}
        >
          BM Invite &amp; Cookie Login.
          <br />
          <span className="text-[var(--solid-500)]">In one extension.</span>
        </h2>
        <p className={cn(siteText.bodyL, "text-[var(--solid-500)]")}>
          Built by GOADS, Meta Asset specialists. Download, load it unpacked, and
          it works on any page.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <CtaButton
            href={ZIP_URL}
            download
            variant="light-primary"
            showIcon={false}
            leadingIcon={<Download className="size-4" />}
          >
            Download Extension
          </CtaButton>
          <span className={cn(siteText.bodyS, "text-[var(--solid-400)]")}>
            Chrome · .zip
          </span>
        </div>
      </div>

      {/* How to install — manual / load-unpacked steps */}
      <div className="rounded-[16px] border border-[var(--solid-50)] bg-[var(--solid-25)] p-5 max-md:p-4">
        <span className={cn(siteText.overline, "text-[var(--solid-400)]")}>How to install</span>
        <ol className="mt-3 flex flex-col gap-2.5">
          {steps.map((label, i) => (
            <li key={label} className={cn(siteText.bodyS, "flex items-center gap-3 text-[var(--solid-500)]")}>
              <span
                className={cn(
                  siteText.labelS,
                  "flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--solid-700)] shadow-[inset_0_0_0_1px_var(--solid-50)]",
                )}
              >
                {i + 1}
              </span>
              {label}
            </li>
          ))}
        </ol>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className={cn(
              "flex flex-col gap-3 rounded-[16px] border border-[var(--solid-50)] bg-[var(--solid-25)] p-5 max-md:p-4",
              "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
              "hover:border-[var(--solid-400)]",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-[10px] border border-[var(--solid-50)] bg-white text-[var(--solid-900)]">
              <Icon className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className={cn(siteText.labelL, "text-[var(--solid-900)]")}>{title}</h3>
              <p className={cn(siteText.bodyS, "text-[var(--solid-500)] [text-wrap:pretty]")}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
