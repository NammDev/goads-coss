import Link from 'next/link'
import { ModeSwitcher } from '@/components/mode-switcher'
import { SearchTrigger } from '@/components/search-trigger'
import { Separator } from '@/components/ui/separator'
import { SsLogo, SsCtaIcon, LinkedInIcon, TelegramIcon, DiscordIcon } from './site-header-icons'
import { NavMegaMenu } from './nav-mega-menu'
import { NavMobileDrawer } from './nav-mobile-drawer'
import { CartButtonWrapper } from './cart-button-wrapper'

const SOCIAL_LINKS = [
  { href: '#', icon: LinkedInIcon, label: 'LinkedIn' },
  { href: '#', icon: TelegramIcon, label: 'Telegram' },
]

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
              <NavMegaMenu />
            </nav>

            {/* Action buttons */}
            <div className="flex items-center gap-2 lg:gap-4">
              <NavMobileDrawer />

              {/* Search */}
              <SearchTrigger />

              <Separator orientation="vertical" className="!h-8 max-lg:hidden" />

              {/* Social icons — primary color, same size-9 as theme/cart */}
              <div className="flex items-center gap-1 max-lg:hidden">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a key={label} target="_blank" rel="noopener noreferrer" href={href} className="inline-flex size-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/15">
                    <Icon />
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>

              <Separator orientation="vertical" className="!h-8 max-lg:hidden" />

              {/* Theme toggle + Cart */}
              <div className="flex items-center gap-2">
                <ModeSwitcher />
                <CartButtonWrapper />
                <a
                  href="/auth/login"
                  className="btn-mirror-sweep btn-secondary inline-flex shrink-0 items-center justify-center gap-1 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 h-9 px-4 py-2 max-md:hidden"
                >
                  Sign in
                  <SsCtaIcon />
                </a>
                <a
                  href="/auth/login"
                  className="btn-mirror-sweep btn-secondary inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 md:hidden"
                >
                  <SsCtaIcon />
                  <span className="sr-only">Sign in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
