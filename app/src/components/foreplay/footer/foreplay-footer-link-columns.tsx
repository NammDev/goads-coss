// Footer link columns — .footer-links (5-col grid of link categories)
// .footer-links: grid 5col, gap-4. Tablet: 3col, gap-y-8. Mobile: 2col
// .footer-text-category: flex col, gap-2.5 (10px), color #ffffffeb. Mobile: gap-3
// .u-footer-link-list: flex col, gap-1, pl-0, mb-0. Tablet: pb-6. Mobile: pb-4
// .u-footer-link: color #ffffffad, py-0.5 (3px). Tablet: py-1.5. hover: color #fff
// .footer-double-category: flex col, gap-5 (for Company+Community combined column)

import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { footerLinkCategories } from "@/data/foreplay-footer-links-data"

export function ForeplayFooterLinkColumns() {
  // Company + Community go in a combined column (footer-double-category)
  const mainCols = footerLinkCategories.filter(c => c.title !== "Company" && c.title !== "Community")
  const companyCat = footerLinkCategories.find(c => c.title === "Company")
  const communityCat = footerLinkCategories.find(c => c.title === "Community")

  return (
    <div className="grid auto-cols-fr grid-cols-5 gap-4 max-md:grid-cols-3 max-md:gap-y-8 max-sm:grid-cols-2">
      {mainCols.map(cat => (
        <LinkCategory key={cat.title} title={cat.title} links={cat.links} />
      ))}

      {/* .footer-double-category — Company + Community stacked */}
      <div className="flex flex-col gap-5">
        {companyCat && <LinkCategory title={companyCat.title} links={companyCat.links} />}
        {communityCat && <LinkCategory title={communityCat.title} links={communityCat.links} />}
      </div>

      {/* .footer-text-ad — Ad Count stats (grid item inside .footer-links) */}
      <div className="flex max-w-64 flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="text-foreground">
            <div className={fpText.overline}>Ad Count</div>
            <div className="h-1" />
            <div className="font-display text-[1.75rem] font-semibold leading-[2.25rem] tracking-[-0.00714em] [font-optical-sizing:auto]">181,659,436</div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 212 41" width="100%" height="100%"><path stroke="#fff" strokeLinecap="round" strokeOpacity=".36" strokeWidth="2" d="M1 40V29m7 11V18m7 22V1m7 39V12m7 28V22m7 18V8m7 32V17m7 23V12m7 28V21m7 19V10m7 30V16m7 24V12m7 28V9m7 31V15m7 25V19m7 21V6m7 34V13m7 27V16m7 24V19m7 21V22m7 18V12m7 28V16m7 24V12m7 28V8m7 32V3m7 37V6m7 34V15m7 25V11m7 29V15m7 25V18" /><path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M211 40V14" /></svg>
          </div>
        </div>
        {/* .footer-text-ad-rows */}
        <div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-sm bg-[var(--fp-teal,#10b981)]" />
            <div className="flex-1 text-[var(--fp-alpha-100)]"><div className={fpText.bodyS}>Live</div></div>
            <div className="text-foreground">7,232,217</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-sm bg-[var(--fp-neutral-500,#71717a)]" />
            <div className="flex-1 text-[var(--fp-alpha-100)]"><div className={fpText.bodyS}>Historical</div></div>
            <div className="text-foreground">174,427,219</div>
          </div>
        </div>
      </div>

      {/* .ask-ai-wrapper — Ask AI buttons (grid item inside .footer-links) */}
      <div className="flex items-center">
        {/* .div-block-352 */}
        <div>
          <div className="text-foreground"><div className={fpText.labelM}>Ask AI about GoAds</div></div>
        </div>
        {/* .ask-ai-buttons-wrapper: flex, gap-2 */}
        <div className="flex gap-2">
          {/* Placeholder AI buttons — .ai-button: 35x35, border 1.5px neutral-600, rounded-[9px] */}
          {["ChatGPT", "Grok", "Claude", "Perplexity", "Gemini"].map(name => (
            <a key={name} href="#" target="_blank" rel="noopener noreferrer"
              className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[var(--fp-neutral-600)] text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-foreground/20"
            >
              <div className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function LinkCategory({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-2.5 text-[#ffffffeb] max-sm:gap-3">
      <div className={fpText.overline}>{title}</div>
      <ul className="mb-0 flex flex-col gap-1 pl-0 max-md:pb-6 max-sm:pb-4">
        {links.map(link => (
          <li key={link.label} className="list-none">
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="block py-[3px] text-[#ffffffad] no-underline transition-opacity duration-200 hover:text-foreground max-md:py-1.5"
            >
              <div className={fpText.bodyS}>{link.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
