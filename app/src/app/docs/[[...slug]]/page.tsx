import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { docsTabs } from "@/data/docs-navigation"
import { reader } from "@/lib/keystatic-reader"
import { transformMarkdoc, MarkdocRenderer } from "@/lib/markdoc-renderer"
import { DocsArticle } from "@/components/docs-article"
import { DocsArticleNav } from "@/components/docs-article-nav"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"

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

  // /docs — welcome page
  if (!slug || slug.length === 0) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold tracking-tight">
          GoAds Documentation
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Everything you need to know about agency ad accounts, setup guides,
          troubleshooting, and billing.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docsTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Link
                key={tab.slug}
                href={`/docs/${tab.slug}`}
                className="group rounded-lg border p-5 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-5 text-primary" />
                  <h2 className="font-semibold">{tab.title}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tab.items.length}{" "}
                  {tab.items.length === 1 ? "topic" : "topics"}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="size-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const fullSlug = slug.join("/")

  // Tab index page (e.g. /docs/meta)
  if (slug.length === 1) {
    const tab = docsTabs.find((t) => t.slug === slug[0])
    if (!tab) return <DocsNotFound />

    return (
      <div className="py-8">
        <DocsBreadcrumb />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{tab.title}</h1>
        <p className="mt-2 text-muted-foreground">
          Browse {tab.title.toLowerCase()} documentation and guides.
        </p>
        <div className="mt-8 space-y-2">
          {tab.items.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/${tab.slug}/${item.slug}`}
              className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div>
                <h3 className="font-medium group-hover:text-primary">
                  {item.title}
                </h3>
                {item.items && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.items.length} articles
                  </p>
                )}
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Article page — look up by navSlug
  const result = await getDocByNavSlug(fullSlug)
  if (!result) return <DocsNotFound />

  const { doc } = result
  const { node } = await doc.content()
  const contentTree = transformMarkdoc(node)

  return (
    <div className="max-w-3xl">
      <div className="pt-8">
        <DocsBreadcrumb />
      </div>
      <DocsArticle
        title={doc.title}
        description={doc.description}
        lastUpdated={doc.lastUpdated}
      >
        <MarkdocRenderer content={contentTree} />
      </DocsArticle>
      <DocsArticleNav currentSlug={fullSlug} />
      <div className="h-12" />
    </div>
  )
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
