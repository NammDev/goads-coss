// Help center — surfaces the docs Questions Bank as the GOADS FAQ.
// Single source of truth: content lives in app/src/content/docs/qa-*/index.mdoc
// (tab "questions-bank") and is rendered here via Markdoc, identical to
// /docs/questions-bank/<slug>, including the FAQ "Q" badge (qa-content scope).
//
// Views:
//   1. Landing   — /help                              (hero + search + question list)
//   2. Category  — /help/questions-bank               (breadcrumb + list)
//   3. Article   — /help/questions-bank/<article>     (Markdoc FAQ + TOC)

import Link from "next/link"
import { docsTabs } from "@/data/docs-navigation"
import { reader } from "@/lib/keystatic-reader"
import {
  transformMarkdoc,
  MarkdocRenderer,
  extractHeadingsFromNode,
} from "@/lib/markdoc-renderer"
import { HelpLandingSearch } from "@/components/help/help-landing-search"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"
import { DocsArticleAside } from "@/components/docs-article-aside"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QA_TAB = docsTabs.find((t) => t.slug === "questions-bank")
const QA_DESCRIPTION =
  "Answers to the most common questions, grouped by topic and asset type."

type Props = {
  params: Promise<{ slug?: string[] }>
}

/** Find a Keystatic doc entry by its navSlug field matching the URL slug. */
async function getDocByNavSlug(navSlug: string) {
  const slugs = await reader.collections.docs.list()
  for (const s of slugs) {
    const doc = await reader.collections.docs.read(s)
    if (doc?.navSlug === navSlug) return { slug: s, doc }
  }
  return null
}

/** Foreplay-style article list (sequential index + chevron) used on the
 *  landing and category views. Links to /help/questions-bank/<slug>. */
function QuestionList() {
  if (!QA_TAB) return null
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/70 p-1.5">
      {QA_TAB.items.map((item, i) => (
        <div key={item.slug}>
          <Link
            href={`/help/${QA_TAB.slug}/${item.slug}`}
            className="!decoration-transparent hover:!decoration-transparent"
          >
            <button
              type="button"
              className="group flex w-full cursor-pointer items-center justify-between rounded-lg bg-transparent p-3 px-2 text-left text-foreground transition-colors duration-200 ease-in-out hover:bg-accent/[7%] hover:text-accent-foreground focus:ring-accent/10"
            >
              <span className="flex flex-col items-start justify-center">
                <span className="inline-flex max-w-xl items-center text-sm leading-5 font-normal">
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
  )
}

export default async function HelpPage({ params }: Props) {
  const { slug } = await params

  if (!QA_TAB) return <HelpNotFound />

  // ── View 1: Landing (/help) ──────────────────────────────────────
  if (!slug || slug.length === 0) {
    return (
      <div className="relative flex w-full gap-10 px-4 py-10 sm:px-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full bg-gradient-to-b from-secondary/30 to-transparent"
        />

        <article className="z-10 mx-auto mt-0 mb-24 w-full max-w-[720px] min-w-0 flex-shrink">
          <div className="installation-content mt-8 text-center">
            <h1>How can we help you?</h1>
            <p>
              Browse the questions our customers ask most, grouped by topic and
              asset type.
            </p>
          </div>

          <HelpLandingSearch />

          <div className="mt-16">
            <QuestionList />
          </div>
        </article>
      </div>
    )
  }

  const fullSlug = slug.join("/")

  // ── View 2: Category index (/help/questions-bank) ────────────────
  if (slug.length === 1) {
    if (slug[0] !== QA_TAB.slug) return <HelpNotFound />

    const Icon = QA_TAB.icon
    const articleCount = QA_TAB.items.length

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
                items={[{ label: "Home", href: "/help" }, { label: QA_TAB.title }]}
              />
            </div>

            <div className="mb-3 inline-flex text-accent sm:mb-6">
              <Icon className="block size-12 shrink-0" strokeWidth={1.5} />
            </div>

            <h1 className="scroll-mt-6 text-2xl font-semibold text-white sm:text-3xl">
              {QA_TAB.title}
            </h1>

            <p className="mt-6 text-base text-foreground">{QA_DESCRIPTION}</p>

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

          <div className="flex flex-col gap-8">
            <QuestionList />
          </div>
        </article>
      </div>
    )
  }

  // ── View 3: Article (/help/questions-bank/<article>) ─────────────
  if (slug.length !== 2 || slug[0] !== QA_TAB.slug) return <HelpNotFound />

  const articleSlug = slug[1]
  const item = QA_TAB.items.find((i) => i.slug === articleSlug)
  if (!item) return <HelpNotFound />

  const result = await getDocByNavSlug(fullSlug)
  if (!result) return <HelpNotFound />

  const { doc } = result
  const { node } = await doc.content()
  const contentTree = transformMarkdoc(node)
  const headings = extractHeadingsFromNode(node)

  // Prev / next within the Questions Bank list
  const idx = QA_TAB.items.findIndex((i) => i.slug === articleSlug)
  const prev = idx > 0 ? QA_TAB.items[idx - 1] : null
  const next = idx < QA_TAB.items.length - 1 ? QA_TAB.items[idx + 1] : null

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
                { label: QA_TAB.title, href: `/help/${QA_TAB.slug}` },
                { label: doc.title },
              ]}
            />
          </div>

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

        {/* Markdoc FAQ body — qa-content scope adds the "Q" badge per question. */}
        <div className="w-full installation-content qa-content">
          <MarkdocRenderer content={contentTree} />
        </div>

        {/* Prev / Next nav */}
        <nav className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/help/${QA_TAB.slug}/${prev.slug}`}
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
              href={`/help/${QA_TAB.slug}/${next.slug}`}
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

      <DocsArticleAside headings={headings} />
    </div>
  )
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
