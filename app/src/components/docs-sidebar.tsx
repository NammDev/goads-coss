// Docs sidebar — pixel-perfect clone of Foreplay's help-center sidebar shell.
//
// Source HTML reference (Foreplay docs sidebar):
//   • Outer:  w-[278px] xl:fixed border-r shadow-sm flex-col h-full
//   • Top:    p-3 (xl) — brand row (avatar+name+theme) + search bar (mt-4)
//   • Middle: flex-grow scrollable, pl-3 pr-2 pb-20, with fade gradient overlay
//   • Bottom: border-t p-2 pl-3 bg-background/60 — feedback/roadmap links
//
// Each Collapsible "section" header (Part 4 in plan):
//   h-9 px-3 py-1.5 rounded-lg, text-sm font-medium text-foreground/80,
//   chevron w-4 h-4 rotates 90° on open. Active section: bolder (text-foreground).
//
// Each nav item (Part 5):
//   h-8 px-2 py-1.5 rounded-lg, text-[13px] font-medium truncate.
//   Active: bg-accent/10 text-accent-foreground.
//
// Currently icon-less for fast launch (option C). Re-introduce icon slot
// `grid-cols-[20px_1fr] gap-x-1.5` per item if you decide to map icons later.

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { docsTabs, flattenLeafItems } from "@/data/docs-navigation"

/** Single article row inside a section. Mirrors Foreplay's verbatim spec:
 *
 *   <a class="flex h-8 text-[15px] px-2 py-1.5 rounded-lg ...">
 *     <div class="text-[13px] font-medium grid grid-cols-[20px_1fr]
 *                 gap-x-1.5 size-full items-center">
 *       <div class="grid place-items-center opacity-60 size-full">
 *         <svg style="width:1rem;height:1rem;">{icon}</svg>
 *       </div>
 *       <span class="truncate">{title}</span>
 *     </div>
 *   </a>
 *
 * Active: bg-accent/10 + text-accent-foreground (hover deepens to /[15%]).
 * Inactive: text-foreground/80 + hover:bg-secondary/60. */
function SidebarArticleLink({
  href,
  title,
  icon: Icon = FileText,
  isActive,
}: {
  href: string
  title: string
  icon?: LucideIcon
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`mx-0 flex h-8 cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors duration-200 ease-in-out ${
        isActive
          ? "bg-accent/10 hover:bg-accent/[15%]"
          : "hover:bg-secondary/60"
      }`}
    >
      <div
        className={`grid size-full grid-cols-[20px_1fr] grid-rows-1 items-center gap-x-1.5 truncate text-[13px] font-medium ${
          isActive ? "text-accent-foreground" : "text-foreground/80"
        }`}
      >
        <div className="grid size-full place-items-center opacity-60">
          <Icon className="size-4 shrink-0" />
        </div>
        <span className="truncate">{title}</span>
      </div>
    </Link>
  )
}

/** Search button — pixel-perfect clone of Foreplay's `dashboard-secondary` search.
 *  Spec: button `flex items-center px-3 mt-4 w-full` + base h-9 rounded-lg border.
 *  Icon `mr-[9px]` (exact 9px, not 8/10). KBD wrapper `flex items-center ml-auto`;
 *  first kbd wrapped in `-mr-0.5 -mt-px` offset for optical alignment with the
 *  text baseline. Each kbd: `inline-flex min-w-5 h-5 px-1 rounded-md border
 *  font-mono font-medium ml-1`. Character lives in an inner span with
 *  `text-[11px] leading-none`. Background uses `bg-secondary/50` (dark theme). */
function SidebarSearch() {
  return (
    <button
      type="button"
      aria-label="Search docs"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true }),
        )
      }}
      className="mt-4 flex h-9 w-full cursor-pointer items-center rounded-lg border border-border/60 bg-secondary/50 px-3 text-sm text-muted-foreground shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] transition-colors duration-200 ease-in-out hover:bg-secondary/60 hover:text-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="mr-[9px] size-4 shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <span className="truncate">Search for articles</span>
      <div className="ml-auto flex items-center">
        <div className="-mr-0.5 -mt-px">
          <kbd className="pointer-events-none ml-1 inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md border bg-background px-1 font-mono font-medium text-foreground opacity-100">
            <span className="text-[11px] leading-none">⌘</span>
          </kbd>
        </div>
        <kbd className="pointer-events-none ml-1 inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md border bg-background px-1 font-mono font-medium text-foreground opacity-100">
          <span className="text-[11px] leading-none">K</span>
        </kbd>
      </div>
    </button>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-svh w-[278px] shrink-0 flex-col justify-between overflow-x-hidden border-r border-border shadow-sm lg:flex">
      {/* Top container — Foreplay spec: p-4 mobile, p-3 desktop (xl).
          Inner is a vertical stack (`flex flex-col items-start`) holding the
          brand row + search button. */}
      <div className="relative w-full p-4 xl:p-3">
        <div className="flex flex-col items-start">

          {/* Brand row — `flex justify-between items-center w-full` */}
          <div className="flex w-full items-center justify-between">

            {/* Brand button — Foreplay original avatar + "Foreplay" text for
                pixel-perfect comparison. Swap image/text to GoAds branding later. */}
            <Link
              href="/"
              aria-label="Foreplay — back to main site"
              className="inline-flex max-w-full min-w-0 items-center truncate"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-secondary bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/foreplay/sample-foreplay-avatar.webp"
                    alt="profile_pic"
                    width={28}
                    height={28}
                    className="size-full rounded-full object-cover"
                  />
                </div>
                <h2 className="w-full min-w-0 transform-gpu truncate text-sm font-semibold leading-none text-foreground sm:text-base">
                  <span className="w-full truncate">Foreplay</span>
                </h2>
              </div>
            </Link>

            {/* Right actions — `flex gap-2 items-center`.
                Theme toggle visible xl+, mobile close visible below xl. */}
            <div className="flex items-center gap-2">

              {/* Theme toggle — `hidden xl:flex justify-center items-center p-0 w-7 h-7 rounded-lg
                  hover:bg-gray-100/70 dark:hover:bg-secondary main-transition`.
                  Icon `w-5 h-5 secondary-svg` (secondary-svg ≈ muted icon color). */}
              <button
                type="button"
                aria-label="Toggle theme"
                className="hidden h-7 w-7 cursor-pointer items-center justify-center rounded-lg p-0 text-foreground/80 transition-colors duration-200 ease-in-out hover:bg-secondary/60 xl:flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Mobile close button — `px-2 h-8 dashboard-secondary xl:hidden`.
                  dashboard-secondary ≈ rounded-lg border bg-secondary/50 + hover.
                  Icon `block w-6 h-6` (X close path). */}
              <button
                type="button"
                aria-expanded="false"
                className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-secondary px-2 text-foreground shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] transition-colors duration-200 ease-in-out hover:bg-secondary/60 xl:hidden"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="block h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar (sibling of brand row, `mt-4 w-full`) */}
          <SidebarSearch />
        </div>
      </div>

      {/* Middle: scrollable nav with fade gradient overlay at bottom edge */}
      <div className="relative min-h-0 flex-grow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 bottom-0 z-[1] hidden h-32 bg-gradient-to-b from-transparent to-background lg:block"
        />
        <ScrollArea className="h-full w-full">
          <nav className="space-y-1.5 pb-20 pl-3 pr-2" aria-label="Docs sidebar">
            {docsTabs.map((tab) => {
              const isActiveTab = pathname.startsWith(`/docs/${tab.slug}`)
              return (
                <div
                  key={tab.slug}
                  className="mr-1 p-0 transition-colors duration-200 ease-in-out"
                >
                  <Collapsible defaultOpen={isActiveTab}>
                    {/* Trigger — Foreplay spec: h-9 px-3 py-1.5 rounded-lg cursor-pointer mx-0
                        hover:bg-secondary/60 (dark-mode hover, matching our single-mode tokens). */}
                    <CollapsibleTrigger className="group mx-0 flex h-9 w-full cursor-pointer items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-secondary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                      {/* Title — nested span pattern from Foreplay (outer styled, inner truncates) */}
                      <span
                        className={`flex select-none items-center truncate text-sm font-medium ${
                          isActiveTab ? "text-white/80" : "text-foreground/80"
                        }`}
                      >
                        <span className="truncate">{tab.title}</span>
                      </span>
                      {/* Chevron — Heroicon chevron-right, exact path. `secondary-svg` ≈ muted icon. */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-auto h-4 w-4 shrink-0 text-foreground/60 transition-transform group-data-[state=open]:rotate-90"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {/* 1-level flat list — Foreplay spec: `p-1 px-2` wrapper
                          + `space-y-1` between items. Nested subgroups in the
                          data (e.g. Meta → Ad Accounts → Setup Guide) are
                          flattened here via `flattenLeafItems` so users see
                          a single list, not a recursive tree. */}
                      <div className="space-y-1 p-1 px-2">
                        {flattenLeafItems(tab.items, `/docs/${tab.slug}`).map(
                          (leaf) => (
                            <SidebarArticleLink
                              key={leaf.href}
                              href={leaf.href}
                              title={leaf.title}
                              icon={leaf.icon}
                              isActive={pathname === leaf.href}
                            />
                          ),
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Footer — Foreplay spec: container `flex relative flex-col gap-1 p-2 pl-3
          mt-auto border-t xl:bg-background/60 dashboard-border`.
          Each link: h-8 px-3 py-1.5 rounded-lg cursor-pointer, hover:bg-secondary,
          icon wrapped `<div opacity-60 mr-1.5><span size-4>emoji</span></div>`,
          text-[13px] font-medium. */}
      <div className="relative mt-auto flex flex-col gap-1 border-t border-border p-2 pl-3 xl:bg-background/60">
        <a
          href="mailto:support@goads.com?subject=Docs feedback"
          className="mx-0 flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-secondary"
        >
          <span className="flex items-center truncate text-[13px] font-medium text-foreground/80">
            <div className="mr-1.5 opacity-60">
              <span
                role="img"
                aria-label="Feedback icon"
                className="flex h-4 w-4 shrink-0 items-center justify-center text-sm"
              >
                💬
              </span>
            </div>
            <span className="truncate">Feedback</span>
          </span>
        </a>
        <a
          href="#"
          className="mx-0 flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-secondary"
        >
          <span className="flex items-center truncate text-[13px] font-medium text-foreground/80">
            <div className="mr-1.5 opacity-60">
              <span
                role="img"
                aria-label="Roadmap icon"
                className="flex h-4 w-4 shrink-0 items-center justify-center text-sm"
              >
                🗺️
              </span>
            </div>
            <span className="truncate">Roadmap</span>
          </span>
        </a>
      </div>
    </aside>
  )
}
