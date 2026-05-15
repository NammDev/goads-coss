// Foreplay header — mobile hamburger + slide-in drawer
// Breakpoints: max-md (≤991px) show hamburger, hide desktop nav
// Source uses .w-nav-button hamburger + .nav-menu drawer on mobile
// DOM: Sheet from right with logo + Start free trial at top, accordion nav items below
//
// Auto-close on route change via Next.js usePathname effect
// Scroll lock handled by shadcn Sheet (Radix Dialog)

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fpText } from "@/components/foreplay/foreplay-typography"

// ── Mobile menu data (matches desktop dropdowns, flattened for accordion) ──
const mobileProductItems = [
  { section: "Research", items: [
    { label: "Swipe File", desc: "Save & share creative inspiration.", href: "/swipe-file" },
    { label: "Discovery", desc: "Ad search engine with over 100M ads.", href: "/discovery" },
    { label: "Spyder", desc: "Track and analyze competitor advertising 24/7", href: "/spyder" },
  ]},
  { section: "Analytics & Production", items: [
    { label: "Lens", desc: "Advertising analytics for creative teams.", href: "/lens" },
    { label: "Briefs", desc: "Turn inspiration into actionable briefs.", href: "/briefs" },
  ]},
  { section: "Extend", items: [
    { label: "Chrome Extension", desc: "Save ads from anywhere.", href: "https://chromewebstore.google.com/" },
    { label: "Mobile App", desc: "Save ads from your phone.", href: "/mobile-app" },
    { label: "API", desc: "Leverage Foreplay data.", href: "/api" },
  ]},
]

const mobileResourcesItems = [
  { label: "University", desc: "Ad masterclasses", href: "/university" },
  { label: "Events & Webinars", desc: "Live workshops + Q&A", href: "/fireside" },
  { label: "Knowledge Base", desc: "Guides and tutorials", href: "https://help.foreplay.co/" },
  { label: "Experts", desc: "Free Swipe Files", href: "/experts" },
  { label: "Blog", desc: "Marketing news & tips", href: "/blog" },
  { label: "Affiliate Program", desc: "Make over $10k/mo referring Foreplay", href: "/affiliates" },
  { label: "Work with Brands", desc: "Get world-class creative services.", href: "/work-with-brands" },
  { label: "Agency Directory", desc: "Discover the worlds best agencies.", href: "/agency-directory" },
]

export function ForeplayHeaderMobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Auto-close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger trigger — show on mobile (≤991px), hide on desktop */}
      <SheetTrigger
        asChild
        className="hidden max-md:flex"
      >
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-[10px] p-2 text-foreground transition-colors hover:bg-[var(--fp-alpha-700)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </SheetTrigger>

      {/* Drawer from right — full-height, dark bg, scroll internally */}
      <SheetContent
        side="right"
        className={cn(
          "foreplay w-full max-w-md overflow-y-auto border-[var(--fp-border-nav)] bg-background p-0 text-[var(--fp-alpha-100)]",
          "sm:max-w-md",
        )}
      >
        {/* Hidden title/description for a11y */}
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">Foreplay site navigation</SheetDescription>

        {/* Drawer header: logo + Start free trial CTA */}
        <div className="flex items-center justify-between border-b border-[var(--fp-border-nav)] px-4 py-4">
          <Link href="/" className="p-1" onClick={() => setOpen(false)}>
            <svg width="108" height="32" viewBox="0 0 108 32" fill="none" className="text-foreground">
              <path fill="currentColor" d="M4.38 3.43h2.2v6.86H0V8a4.48 4.48 0 0 1 4.38-4.57Z" />
              <path fill="currentColor" d="M17.52 3.43H8.76v6.86h8.76V3.43Z" opacity=".85" />
              <path fill="currentColor" d="M16.43 12.57H8.76v6.86h5.48c1.2 0 2.19-.98 2.19-2.2v-4.66Z" opacity=".7" />
              <path fill="currentColor" d="M24.1 12.57h-5.48v4.67a2.2 2.2 0 0 0 2.19 2.19h3.29v-6.86Z" opacity=".2" />
              <path fill="currentColor" d="M17.52 21.71h6.58v2.3a4.48 4.48 0 0 1-4.39 4.56h-2.19v-6.86Z" opacity=".1" />
              <path fill="currentColor" d="M13.14 21.71H8.76v6.86h6.57v-4.66a2.2 2.2 0 0 0-2.19-2.2Z" opacity=".2" />
              <path fill="currentColor" d="M19.71 3.43A4.48 4.48 0 0 1 24.1 8v2.29H19.7V3.43Z" opacity=".6" />
              <path fill="currentColor" d="M6.57 12.57H0v6.86h6.57v-6.86Z" opacity=".85" />
              <path fill="currentColor" d="M0 21.71h6.57v6.86H4.38A4.48 4.48 0 0 1 0 24v-2.29Z" opacity=".6" />
            </svg>
          </Link>
          <Link
            href="/sign-up"
            className="flex items-center rounded-[10px] bg-foreground px-3 py-2 text-[var(--fp-solid-900)] no-underline"
          >
            <span className={fpText.labelS}>Start free trial</span>
          </Link>
        </div>

        {/* Accordion nav */}
        <Accordion type="multiple" className="flex flex-col px-4 py-4">
          {/* Product accordion */}
          <AccordionItem value="product" className="border-[var(--fp-border-nav)]">
            <AccordionTrigger className="py-4 text-foreground hover:no-underline [&>svg]:text-[var(--fp-alpha-100)]">
              <span className="font-sans text-[0.9375rem]">Product</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-4">
                {mobileProductItems.map((section) => (
                  <div key={section.section} className="flex flex-col gap-2">
                    <div className="px-2 text-[var(--fp-alpha-50)]">
                      <div className={fpText.overline}>{section.section}</div>
                    </div>
                    <ul className="m-0 flex flex-col gap-1 p-0">
                      {section.items.map((item) => (
                        <li key={item.label} className="list-none">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex flex-col rounded-[10px] px-2 py-2 text-[var(--fp-alpha-100)] no-underline transition-colors hover:bg-[var(--fp-alpha-700)]"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                          >
                            <span className={cn(fpText.labelS, "text-foreground")}>{item.label}</span>
                            <span className={fpText.bodyS}>{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Resources accordion */}
          <AccordionItem value="resources" className="border-[var(--fp-border-nav)]">
            <AccordionTrigger className="py-4 text-foreground hover:no-underline [&>svg]:text-[var(--fp-alpha-100)]">
              <span className="font-sans text-[0.9375rem]">Resources</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="m-0 flex flex-col gap-1 p-0">
                {mobileResourcesItems.map((item) => (
                  <li key={item.label} className="list-none">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      className="flex flex-col rounded-[10px] px-2 py-2 text-[var(--fp-alpha-100)] no-underline transition-colors hover:bg-[var(--fp-alpha-700)]"
                    >
                      <span className={cn(fpText.labelS, "text-foreground")}>{item.label}</span>
                      <span className={fpText.bodyS}>{item.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Plain links: Pricing, Book a Demo, Sign in */}
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="border-b border-[var(--fp-border-nav)] py-4 text-foreground no-underline"
          >
            <span className="font-sans text-[0.9375rem]">Pricing</span>
          </Link>
          <Link
            href="/book-demo"
            onClick={() => setOpen(false)}
            className="border-b border-[var(--fp-border-nav)] py-4 text-foreground no-underline"
          >
            <span className="font-sans text-[0.9375rem]">Book a Demo</span>
          </Link>
          <Link
            href="/sign-in"
            onClick={() => setOpen(false)}
            className="py-4 text-foreground no-underline"
          >
            <span className="font-sans text-[0.9375rem]">Sign in</span>
          </Link>
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
