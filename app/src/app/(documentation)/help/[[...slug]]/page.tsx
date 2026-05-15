// Help center catch-all page — static, no Keystatic, no Markdoc.
// Three views mirror docs/[[...slug]]/page.tsx markup verbatim:
//   1. Landing  — /help
//   2. Category — /help/<tab-slug>
//   3. Article  — /help/<tab-slug>/<article-slug>
//
// Data sources: help-navigation.ts + help-content.ts (plain static).
// Reuses: DocsBreadcrumb, DocsCategoryCard, DocsArticleAside (plain-prop components).
// HelpLandingSearch replaces the docs-coupled DocsLandingSearch.

import Link from "next/link"
import { helpTabs, getFlatHelp } from "@/data/help-navigation"
import { helpContent } from "@/data/help-content"
import { HelpLandingSearch } from "@/components/help/help-landing-search"
import { DocsCategoryCard } from "@/components/docs-category-card"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"
import { DocsArticleAside } from "@/components/docs-article-aside"
import { ChevronLeft, ChevronRight } from "lucide-react"

// One-line descriptions per help category shown on landing cards
const categoryDescriptions: Record<string, string> = {
  "getting-started": "New to GoAds? Start here for account setup and orientation.",
  billing: "Manage your subscription, invoices, and payment methods.",
  troubleshooting: "Fix common issues with login, ad accounts, and billing.",
}

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function HelpPage({ params }: Props) {
  const { slug } = await params

  // ── View 1: Landing (/help) ──────────────────────────────────────
  if (!slug || slug.length === 0) {
    return (
      <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
        {/* Top decorative gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
        />

        <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
          {/* Hero — installation-content scope applies typography */}
          <div className="installation-content mt-8 text-center">
            <h1>How can we help you?</h1>
            <p>
              Search for any helpful articles from our team to find an answer
              to your question.
            </p>
          </div>

          {/* Search bar with animated shine border */}
          <HelpLandingSearch />

          {/* Category grid */}
          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {helpTabs.map((tab) => (
              <DocsCategoryCard
                key={tab.slug}
                href={`/help/${tab.slug}`}
                icon={tab.icon}
                title={tab.title}
                description={categoryDescriptions[tab.slug] ?? ""}
                articleCount={countArticles(tab.items)}
              />
            ))}
          </div>
        </article>
      </div>
    )
  }

  const fullSlug = slug.join("/")

  // ── View 2: Category index (/help/<tab-slug>) ────────────────────
  if (slug.length === 1) {
    const tab = helpTabs.find((t) => t.slug === slug[0])
    if (!tab) return <HelpNotFound />

    const Icon = tab.icon
    const articleCount = countArticles(tab.items)
    const description = categoryDescriptions[tab.slug] ?? ""

    return (
      <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
        />

        <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
          <div className="pb-12">
            <div className="pb-5">
              <DocsBreadcrumb
                items={[
                  { label: "Home", href: "/help" },
                  { label: tab.title },
                ]}
              />
            </div>

            {/* Big category icon */}
            <div className="mb-3 inline-flex text-accent sm:mb-6">
              <Icon className="block size-12 shrink-0" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h1 className="scroll-mt-6 text-2xl font-semibold text-white sm:text-3xl">
              {tab.title}
            </h1>

            {/* Description */}
            <p className="mt-6 text-base text-foreground">{description}</p>

            {/* Author + article count row */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span
                  className="relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full bg-secondary ring-2 ring-background"
                  style={{ zIndex: 1 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/foreplay/sample-foreplay-avatar.webp"
                    alt=""
                    className="aspect-square h-full w-full"
                  />
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <p className="!m-0 leading-none !text-[13px]">
                  By <span className="font-semibold text-foreground">GoAds Team</span>
                </p>
                <span className="text-[13px] text-foreground/50">•</span>
                <p className="!m-0 !-mt-px !text-[13px]">
                  {articleCount} {articleCount === 1 ? "article" : "articles"}
                </p>
              </div>
            </div>
          </div>

          {/* Articles list */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1 rounded-lg border border-border/70 p-1.5">
              {tab.items.map((item) => (
                <div key={item.slug}>
                  <Link
                    href={`/help/${tab.slug}/${item.slug}`}
                    className="!decoration-transparent hover:!decoration-transparent"
                  >
                    <button
                      type="button"
                      className="group flex w-full cursor-pointer items-center justify-between rounded-lg bg-transparent p-3 px-2 text-left text-foreground transition-colors duration-200 ease-in-out hover:bg-accent/[7%] hover:text-accent-foreground focus:ring-accent/10"
                    >
                      <span className="flex flex-col items-start justify-center">
                        <span className="inline-flex max-w-xl items-center text-sm leading-5 font-normal">
                          <div className="mr-1.5 inline-block !opacity-75">
                            <span
                              role="img"
                              aria-label="Featured icon"
                              className="flex aspect-auto shrink-0 items-center justify-center leading-none"
                              style={{ width: "1rem", height: "1rem" }}
                            >
                              {/* Foreplay F-block default icon — verbatim from docs page */}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50">
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M13.6928 6.4585H16.9234V16.5718H7.23157V13.2007C7.23157 9.47562 10.123 6.4585 13.6928 6.4585Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M33.0768 6.4585H20.1543V16.5718H33.0768V6.4585Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M31.4615 19.9431H20.1543V30.0564H28.2309C30.0151 30.0564 31.4615 28.61 31.4615 26.8257V19.9431Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M42.7686 19.9431H34.692V26.8257C34.692 28.61 36.1384 30.0564 37.9226 30.0564H42.7686V19.9431Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M33.0765 33.4282H42.7684V36.7993C42.7684 40.5244 39.877 43.5415 36.3072 43.5415H33.0765V33.4282Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M26.6155 33.4282H20.1543V43.5415H29.8462V36.6588C29.8462 34.8746 28.3998 33.4282 26.6155 33.4282Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M36.3071 6.4585C39.877 6.4585 42.7684 9.47562 42.7684 13.2007V16.5718H36.3071V6.4585Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M16.9234 19.9431H7.23157V30.0564H16.9234V19.9431Z" />
                                <path style={{ fill: "currentColor", fillOpacity: 1 }} fill="currentColor" d="M7.23157 33.4282H16.9234V43.5415H13.6928C10.123 43.5415 7.23157 40.5244 7.23157 36.7993V33.4282Z" />
                              </svg>
                            </span>
                          </div>
                          {item.title}
                        </span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 group-hover:text-accent-foreground/60"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    )
  }

  // ── View 3: Article (/help/<tab-slug>/<article-slug>) ─────────────
  const article = helpContent[fullSlug]
  if (!article) return <HelpNotFound />

  const parentTab = helpTabs.find((t) => t.slug === slug[0])

  // Build prev/next from the flat list
  const flatHelp = getFlatHelp()
  const currentIdx = flatHelp.findIndex((d) => d.slug === fullSlug)
  const prev = currentIdx > 0 ? flatHelp[currentIdx - 1] : null
  const next = currentIdx < flatHelp.length - 1 ? flatHelp[currentIdx + 1] : null

  const linkBase =
    "group flex h-full flex-col gap-1 rounded-lg border border-border bg-card/30 p-4 transition-colors hover:bg-muted/50"
  const labelRowClass = "flex items-center gap-1 text-xs text-muted-foreground"
  const titleClass = "text-sm font-medium text-foreground group-hover:text-primary"
  const chevronClass = "size-3.5 shrink-0"

  return (
    <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
      />

      <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
        <div className="pb-12">
          <div className="pb-6 md:pb-3">
            <DocsBreadcrumb
              items={[
                { label: "Home", href: "/help" },
                ...(parentTab
                  ? [
                      {
                        label: parentTab.title,
                        href: `/help/${parentTab.slug}`,
                      },
                    ]
                  : []),
                { label: article.title },
              ]}
            />
          </div>

          {/* Article header */}
          <header>
            <h1 className="text-2xl font-semibold text-white md:text-3xl scroll-mt-6">
              {article.title}
            </h1>
            {article.description && (
              <p className="mt-6 text-base text-foreground md:text-lg">
                {article.description}
              </p>
            )}
            <div className="flex items-center mt-8">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden bg-secondary rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/foreplay/sample-foreplay-avatar.webp"
                  alt=""
                  className="aspect-square !border-0 !shadow-none h-full w-full"
                />
              </span>
              <div className="flex flex-col gap-2 justify-between ml-3 font-medium">
                <p className="!leading-none !font-normal !text-[13px] !text-foreground/80 !m-0">
                  Written By{" "}
                  <span className="font-medium text-foreground">GoAds Team</span>
                </p>
                {article.lastUpdated && (
                  <p className="!text-[13px] !font-normal !text-foreground/80 !leading-none !m-0">
                    Last updated{" "}
                    <span className="font-medium lowercase text-foreground">
                      {article.lastUpdated}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </header>
        </div>

        {/* Static article body — wrapped in installation-content for typography */}
        <div className="w-full installation-content">
          {article.body}
        </div>

        {/* Prev / Next nav */}
        <nav className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/help/${prev.slug}`}
              className={`${linkBase} items-start text-left`}
            >
              <div className={labelRowClass}>
                <ChevronLeft className={chevronClass} />
                <span>Previous</span>
              </div>
              <p className={titleClass}>{prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/help/${next.slug}`}
              className={`${linkBase} items-end text-right`}
            >
              <div className={labelRowClass}>
                <span>Next</span>
                <ChevronRight className={chevronClass} />
              </div>
              <p className={titleClass}>{next.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      {/* Right aside — "On this page" TOC + feedback. Static articles have no
          headings to extract, so we pass an empty array; the aside renders only
          the feedback block, matching Foreplay's layout for short articles. */}
      <DocsArticleAside headings={[]} />
    </div>
  )
}

/** Recursively count leaf articles within a nested HelpNavItem tree. */
function countArticles(items: { items?: { items?: unknown[] }[] }[]): number {
  let total = 0
  for (const item of items) {
    if (item.items && item.items.length > 0) {
      total += countArticles(item.items as { items?: { items?: unknown[] }[] }[])
    } else {
      total += 1
    }
  }
  return total
}

function HelpNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        This help article doesn&apos;t exist yet.
      </p>
      <Link
        href="/help"
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Back to Help Center
      </Link>
    </div>
  )
}
