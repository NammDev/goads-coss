// Foreplay mobile nav — .nav-menu column dropdown (≤991px) with inline accordion.
// Hamburger ↔ X drops a column panel below the bar (anchored to relative .nav-stack),
// matching Foreplay's mobile .nav-menu-inner. Product / Tools / Resources expand
// inline; everything flush-left (padding-left:0). Data + icons in nav-menu-items.tsx.
//
// Layouts mirror Foreplay's per-menu designs:
//   Product / Tools → stacked (icon + title above desc) — nav-product-menu badges
//   Resources       → inline (icon + label + desc on one row) — nav-resources-menu

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { ImageWithSkeleton } from "@/components/atoms/image-with-skeleton"
import {
  PRODUCT_GROUPS, TOOLS_GROUPS, RESOURCES_GROUPS,
  type NavMenuGroup,
} from "@/components/layout/nav-menu-items"
import { CONTACT } from "@/data/contact-info"

type Section =
  | { label: string; href: string }
  | { label: string; groups: NavMenuGroup[]; inline?: boolean }

const SECTIONS: Section[] = [
  { label: "Product", groups: PRODUCT_GROUPS },
  { label: "Tools", groups: TOOLS_GROUPS },
  { label: "Resources", groups: RESOURCES_GROUPS, inline: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a Demo", href: "/book-demo" },
]

// .text-navlink @≤991 — Inter Display 20px/28px 600
const navText = "font-display text-[1.25rem] font-semibold leading-[1.75rem] [font-optical-sizing:auto]"

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false); setExpanded(null) }, [pathname])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Prefetch submenu product icons as soon as the menu opens, so they're cached
  // by the time the user expands "Product" — no "pop", skeleton barely shows.
  useEffect(() => {
    if (!open) return
    const urls = SECTIONS.flatMap((s) =>
      "groups" in s ? s.groups.flatMap((g) => g.items.map((it) => it.img).filter(Boolean) as string[]) : [],
    )
    for (const url of urls) {
      const img = new window.Image()
      img.src = url
    }
  }, [open])

  // Close when pointer goes down outside the panel (and outside the toggle —
  // the button's own onClick handles toggling). No backdrop, so the page stays
  // visible; this just dismisses the menu on any outside tap/click.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* .nav-menu-button.w-nav-button — Foreplay icon (kept as-is when open, NO X morph).
          .w--open @991: z-index:5; background-color:neutral-800. */}
      <button
        ref={buttonRef}
        type="button"
        aria-label="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "z-[5] flex size-11 items-center justify-center rounded-[10px] p-2 text-foreground transition-colors fp-lg:hidden",
          open ? "bg-[var(--alpha-700)]" : "hover:bg-[var(--alpha-700)]",
        )}
      >
        {/* .icon-20 — exact Foreplay SVG (100%) */}
        <div className="flex size-5 items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.75 6.25H3.25M16.75 13.75H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div
        ref={panelRef}
        className={cn(
          "absolute top-full right-0 left-0 z-[90] origin-top fp-lg:hidden",
          "flex max-h-[calc(100dvh-72px)] flex-col items-stretch gap-3 overflow-y-auto",
          "rounded-b-[28px] max-fp-sm:rounded-b-[16px] bg-background px-5 pt-3 pb-6",
          "shadow-[inset_0_0_0_1px_#0003]",
          "transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex flex-col items-stretch gap-1">
          {SECTIONS.map((s) => {
            if ("href" in s) {
              return (
                <Link key={s.label} href={s.href} onClick={close} className="py-2 text-foreground no-underline">
                  <span className={navText}>{s.label}</span>
                </Link>
              )
            }
            const isOpen = expanded === s.label
            return (
              <div key={s.label} className="flex flex-col">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : s.label)}
                  className="flex items-center justify-between py-2 text-left text-foreground"
                >
                  <span className={navText}>{s.label}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={cn("text-[var(--alpha-100)] transition-transform duration-300", isOpen && "rotate-180")}>
                    <path d="M7 8.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="flex flex-col gap-4 pt-1 pb-2">
                    {s.groups.map((g) => (
                      <div key={g.overline} className="flex flex-col gap-1">
                        {/* .nav-overline-title @991 padding-left:0 — flush */}
                        <div className={cn(siteText.overline, "text-[var(--alpha-50)]")}>{g.overline}</div>
                        <ul className="m-0 flex flex-col gap-0.5 p-0">
                          {g.items.map((it) => {
                            const Icon = it.icon
                            return (
                              <li key={it.label} className="list-none">
                                <Link
                                  href={it.href}
                                  onClick={close}
                                  target={it.href.startsWith("http") ? "_blank" : undefined}
                                  className="-mx-2 flex items-center gap-3 rounded-[12px] px-2 py-2 no-underline transition-colors hover:bg-[var(--alpha-700)]"
                                >
                                  {/* icon: img (Product) or icon-20 svg (Tools/Resources) */}
                                  {it.img ? (
                                    <ImageWithSkeleton src={it.img} className="size-9 shrink-0" imgClassName="opacity-90" />
                                  ) : Icon ? (
                                    <span className="flex size-5 shrink-0 items-center justify-center text-foreground">
                                      <Icon />
                                    </span>
                                  ) : null}

                                  {s.inline ? (
                                    // Resources — label + desc inline (one row, desc wraps)
                                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                                      <span className={cn(siteText.labelS, "text-foreground")}>{it.label}</span>
                                      <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{it.desc}</span>
                                    </span>
                                  ) : (
                                    // Product / Tools — title stacked above desc
                                    <span className="flex min-w-0 flex-col">
                                      <span className={cn(siteText.labelS, "text-foreground")}>{it.label}</span>
                                      <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{it.desc}</span>
                                    </span>
                                  )}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-2 flex flex-col items-stretch gap-2">
          <a
            href={CONTACT.telegram.officialWithMessage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-center gap-1 rounded-[10px] bg-foreground p-2 font-semibold text-[var(--solid-900)] no-underline transition-opacity hover:opacity-90"
          >
            <span className={cn(navText, "text-[var(--solid-900)]")}>Contact Us</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {/* Sign in temporarily disabled (feature not open yet) — non-clickable,
              muted + not-allowed cursor + "Coming soon" tooltip. */}
          <span
            aria-disabled="true"
            title="Coming soon"
            className="cursor-not-allowed py-2 text-center text-foreground opacity-50 select-none"
          >
            <span className={navText}>Sign in</span>
          </span>
        </div>
      </div>
    </>
  )
}
