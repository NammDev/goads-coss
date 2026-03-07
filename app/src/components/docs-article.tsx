import type { ReactNode } from "react"

export function DocsArticle({
  title,
  description,
  lastUpdated,
  children,
}: {
  title: string
  description?: string
  lastUpdated?: string
  children: ReactNode
}) {
  return (
    <article className="py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        )}
        {lastUpdated && (
          <p className="mt-3 text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}
      </header>
      <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground prose-li:marker:text-muted-foreground">
        {children}
      </div>
    </article>
  )
}
