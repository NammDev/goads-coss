// Shared inner content for the documentation sidebar (powers BOTH the desktop
// aside and the mobile full-screen drawer — DRY across /docs and /help).
//
// Pixel-perfect Foreplay help-center clone (lifted verbatim from the old
// docs-sidebar.tsx): brand row + search · collapsible category accordion ·
// Docs/Help/Contact footer. Generic over the nav-item type so /docs (DocsNavItem)
// and /help (HelpNavItem) both reuse it via their own `flatten` fn.
//
// Returns a fragment of three sections (top · flex-grow middle · mt-auto footer)
// to be placed inside a `flex flex-col` container (the aside or the drawer).

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FooterLogoSvg } from "@/components/layout/footer/logo-svg"

type SidebarLeaf = { title: string; href: string; icon?: LucideIcon }

interface DocumentationSidebarContentProps<I> {
  /** Top-level categories (collapsible sections). */
  tabs: ReadonlyArray<{ title: string; slug: string; items: I[] }>
  /** Route base, e.g. "/docs" or "/help". */
  basePath: string
  /** Flatten a tab's (possibly nested) items into a 1-level leaf list. */
  flatten: (items: I[], basePath: string) => SidebarLeaf[]
  /** Called on any link click — mobile drawer uses it to self-close. */
  onNavigate?: () => void
  /** When provided, renders a close (X) button in the brand row (mobile drawer). */
  onClose?: () => void
}

/** Single article row inside a section. The leading icon is replaced by the
 *  article's sequential index within its section (per spec). */
function SidebarArticleLink({
  href,
  title,
  index,
  isActive,
  onNavigate,
}: {
  href: string
  title: string
  index: number
  isActive: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`mx-0 flex h-8 cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors duration-200 ease-in-out ${
        isActive ? "bg-accent/10 hover:bg-accent/[15%]" : "hover:bg-secondary/60"
      }`}
    >
      <div
        className={`grid size-full grid-cols-[20px_1fr] grid-rows-1 items-center gap-x-1.5 truncate text-[13px] font-medium ${
          isActive ? "text-accent-foreground" : "text-foreground/80"
        }`}
      >
        <div
          className={`grid size-full place-items-center text-[12px] font-semibold tabular-nums ${
            isActive ? "text-accent-foreground" : "text-accent/70"
          }`}
        >
          {index}
        </div>
        <span className="truncate">{title}</span>
      </div>
    </Link>
  )
}

/** Search button — dispatches ⌘K to open the global command menu. */
function SidebarSearch({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Search articles"
      onClick={() => {
        onNavigate?.()
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

export function DocumentationSidebarContent<I>({
  tabs,
  basePath,
  flatten,
  onNavigate,
  onClose,
}: DocumentationSidebarContentProps<I>) {
  const pathname = usePathname()

  return (
    <>
      {/* Top — brand row (+ mobile close) + search */}
      <div className="relative w-full shrink-0 p-4 xl:p-3">
        <div className="flex flex-col items-start">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              aria-label="GOADS, back to main site"
              onClick={onNavigate}
              className="inline-flex max-w-full min-w-0 items-center truncate"
            >
              {/* 28px (h-7) — unified with the mobile topbar brand + Foreplay's
                  w-7 h-7 (28px) reference avatar, so the logo never resizes
                  between the topbar and the open drawer. */}
              <FooterLogoSvg
                className="h-7 w-auto"
                style={{ color: "var(--background)" }}
              />
            </Link>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-secondary px-2 text-foreground shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] transition-colors duration-200 ease-in-out hover:bg-secondary/60"
              >
                <X className="size-5" />
              </button>
            )}
          </div>

          <SidebarSearch onNavigate={onNavigate} />
        </div>
      </div>

      {/* Middle — scrollable category accordion (all tabs) */}
      <div className="relative min-h-0 flex-grow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 bottom-0 z-[1] hidden h-32 bg-gradient-to-b from-transparent to-background lg:block"
        />
        <ScrollArea className="h-full w-full">
          <nav className="space-y-1.5 pb-20 pl-3 pr-2" aria-label="Documentation navigation">
            {tabs.map((tab) => {
              const isActiveTab = pathname.startsWith(`${basePath}/${tab.slug}`)
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
                        {flatten(tab.items, `${basePath}/${tab.slug}`).map((leaf, i) => (
                          <SidebarArticleLink
                            key={leaf.href}
                            href={leaf.href}
                            title={leaf.title}
                            index={i + 1}
                            isActive={pathname === leaf.href}
                            onNavigate={onNavigate}
                          />
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Footer — Docs / Help / Contact Support (active route lights up) */}
      <div className="relative mt-auto flex shrink-0 flex-col gap-1 border-t border-border p-2 pl-3 xl:bg-background/60">
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
              onClick={onNavigate}
              className={`mx-0 flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ease-in-out ${
                isActive ? "bg-accent/10 hover:bg-accent/[15%]" : "hover:bg-secondary"
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
    </>
  )
}
