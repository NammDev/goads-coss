// GoAds Tools mega-menu dropdown — clones Foreplay Resources layout pattern
// DOM structure: nav.nav-dropdown-menu > .nav-dropdown-menu-inner > .nav-resources-menu (grid-cols-12)
//   Row 1 "Data Processing" (col-span 9): 5 tools in grid-cols-5
//   Row 2 "Utilities" (col-span 9, border-t): 4 tools in grid-cols-5 (1 empty slot)
//   Banner (col-span 3, row-span 2): static gradient GoAds Toolbox CTA → /tools

import type { ReactElement } from "react"
import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayHeaderDropdownBase } from "@/components/foreplay/foreplay-header-dropdown-base"

interface ToolItem {
  label: string
  desc: string
  href: string
  icon: () => ReactElement
}

// Row 1 — primary tools (canonical TOOLS registry, 5 across)
const dataProcessingItems: ToolItem[] = [
  { label: "2FA Generator", desc: "Generate TOTP codes", href: "/tools/2fa", icon: ShieldIcon },
  { label: "Check Live UID", desc: "Check Facebook UIDs live/dead", href: "/tools/check-uid", icon: CopyIcon },
  { label: "Split Data Profile", desc: "Split text by delimiter", href: "/tools/split-data", icon: ScissorsIcon },
  { label: "IP Checker", desc: "Public IP & location info", href: "/tools/check-ip", icon: GlobeIcon },
  { label: "GOADS Extension", desc: "Free Chrome extension", href: "/tools/goads-extension", icon: CookieIcon },
]

// Row 2 — more (to be expanded later)
const utilitiesItems: ToolItem[] = [
  { label: "Temp Mail", desc: "Disposable inbox, instant", href: "/tempmail", icon: NotepadIcon },
]

export function ForeplayHeaderToolsMenu() {
  return (
    <ForeplayHeaderDropdownBase label="Tools">
      {/* .nav-dropdown-menu-inner — bg, border, rounded-28, overflow-hidden */}
      <div className="w-full overflow-hidden rounded-[28px] border border-[var(--fp-border-nav)] bg-background">
        {/* .nav-tools-menu — grid-cols-12, rows:auto auto (same as .nav-resources-menu) */}
        <div className="grid grid-cols-12 grid-rows-[auto_auto]">
          {/* Row 1: Data Processing — col-span 9 row 1 */}
          <div className="col-span-9 row-start-1 flex flex-col items-start gap-4 px-4 pt-4 pb-5">
            <NavOverlineTitle>Popular Tools</NavOverlineTitle>
            <ToolsList items={dataProcessingItems} />
          </div>

          {/* Toolbox banner — row-span 2, col-span 3, justify-self-end
              Static gradient card (no video). border-l, rounded-[18px], max-w-[275px], m-2.5, pt-[25px] pb-9 */}
          <a
            href="/tools"
            className="col-span-3 row-span-2 row-start-1 relative m-2.5 flex w-full max-w-[275px] items-start justify-center justify-self-end overflow-hidden rounded-[18px] border-l border-[var(--fp-border-nav)] pt-[25px] pb-9 no-underline transition-all duration-200 hover:opacity-80"
          >
            {/* .nav-banner-content — z-2, flex-col gap-1, items-center, max-w-[200px], text-center */}
            <div className="relative z-[2] flex max-w-[200px] flex-col items-center gap-1 text-center">
              {/* .text-solid-900 — dark text on light gradient */}
              <div className="text-[var(--fp-solid-900)]">
                <div className="flex items-center gap-[5px] whitespace-nowrap">
                  <div className="flex size-5 items-center justify-center">
                    <ToolboxIcon />
                  </div>
                  <div className={fpText.labelS}>GoAds Toolbox</div>
                </div>
              </div>
              {/* Description */}
              <div className="flex-1 text-left text-[var(--fp-solid-900)]">
                <div className={fpText.bodyS}>5 free tools for media buyers — security, data &amp; utilities.</div>
              </div>
              {/* CTA link */}
              <div className="mt-2 text-[var(--fp-solid-900)]">
                <div className={fpText.labelS}>Browse All Tools →</div>
              </div>
            </div>
            {/* Static gradient background layer (replaces video) */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e9eaef 0%, #c3c5d2 45%, #dddee5 100%)",
              }}
            />
          </a>

          {/* Row 2: Utilities — col-span 9 row 2, border-t */}
          <div className="col-span-9 row-start-2 flex flex-col items-start gap-4 border-t border-[var(--fp-border-nav)] px-4 pt-4 pb-5">
            <NavOverlineTitle>More</NavOverlineTitle>
            <ToolsList items={utilitiesItems} />
          </div>
        </div>
      </div>
    </ForeplayHeaderDropdownBase>
  )
}

// ── Sub-components mirroring Resources layout ──

function NavOverlineTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center rounded-[6px] p-2 text-[var(--fp-alpha-50)]">
      <div className={fpText.overline}>{children}</div>
    </div>
  )
}

// grid-cols-5 — same as Resources Learn/Earn lists
function ToolsList({ items }: { items: ToolItem[] }) {
  return (
    <ul className="m-0 grid w-full grid-cols-5 gap-3 self-stretch p-0">
      {items.map((item) => (
        <ToolsListItem key={item.label} item={item} />
      ))}
    </ul>
  )
}

function ToolsListItem({ item }: { item: ToolItem }) {
  const Icon = item.icon
  return (
    <li className="flex flex-1 list-none items-start">
      <Link
        href={item.href}
        className="flex flex-1 flex-col items-start justify-center gap-1 p-2 text-left text-[var(--fp-alpha-100)] no-underline transition-all duration-200 hover:opacity-80"
      >
        <div className="flex-1 text-foreground">
          <div className="flex items-center gap-[5px] whitespace-nowrap">
            <div className="flex size-5 items-center justify-center">
              <Icon />
            </div>
            <div className={fpText.labelS}>{item.label}</div>
          </div>
        </div>
        <div className="flex-1 text-left text-[var(--fp-alpha-100)]">
          <div className={fpText.bodyS}>{item.desc}</div>
        </div>
      </Link>
    </li>
  )
}

// ── Inline icons (white stroke, 20×20) ──
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5 3.75 5v4.5c0 3.5 2.5 6.8 6.25 8 3.75-1.2 6.25-4.5 6.25-8V5L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7.5 10 2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CookieIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 10a7.5 7.5 0 1 1-7.58-7.5c-.2.75-.05 1.58.47 2.19.52.62 1.34.91 2.13.77a2.15 2.15 0 0 0 2.6 2.56c-.16.96.3 1.9 1.17 2.35.86.45 1.93.31 2.66-.35.34.62.55 1.3.55 1.98Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="10" r="0.75" fill="currentColor" />
      <circle cx="11" cy="13" r="0.75" fill="currentColor" />
      <circle cx="13.5" cy="9.5" r="0.75" fill="currentColor" />
    </svg>
  )
}
function ScissorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="5.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.5" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m17 3-10 7.5M17 17 7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function NotepadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4.5" y="3" width="11" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 10h15M10 2.5c2 2.3 3 5 3 7.5s-1 5.2-3 7.5c-2-2.3-3-5-3-7.5s1-5.2 3-7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="6" y="6" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 3.5H5A1.5 1.5 0 0 0 3.5 5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function ToolboxIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <rect x="3" y="6" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 6V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6M3 10h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
