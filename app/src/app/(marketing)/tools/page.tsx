// /tools — GoAds tools landing. Grid of all free utilities.

import Link from "next/link"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { HomeCta } from "@/components/home/cta"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"

interface ToolCard {
  title: string
  description: string
  href: string
}

const tools: ToolCard[] = [
  { title: "2FA Generator", description: "Generate TOTP two-factor codes from your secrets.", href: "/tools/2fa" },
  { title: "Check Live UID", description: "Verify if Facebook UIDs are live or dead.", href: "/tools/check-uid" },
  { title: "Split Data Profile", description: "Split text by delimiter, line, or token.", href: "/tools/split-data" },
  { title: "IP Checker", description: "Public IP address, geolocation, and ISP info.", href: "/tools/check-ip" },
  { title: "GOADS Extension", description: "Free Chrome extension for media buyers.", href: "/tools/goads-extension" },
  { title: "Temp Mail", description: "Disposable inbox, instant, no signup.", href: "/tempmail" },
]

export default function ToolsPage() {
  return (
    <>
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle="Free Tools"
              title="Tools for media buyers"
              titleSize="h2"
              description="A growing collection of free utilities to make your day-to-day faster."
              descSize="l"
              variant="light"
            />

            <div className="grid grid-cols-1 gap-4 pt-12 max-md:pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cn(
                    "group flex flex-col gap-2 rounded-[16px] border border-[var(--solid-50)] bg-white p-6 no-underline transition-all duration-200 hover:border-[var(--solid-400)] hover:shadow-md",
                  )}
                >
                  <h3 className={cn(siteText.headingM, "text-[var(--solid-900)]")}>{t.title}</h3>
                  <p className={cn(siteText.bodyM, "text-[var(--solid-400)]")}>{t.description}</p>
                </Link>
              ))}
            </div>
          </SectionContainer>
        </div>
      </div>

      <div className="section overflow-hidden">
        <SectionContainer>
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
