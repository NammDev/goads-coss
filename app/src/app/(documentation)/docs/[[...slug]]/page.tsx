import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { docsTabs, getFlatDocs } from "@/data/docs-navigation"
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
  "getting-started": "Start here, learn how GOADS Meta assets work and how to get help.",
  "asset-overview": "Aged profiles, BM3, BM5, agency accounts, and which asset fits you.",
  "setup-configuration": "Set up your assets, connect to Business Manager, and log in safely.",
  "security-best-practices": "Why accounts get disabled or hacked, and how to prevent it.",
  "goads-tools": "Extensions and tools to add assets, check UIDs, get codes, and 2FA.",
  "questions-bank": "Answers to the most common questions, grouped by topic and asset type.",
}

type Props = {
  params: Promise<{ slug?: string[] }>
}

// Pre-render every docs route at build time. Without this the page renders on
// demand and reads content via the Keystatic filesystem reader at runtime,
// which fails on serverless production (content files are not in the function
// bundle) and returns "Page Not Found". Building the params statically bakes
// the content into the output, mirroring the blog route.
export function generateStaticParams() {
  const params: { slug: string[] }[] = [{ slug: [] }]
  for (const tab of docsTabs) params.push({ slug: [tab.slug] })
  for (const d of getFlatDocs()) params.push({ slug: d.slug.split("/") })
  return params
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
                  className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-background"
                  style={{ zIndex: 1 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/logo/mark.png"
                    alt="GOADS"
                    className="h-full w-full object-contain p-1"
                  />
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <p className="!m-0 leading-none !text-[13px]">
                  By <span className="font-semibold text-foreground">GOADS Team</span>
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
              {tab.items.map((item, i) => (
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
                          {/* Sequential index replaces the old icon (per spec). */}
                          <span className="mr-2.5 inline-flex min-w-[1.5rem] shrink-0 justify-center text-sm font-semibold tabular-nums text-accent/80">
                            {i + 1}
                          </span>
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
              .goads scope, `dark:` variants always apply, so we drop the
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
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-white rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo/mark.png"
                  alt="GOADS"
                  className="!border-0 !shadow-none h-full w-full object-contain p-1.5"
                />
              </span>
              <div className="flex flex-col gap-2 justify-between ml-3 font-medium">
                <p className="!leading-none !font-normal !text-[13px] !text-foreground/80 !m-0">
                  Written By{" "}
                  <span className="font-medium text-foreground">GOADS Team</span>
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
        <div
          className={`w-full installation-content${
            parentTab?.slug === "questions-bank" ? " qa-content" : ""
          }`}
        >
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
