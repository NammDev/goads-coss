import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { docsTabs } from "@/data/docs-navigation"
import { reader } from "@/lib/keystatic-reader"
import {
  transformMarkdoc,
  MarkdocRenderer,
  extractHeadingsFromNode,
} from "@/lib/markdoc-renderer"
import { DocsArticleNav } from "@/components/docs-article-nav"
import { DocsLandingSearch } from "@/components/docs-landing-search"
import { DocsCategoryCard } from "@/components/docs-category-card"
import { DocsArticleAside } from "@/components/docs-article-aside"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"

// One-line descriptions per category (Foreplay-style preview text on landing cards)
const categoryDescriptions: Record<string, string> = {
  "getting-started": "Best steps on getting started with GoAds.",
  meta: "Run ads on Meta with whitelisted accounts and verified BMs.",
  google: "Whitelisted Google Ads accounts that survive policy reviews.",
  tiktok: "Verified TikTok accounts, Shops, and Business Centers.",
  billing: "Manage subscriptions, payments, warranty, and support.",
}

type Props = {
  params: Promise<{ slug?: string[] }>
}

/** Find a Keystatic doc entry by its navSlug field matching the URL slug */
async function getDocByNavSlug(navSlug: string) {
  const slugs = await reader.collections.docs.list()
  for (const s of slugs) {
    const doc = await reader.collections.docs.read(s)
    if (doc?.navSlug === navSlug) return { slug: s, doc }
  }
  return null
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params

  // /docs — landing (Foreplay help-center pattern, pixel-perfect)
  if (!slug || slug.length === 0) {
    return (
      <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
        {/* Top decorative gradient — fades secondary/30 down into transparent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
        />

        <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
          {/* Hero block — `installation-content` scope drives typography:
              h1 = pure white, font-semibold, 30/36px; p = muted foreground/80, 16px. */}
          <div className="installation-content mt-8 text-center">
            <h1>How can we help you?</h1>
            <p>
              Search for any helpful articles from our team to find an answer
              to your question.
            </p>
          </div>

          {/* Search bar with animated shine border */}
          <DocsLandingSearch />

          {/* Category grid — gap-3 mt-16 sm:grid-cols-2 */}
          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {docsTabs.map((tab) => (
              <DocsCategoryCard
                key={tab.slug}
                href={`/docs/${tab.slug}`}
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

  // Tab index page (e.g. /docs/getting-started) — Foreplay collection layout.
  if (slug.length === 1) {
    const tab = docsTabs.find((t) => t.slug === slug[0])
    if (!tab) return <DocsNotFound />

    const Icon = tab.icon
    const articleCount = countArticles(tab.items)
    const description = categoryDescriptions[tab.slug] ?? ""

    return (
      <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
        {/* Top decorative gradient — fades secondary/30 down into transparent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
        />

        <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
          {/* Header section */}
          <div className="pb-12">
            <div className="pb-5">
              <DocsBreadcrumb
                items={[
                  { label: "Home", href: "/docs" },
                  { label: tab.title },
                ]}
              />
            </div>

            {/* Big category icon (3rem = 48px) */}
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

          {/* Articles list — Foreplay spec:
              outer container `flex flex-col gap-1 p-1.5 border rounded-lg border-border/70`.
              Each item wrapped in <div> > <a !decoration-transparent> > <button>.
              Button has icon wrapper (opacity-75 + 16x16 role=img span) + title,
              trailing chevron with group-hover color shift. */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1 rounded-lg border border-border/70 p-1.5">
              {tab.items.map((item) => (
                <div key={item.slug}>
                  <Link
                    href={`/docs/${tab.slug}/${item.slug}`}
                    className="!decoration-transparent hover:!decoration-transparent"
                  >
                    <button
                      type="button"
                      className="group flex w-full cursor-pointer items-center justify-between rounded-lg bg-transparent p-3 px-2 text-left text-foreground transition-colors duration-200 ease-in-out hover:bg-accent/[7%] hover:text-accent-foreground focus:ring-accent/10"
                    >
                      <span className="flex flex-col items-start justify-center">
                        <span className="inline-flex max-w-xl items-center text-sm leading-5 font-normal">
                          <div className="mr-1.5 inline-block !opacity-75">
                            {item.iconSrc ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.iconSrc}
                                alt="Custom icon"
                                className="block aspect-auto shrink-0 object-contain"
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            ) : (
                              <span
                                role="img"
                                aria-label="Featured icon"
                                className="flex aspect-auto shrink-0 items-center justify-center leading-none"
                                style={{ width: "1rem", height: "1rem" }}
                              >
                                {/* Foreplay F-block default — 9 sub-paths verbatim (incl. inline path style for absolute 100% parity). */}
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
                            )}
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

  // Article page — Foreplay layout: main + right aside (TOC + Feedback).
  const result = await getDocByNavSlug(fullSlug)
  if (!result) return <DocsNotFound />

  const { doc } = result
  const { node } = await doc.content()
  const contentTree = transformMarkdoc(node)
  const headings = extractHeadingsFromNode(node)
  const parentTab = docsTabs.find((t) => t.slug === slug[0])

  return (
    <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
      {/* Top decorative gradient — fades secondary/30 down into transparent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
      />

      <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
        <div className="pb-12">
          <div className="pb-6 md:pb-3">
            <DocsBreadcrumb
              items={[
                { label: "Home", href: "/docs" },
                ...(parentTab
                  ? [{ label: parentTab.title, href: `/docs/${parentTab.slug}` }]
                  : []),
                { label: doc.title },
              ]}
            />
          </div>

          {/* Article header — h1 + description + author row.
              Class order matches Foreplay spec verbatim. In our single-mode
              .foreplay scope, `dark:` variants always apply, so we drop the
              prefix and use the dark variant value directly. */}
          <header>
            <h1 className="text-2xl font-semibold text-white md:text-3xl scroll-mt-6">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="mt-6 text-base text-foreground md:text-lg">
                {doc.description}
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
                {doc.lastUpdated && (
                  <p className="!text-[13px] !font-normal !text-foreground/80 !leading-none !m-0">
                    Last updated{" "}
                    <span className="font-medium lowercase text-foreground">
                      {doc.lastUpdated}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </header>
        </div>

        {/* Markdoc content — Foreplay article body. The `w-full installation-content`
            class (class order matches Foreplay source) auto-applies typography:
            h1-h6 sizing+margins, p/li body text, heading→p tightening (mt-1rem),
            list spacing (32px between blocks), and link decoration via the
            `.installation-content` rules in globals.css. */}
        <div className="w-full installation-content">
          <MarkdocRenderer content={contentTree} />
        </div>

        {/* Next/Prev nav (kept) */}
        <DocsArticleNav currentSlug={fullSlug} />
      </article>

      {/* Right aside — On this page (TOC) + Was this helpful (feedback) */}
      <DocsArticleAside headings={headings} />
    </div>
  )
}

/** Recursively count leaf articles within a nested DocsNavItem tree. */
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

function DocsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        This documentation page doesn&apos;t exist yet.
      </p>
      <Link
        href="/docs"
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Back to docs
      </Link>
    </div>
  )
}
