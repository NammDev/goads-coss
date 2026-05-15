// Help sidebar — verbatim clone of docs-sidebar.tsx, adapted for /help.
// Swapped: helpTabs + base path `/help`.
// Tab active = pathname.startsWith(`/help/${tab.slug}`)
// Leaf active = pathname === href
// Footer Docs/Help/Contact block kept IDENTICAL to docs-sidebar.tsx.

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
import { ForeplayLogoSvg } from "@/components/foreplay/footer/foreplay-logo-svg"
import { helpTabs, flattenLeafItems } from "@/data/help-navigation"

/** Single article row inside a section — mirrors docs-sidebar SidebarArticleLink verbatim. */
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

/** Search button — identical markup to docs-sidebar SidebarSearch. */
function SidebarSearch() {
  return (
    <button
      type="button"
      aria-label="Search help articles"
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

export function HelpSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-svh w-[278px] shrink-0 flex-col justify-between overflow-x-hidden border-r border-border shadow-sm lg:flex">
      {/* Top container — same spec as docs-sidebar */}
      <div className="relative w-full p-4 xl:p-3">
        <div className="flex flex-col items-start">

          {/* Brand row */}
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              aria-label="GoAds — back to main site"
              className="inline-flex max-w-full min-w-0 items-center truncate"
            >
              <ForeplayLogoSvg
                className="h-8 w-auto"
                style={{ color: "var(--background)" }}
              />
            </Link>

            <div className="flex items-center gap-2">
              {/* Mobile close button */}
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

          {/* Search bar */}
          <SidebarSearch />
        </div>
      </div>

      {/* Middle: scrollable nav */}
      <div className="relative min-h-0 flex-grow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 bottom-0 z-[1] hidden h-32 bg-gradient-to-b from-transparent to-background lg:block"
        />
        <ScrollArea className="h-full w-full">
          <nav className="space-y-1.5 pb-20 pl-3 pr-2" aria-label="Help sidebar">
            {helpTabs.map((tab) => {
              const isActiveTab = pathname.startsWith(`/help/${tab.slug}`)
              return (
                <div
                  key={tab.slug}
                  className="mr-1 p-0 transition-colors duration-200 ease-in-out"
                >
                  <Collapsible defaultOpen={isActiveTab}>
                    <CollapsibleTrigger className="group mx-0 flex h-9 w-full cursor-pointer items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-secondary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                      <span
                        className={`flex select-none items-center truncate text-sm font-medium ${
                          isActiveTab ? "text-white/80" : "text-foreground/80"
                        }`}
                      >
                        <span className="truncate">{tab.title}</span>
                      </span>
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
                      <div className="space-y-1 p-1 px-2">
                        {flattenLeafItems(tab.items, `/help/${tab.slug}`).map(
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

      {/* Footer — Docs / Help / Contact Support. Identical to docs-sidebar.tsx verbatim.
          Active-route highlight via pathname.startsWith so Help lights up on /help. */}
      <div className="relative mt-auto flex flex-col gap-1 border-t border-border p-2 pl-3 xl:bg-background/60">
        {[
          { label: "Docs", href: "/docs", emoji: "📄" },
          { label: "Help", href: "/help", emoji: "❓" },
          { label: "Contact Support", href: "/contact", emoji: "💬" },
        ].map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-0 flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out ${
                isActive
                  ? "bg-accent/10 hover:bg-accent/[15%]"
                  : "hover:bg-secondary"
              }`}
            >
              <span
                className={`flex items-center truncate text-[13px] font-medium ${
                  isActive ? "text-accent-foreground" : "text-foreground/80"
                }`}
              >
                <div className="mr-1.5 opacity-60">
                  <span
                    role="img"
                    aria-label={`${item.label} icon`}
                    className="flex h-4 w-4 shrink-0 items-center justify-center text-sm"
                  >
                    {item.emoji}
                  </span>
                </div>
                <span className="truncate">{item.label}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
