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
  // Company + Legal go in a combined column (footer-double-category)
  const mainCols = footerLinkCategories.filter(c => c.title !== "Company" && c.title !== "Legal")
  const companyCat = footerLinkCategories.find(c => c.title === "Company")
  const legalCat = footerLinkCategories.find(c => c.title === "Legal")

  return (
    <div className="grid auto-cols-fr grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-y-8 max-sm:grid-cols-2">
      {mainCols.map(cat => (
        <LinkCategory key={cat.title} title={cat.title} links={cat.links} />
      ))}

      {/* .footer-double-category — Company + Legal stacked */}
      <div className="flex flex-col gap-5">
        {companyCat && <LinkCategory title={companyCat.title} links={companyCat.links} />}
        {legalCat && <LinkCategory title={legalCat.title} links={legalCat.links} />}
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
