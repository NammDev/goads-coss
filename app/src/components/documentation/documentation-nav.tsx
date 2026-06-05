// Documentation navigation — desktop sticky aside + mobile topbar/drawer.
// Shared by /docs and /help (generic over the nav-item type). Both render the
// same DocumentationSidebarContent so the mobile drawer mirrors the desktop
// sidebar 1:1 (full category accordion + search + footer) — matching the
// Foreplay help-center reference (plans/responsive/responsive-doc.html).

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, type LucideIcon } from "lucide-react"
import { FooterLogoSvg } from "@/components/layout/footer/logo-svg"
import { DocumentationSidebarContent } from "@/components/documentation/sidebar-content"

type SidebarLeaf = { title: string; href: string; icon?: LucideIcon }

interface DocumentationNavProps<I> {
  tabs: ReadonlyArray<{ title: string; slug: string; items: I[] }>
  basePath: string
  flatten: (items: I[], basePath: string) => SidebarLeaf[]
}

/** Desktop sidebar — sticky left aside (≥lg). */
export function DocumentationSidebar<I>({
  tabs,
  basePath,
  flatten,
}: DocumentationNavProps<I>) {
  return (
    <aside className="sticky top-0 hidden h-svh w-[278px] shrink-0 flex-col justify-between overflow-x-hidden border-r border-border shadow-sm lg:flex">
      <DocumentationSidebarContent tabs={tabs} basePath={basePath} flatten={flatten} />
    </aside>
  )
}

/** Mobile (<lg) — sticky topbar (brand + hamburger) + full-screen drawer.
 *  Drawer is rendered INLINE (not a portal) so it stays inside the
 *  (documentation) `.site` + docs-token scope — a portal would escape it and
 *  break the dark theme (same class of bug as the tools drawer). */
export function DocumentationMobileNav<I>({
  tabs,
  basePath,
  flatten,
}: DocumentationNavProps<I>) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the full-screen drawer is open. Compensate for the
  // removed vertical scrollbar with an equal padding-right, otherwise the page
  // (incl. the sticky topbar/logo) reflows ~15px wider and visibly jumps on
  // open/close. On overlay-scrollbar systems scrollbarW is 0 → no-op.
  useEffect(() => {
    if (!open) return
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    document.body.style.overflow = "hidden"
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      {/* Sticky mobile topbar — brand + hamburger.
          Foreplay spec (verbatim): `flex justify-between items-center px-4 py-4
          w-full border-b` — height is PADDING-driven (16px), NOT a fixed h-14.
          Hamburger: `px-2 h-8` bordered (dashboard-secondary). */}
      <div className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-border bg-background/85 px-4 py-4 backdrop-blur lg:hidden">
        <Link href="/" aria-label="GOADS, back to main site" className="inline-flex items-center">
          <FooterLogoSvg className="h-7 w-auto" style={{ color: "var(--background)" }} />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          className="flex h-8 items-center justify-center rounded-lg border border-border bg-secondary px-2 text-foreground transition-colors duration-200 hover:bg-secondary/60"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Full-screen drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background duration-200 animate-in fade-in lg:hidden">
          <DocumentationSidebarContent
            tabs={tabs}
            basePath={basePath}
            flatten={flatten}
            onNavigate={() => setOpen(false)}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </>
  )
}
