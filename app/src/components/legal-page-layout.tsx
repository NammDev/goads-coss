import { SectionDivider } from '@/components/section-divider'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="flex-1">
      {/* Header */}
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <SectionDivider />

      {/* Content */}
      <section className="py-8 sm:py-16">
        <div className="container">
          <div className="prose max-w-prose dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-muted-foreground">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
