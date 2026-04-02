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

      {/* .ask-ai-wrapper — spans all 5 grid columns, flex justify-between items-center */}
      <div className="flex items-center justify-between [grid-area:span_1/span_5/span_1/span_5]">
        {/* .div-block-352 */}
        <div>
          <div className="text-foreground"><div className={fpText.labelM}>Ask AI about Foreplay.co</div></div>
        </div>
        {/* .ask-ai-buttons-wrapper: flex, gap-2 */}
        <div className="flex gap-2">
          {/* ChatGPT */}
          <a href="#" className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[#ffffff29] text-muted-foreground transition-all duration-200 hover:border-[#4da68433] hover:bg-[#4da6841a] hover:text-[#4da684]">
            <div className="size-5"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.566 8.186a5.56 5.56 0 0 0-5.855-6.51 5.55 5.55 0 0 0-8.567 1.813A5.56 5.56 0 0 0 1.433 11.815a5.55 5.55 0 0 0 5.856 6.51 5.56 5.56 0 0 0 8.566-1.813 5.56 5.56 0 0 0 2.711-8.325Z" fill="currentColor" /></svg></div>
          </a>
          {/* Grok */}
          <a href="#" className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[#ffffff29] text-muted-foreground transition-all duration-200 hover:border-[#fff3] hover:bg-[#ffffff1a] hover:text-white">
            <div className="size-5"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.724 12.4l6.65-4.945a.56.56 0 0 1 .946.23c.818 1.984.452 4.37-1.174 6.01-1.626 1.638-3.89 1.998-5.958 1.18l-2.26 1.053c3.241 2.232 7.177 1.68 9.636-.799 1.95-1.965 2.555-4.643 1.99-7.059C16.74 4.526 17.761 3.108 19.852.208A3.4 3.4 0 0 1 20 0l-2.751 2.771v-.008L7.722 12.402M6.352 13.6c-2.326-2.237-1.925-5.702.06-7.7a5.36 5.36 0 0 1 5.971-1.193l2.255-1.049a6.75 6.75 0 0 0-9.65 2.81c-1.003 2.187.393 3.662 1.8 5.15.498.528.998 1.056 1.4 1.615L6.35 13.603" fill="currentColor" /></svg></div>
          </a>
          {/* Claude */}
          <a href="#" className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[#ffffff29] text-muted-foreground transition-all duration-200 hover:border-[#d9775733] hover:bg-[#d977571a] hover:text-[#d97757]">
            <div className="size-5"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.924 13.296l3.933-2.206.066-.192-.066-.107h-.191l-.658-.04-2.248-.061-1.95-.08-1.887-.102-.476-.101L0 9.82l.046-.293.4-.268.571.05 1.267.086 1.898.132 1.377.08 2.04.213h.325l.045-.131-.112-.082-.085-.08-1.965-1.33-2.127-1.406-1.113-.81-.604-.41-.303-.385-.132-.84.547-.602.734.05.188.051.743.571 1.59 1.23 2.076 1.528.306.253.12-.086.017-.06-.137-.228-1.13-2.038-1.205-2.075-.536-.86-.142-.517a2.3 2.3 0 0 1-.087-.607L5.236.112 5.58 0l.83.112.35.303.517 1.178.835 1.858 1.296 2.524.38.749.202.693.076.213h.132v-.122l.107-1.421.197-1.746.192-2.246.066-.633.313-.758.623-.41.487.233.4.571-.056.37-.238 1.542-.466 2.42-.303 1.618h.176l.203-.202.82-1.088 1.377-1.72.608-.683.709-.754.455-.359h.861l.633.941-.283.972-.887 1.122-.734.952-1.053 1.416-.658 1.133.06.092.157-.017 2.38-.505 1.286-.233 1.534-.263.694.324.076.329-.274.673-1.64.405-1.924.385-2.866.677-.035.025.04.05 1.292.122.551.03h1.352l2.517.188.658.435.395.532-.066.404-.946.517-1.367-.324-3.19-.758-1.094-.274h-.151v.091.89 1.51L17.793 16.022l.105.482-.268.379-.283-.04-1.838-1.382-.709-.622-1.605-1.35h-.107v.142l.37.541 1.954 2.934.101.9-.142.294-.506.178-.557-.102-1.145-1.604-1.179-1.806-.952-1.619-.117.067-.561 6.044-.264.309-.607.233-.506-.384-.268-.623.268-1.23.323-1.603.263-1.275.238-1.584.142-.527-.01-.035-.117.015-1.195 1.639-1.817 2.454-1.438 1.538-.345.136-.598-.308-.06-.552.335-.49 1.99-2.531 1.2-1.568.775-.905-.005-.131h-.046l-5.286 3.431-.928.122-.406-.38.051-.622.193-.202 1.59-1.094Z" fill="currentColor" /></svg></div>
          </a>
          {/* Perplexity */}
          <a href="#" className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[#ffffff29] text-muted-foreground transition-all duration-200 hover:border-[#58b5ca33] hover:bg-[#58b5ca33] hover:text-[#58b5ca]">
            <div className="size-5"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M16.488 0v6.06h2.262v8.623h-2.446V20l-5.864-5.162v5.121h-.91v-5.127L3.66 20v-5.388H1.25V5.99h2.403V0l5.878 5.412V.158h.909v5.408L16.488 0Zm-6.048 7.537v6.099l4.955 4.361v-5.964l-4.955-4.496Zm-.916-.067l-4.955 4.498v6.03l4.955-4.362V7.47Zm6.78 6.317h1.537V6.958h-6.624l5.087 4.616v2.213ZM8.82 6.887H2.158v6.829h1.5v-2.147l5.16-4.682ZM4.563 2.063v3.925h4.262L4.563 2.063Zm11.016 0L11.316 5.988h4.263V2.063Z" fill="currentColor" /></svg></div>
          </a>
          {/* Gemini */}
          <a href="#" className="flex size-[35px] items-center justify-center rounded-[9px] border-[1.5px] border-[#ffffff29] text-muted-foreground transition-all duration-200 hover:border-[#306df633] hover:bg-[#306df61a] hover:text-[#306df6]">
            <div className="size-5"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M17.179 9.03a12.5 12.5 0 0 1-3.708-2.5A12.5 12.5 0 0 1 10.406 1.15.4.4 0 0 0 10 .836a.4.4 0 0 0-.407.316 12.5 12.5 0 0 1-3.066 5.377 12.5 12.5 0 0 1-4.649 2.5.4.4 0 0 0 0 .77 12.5 12.5 0 0 1 4.649 2.5 12.5 12.5 0 0 1 3.066 5.378.4.4 0 0 0 .407.315.4.4 0 0 0 .406-.315 12.5 12.5 0 0 1 3.065-5.378 12.5 12.5 0 0 1 4.849-2.5.4.4 0 0 0 0-.769 12.5 12.5 0 0 1-1.67-.565Z" fill="currentColor" /></svg></div>
          </a>
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
