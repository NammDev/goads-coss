import Link from "next/link";

import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const products = [
  { label: "Meta Agency", href: "/products/meta-agency" },
  { label: "Google Whitelisted", href: "/products/google-agency" },
  { label: "TikTok Verified", href: "/products/tiktok-agency" },
  { label: "Business Managers", href: "/products/business-managers" },
  { label: "Profiles & Pages", href: "/products/meta-assets" },
  { label: "Pixel Bank", href: "/products/bm-standard" },
];

const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-sidebar/80 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64">
      <div className="container relative flex h-(--header-height) w-full items-center gap-2">
        {/* Logo - left */}
        <Link
          aria-label="Home"
          href="/"
          className="shrink-0 font-sans text-xl font-semibold tracking-tight"
        >
          goads
        </Link>

        {/* Center nav */}
        <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                type="button"
              >
                Products
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {products.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:ml-0">
          <ModeSwitcher />
          <Button size="sm" className="ml-1 hidden sm:inline-flex" asChild>
            <Link href="/products">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
