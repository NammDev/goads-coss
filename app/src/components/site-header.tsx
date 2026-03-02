import Link from 'next/link'
import { Search, Menu, LogIn, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeSwitcher } from '@/components/mode-switcher'
import { Separator } from '@/components/ui/separator'
import { SsLogo, SsCtaIcon, GithubIcon, XIcon, DiscordIcon } from './site-header-icons'
import { NavMegaMenu } from './nav-mega-menu'

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
]

const SOCIAL_LINKS = [
  { href: 'https://github.com/shadcnstudio/shadcn-studio', icon: GithubIcon, label: 'Github' },
  { href: 'https://x.com/ShadcnStudio', icon: XIcon, label: 'X' },
  { href: 'https://discord.com/invite/kBHkY7DekX', icon: DiscordIcon, label: 'Discord' },
]

const navLinkClass = 'text-sm text-muted-foreground transition-all hover:text-foreground'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex min-h-(--header-height) w-full shrink-0 items-center justify-center border-b border-dashed backdrop-blur-[8px] bg-background/60">
      <div className="container flex h-full items-center">
        <div className="flex w-full items-center justify-between max-lg:gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2.5 max-[550px]:[&_span]:hidden">
              <SsLogo />
              <span className="text-xl font-semibold">goads/agency</span>
            </div>
          </Link>

          <div className="flex items-center justify-end gap-2 sm:gap-6 lg:justify-between">

            {/* Desktop nav — visible above 1440px */}
            <nav className="flex items-center gap-4 max-[1440px]:hidden">
              {/* Mega menu dropdowns */}
              <NavMegaMenu />
              {/* Simple links */}
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action buttons */}
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile hamburger — below 1440px */}
                <Button variant="outline" size="icon" className="min-[1440px]:hidden cursor-pointer">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </Button>

                {/* Search */}
                <Button variant="outline" size="icon">
                  <Search />
                  <span className="sr-only">Search</span>
                </Button>

                {/* Dark mode toggle */}
                <ModeSwitcher />

                {/* Theme customizer */}
                <Button size="icon" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <Palette className="size-4" />
                  <span className="sr-only">Theme customizer</span>
                </Button>
              </div>

              {/* Separator */}
              <Separator orientation="vertical" className="!h-8 max-lg:hidden" />

              {/* Social links */}
              <div className="flex items-center gap-3 max-lg:hidden">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a key={label} target="_blank" rel="noopener noreferrer" href={href} className="text-muted-foreground transition-colors hover:text-foreground">
                    <Icon />
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>

              {/* Auth + CTA */}
              <div className="flex items-center gap-2">
                {/* Sign in — text on sm+, icon on mobile */}
                <Button variant="outline" asChild className="max-sm:hidden">
                  <a href="/auth/login">Sign in</a>
                </Button>
                <Button variant="outline" size="icon" asChild className="!hidden max-sm:!flex">
                  <a href="/auth/login">
                    <LogIn />
                    <span className="sr-only">Sign in</span>
                  </a>
                </Button>

                {/* CTA — full on md+, icon-only on mobile */}
                <a
                  href="/#pricing"
                  className="btn-cta-glow inline-flex shrink-0 items-center justify-center gap-1 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 h-9 px-4 py-2 max-md:hidden"
                >
                  Get all access
                  <SsCtaIcon />
                </a>
                <a
                  href="/#pricing"
                  className="btn-cta-glow inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 md:hidden"
                >
                  <SsCtaIcon />
                  <span className="sr-only">Get all access</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
