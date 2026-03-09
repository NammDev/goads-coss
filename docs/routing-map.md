# Routing Map
> All application routes, layout groups, hero types, and block composition for every page.

---

## Overview

The app uses Next.js App Router. Marketing pages live under the `(marketing)` route group with a shared layout (SiteHeader + footer + grid frame). Tool pages live under `tools/` with their own layout. The docs section uses `[[...slug]]` for catch-all routing via Fumadocs. Every marketing page follows: Hero → SectionDivider → [Content Blocks] → SectionDivider → CTASection. The landing page (`/`) is the only page using `HeroClone`. All inner marketing pages use `PageHero` or a custom hero card component.

## Rules (MANDATORY)

- DO place new marketing pages inside `src/app/(marketing)/[route]/page.tsx`
- DO end every marketing page with `<CTASection />` preceded by `<SectionDivider />`
- DO separate every block with `<SectionDivider />` — never use raw `border-b` between sections
- NEVER include `SiteHeader` or footer inside a page component — they live in `layout.tsx`
- NEVER use `HeroClone` on inner pages — it is exclusively for the landing page (`/`)
- DO use `PageHero` for standard inner-page heroes
- DO use custom hero cards (from blocks/) for product-specific pages

---

## Layout Groups

| Group | Path | Shared Layout Elements |
|-------|------|------------------------|
| `(marketing)` | `/`, `/about`, `/pricing`, `/blog`, etc. | SiteHeader (sticky z-40) + footer-component-02 + grid frame lines + corner dots |
| `tools` | `/tools/*` | Separate tools layout (ToolsSidebar + ToolsHubContent) |
| `docs` | `/docs/[[...slug]]` | DocsShell + DocsTopBar + DocsSidebar + DocsArticle + DocsAiPanel |

---

## Route Table

| Route | Page File | Hero Type | Key Blocks | Data Source |
|-------|-----------|-----------|------------|-------------|
| `/` | `(marketing)/page.tsx` | `HeroClone` | BentoGrid19, StatsSection, BentoGrid10, PricingComponent13, TestimonialsComponent22, FaqComponent08, CTASection | `landing-reviews-pricing-faq.ts`, `landing-faq.ts` |
| `/about` | `(marketing)/about/page.tsx` | `PageHero` or AboutUsPage03 | AboutUsPage03, CTASection | — |
| `/agency-ad-account` | `(marketing)/agency-ad-account/page.tsx` | `ComingSoonHero` | CTASection | inline props |
| `/blog` | `(marketing)/blog/page.tsx` | `BlogHero` | BlogListing, CTASection | `blog-posts.ts` |
| `/blog/[slug]` | `(marketing)/blog/[slug]/page.tsx` | `BlogDetailHeader` | BlogDetailContent, CTASection | `blog-posts.ts` |
| `/blue-verification` | `(marketing)/blue-verification/page.tsx` | `VerificationHeroCard` | CTASection | — |
| `/bm` | `(marketing)/bm/page.tsx` | `BmHierarchyCard` | CTASection | — |
| `/faq` | `(marketing)/faq/page.tsx` | `PageHero` | FaqComponent08, CTASection | `landing-faq.ts` |
| `/google-agency` | `(marketing)/google-agency/page.tsx` | custom | CTASection | — |
| `/help` | `(marketing)/help/page.tsx` | `PageHero` | — | — |
| `/milestones` | `(marketing)/milestones/page.tsx` | `PageHero` | TimelineComponent05, CTASection | — |
| `/pages` | `(marketing)/pages/page.tsx` | — | — | — |
| `/partners` | `(marketing)/partners/page.tsx` | `PageHero` | CTASection | — |
| `/payment` | `(marketing)/payment/page.tsx` | `PageHero` | CTASection | — |
| `/pricing` | `(marketing)/pricing/page.tsx` | `PageHero` | PricingComponent09, ProductCatalogGrid, FaqComponent08, CTASection | inline + `landing-faq.ts` |
| `/profiles` | `(marketing)/profiles/page.tsx` | `ProfileHeroCard` | CTASection | — |
| `/reviews` | `(marketing)/reviews/page.tsx` | `PageHero` | Testimonials, CTASection | — |
| `/talk-to-sales` | `(marketing)/talk-to-sales/page.tsx` | `PageHero` | CTASection | — |
| `/tiktok-accounts` | `(marketing)/tiktok-accounts/page.tsx` | `TiktokHeroCard` | CTASection | — |
| `/tiktok-agency` | `(marketing)/tiktok-agency/page.tsx` | custom | CTASection | — |
| `/unban` | `(marketing)/unban/page.tsx` | `UnbanHeroCard` | CTASection | — |
| `/docs/[[...slug]]` | `docs/[[...slug]]/page.tsx` | DocsShell | DocsArticle, DocsAiPanel, DocsSidebar | `docs-articles.tsx`, `docs-navigation.ts` |
| `/tools` | `tools/page.tsx` | — | ToolsHubContent, ToolsSidebar | `tools-registry.ts` |
| `/tools/2fa` | `tools/2fa/page.tsx` | — | tool component | — |
| `/tools/batch-watermark` | `tools/batch-watermark/page.tsx` | — | tool component | — |
| `/tools/check-ip` | `tools/check-ip/page.tsx` | — | tool component | — |
| `/tools/cookie` | `tools/cookie/page.tsx` | — | tool component | — |
| `/tools/filter` | `tools/filter/page.tsx` | — | tool component | — |
| `/tools/merge` | `tools/merge/page.tsx` | — | tool component | — |
| `/tools/notepad` | `tools/notepad/page.tsx` | — | tool component | — |
| `/tools/remove-duplicates` | `tools/remove-duplicates/page.tsx` | — | tool component | — |
| `/tools/split-data` | `tools/split-data/page.tsx` | — | tool component | — |

---

## Page Structure Template

```tsx
// (marketing) inner page template
export default function SomePage() {
  return (
    <main className="flex-1">
      <PageHero label="Label" heading={<>Heading</>} description="..." />
      <SectionDivider />

      <SomeBlock data={someData} />
      <SectionDivider />

      <AnotherBlock />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
```

## Hero Variants

| Variant | Component | Used For |
|---------|-----------|---------|
| `HeroClone` | `blocks/hero-clone/hero-clone` | Landing page only — full animated hero with grid bg, word rotate, avatars |
| `PageHero` | `components/page-hero` | Standard inner pages — HeroGridBg + SectionHeader, centered |
| `ComingSoonHero` | `components/coming-soon-hero` | Product pages not yet launched (agency-ad-account, etc.) |
| `BlogDetailHeader` | `components/blog-detail-header` | Blog post pages — left-aligned, HeroGridBg |
| `BlogHero` | `components/blog-hero` | Blog index |
| Product hero cards | `blocks/[name]-hero-card.tsx` | Product-specific pages (bm, profiles, tiktok-accounts, unban, blue-verification) |

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| `HeroClone` on an inner page | Use `PageHero` or appropriate hero card |
| Missing `<SectionDivider />` between blocks | Add before and after every block |
| CTASection without preceding SectionDivider | Always: `<SectionDivider />\n<CTASection />` |
| Page component with its own `<header>` or `<nav>` | Remove — SiteHeader lives in layout.tsx |

## See Also

- `docs/block-adaptation.md` — adding new blocks to pages
- `docs/component-catalog.md` — full component inventory
- `app/src/app/(marketing)/` — all marketing page source files
