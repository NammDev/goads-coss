import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, PackageIcon, SettingsIcon } from 'lucide-react'

import { requireRole } from '@/lib/auth/require-role'
import { getPortalStats } from '@/lib/db/queries/dashboard-queries'
import { getProductCountsByCustomerId, getOrdersWithItemsByCustomerId } from '@/lib/db/queries'
import { getCustomerBalance, getWalletTransactions } from '@/lib/db/queries/wallet-queries'
import { productTypeLabels } from '@/data/mock-products'
import { CONTACT } from '@/data/contact-info'
import { DiscordLogo, TelegramLogo } from '@/assets/svg/ad-platform-logos'
import { DotBg } from '@/components/atoms/dot-bg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PortalStats } from './portal-stats'
import { PortalGreeting } from './portal-greeting'
import { PortalRecentOrders } from './portal-recent-orders'
import { PortalWalletPanel } from './portal-wallet-panel'

/** Product groups surfaced as quick-access cards (same 5 as the sidebar/pricing). */
const PRODUCT_LINKS = [
  { type: 'bm', icon: '/assets/BM.webp' },
  { type: 'profile', icon: '/assets/PROFILES.webp' },
  { type: 'page', icon: '/navbar/pages.webp' },
  { type: 'agency_account', icon: '/assets/META.webp' },
  { type: 'tiktok_account', icon: '/navbar/tiktok.webp' },
] as const

/** Community + support channels for the black invite banner (both Telegram + Discord). */
const COMMUNITY_LINKS = [
  { label: 'Telegram Support', href: CONTACT.telegram.support, Logo: TelegramLogo },
  { label: 'Telegram Channel', href: CONTACT.telegram.channel, Logo: TelegramLogo },
  { label: 'Discord', href: CONTACT.discord, Logo: DiscordLogo },
] as const

/** Reusable section heading — icon tile + title + subtitle (Foreplay pattern,
 *  matches the product-tabs page header). */
function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-card flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base font-semibold leading-none tracking-tight">{title}</h2>
        <span className="text-muted-foreground text-sm">{subtitle}</span>
      </div>
    </div>
  )
}

/**
 * Portal home — unified dashboard: personalized greeting, wallet/order KPIs,
 * recent orders + wallet snapshot, quick access to every product group, and a
 * black community-invite banner (both Telegram channels + Discord).
 */
export default async function PortalHomePage() {
  const session = await requireRole('customer')
  const userId = session.user.id

  const [stats, productCounts, balance, transactions, orders] = await Promise.all([
    getPortalStats(userId),
    getProductCountsByCustomerId(userId),
    getCustomerBalance(userId),
    getWalletTransactions(userId),
    getOrdersWithItemsByCustomerId(userId),
  ])

  const name = session.user.name ?? 'Customer'
  const email = session.user.email
  const initial = name.trim().charAt(0).toUpperCase() || 'C'

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      {/* Greeting — personalized welcome + quick link to account settings */}
      <Card className="rounded-2xl">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
              {initial}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-semibold tracking-tight">
                <PortalGreeting name={name} />
              </span>
              <span className="text-muted-foreground text-sm">{email}</span>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="self-start sm:self-auto">
            <Link href="/portal/profile">
              <SettingsIcon className="size-4" />
              Account Settings
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* At-a-glance KPIs — wallet balance featured first */}
      <PortalStats
        balance={balance ?? '0'}
        totalOrders={stats.totalOrders}
        activeItems={stats.activeItems}
        totalSpent={stats.totalSpent}
      />

      {/* Bento: recent orders (wide) + wallet snapshot (narrow) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PortalRecentOrders orders={orders} />
        </div>
        <PortalWalletPanel balance={balance ?? '0'} transactions={transactions} />
      </div>

      {/* Your products — jump straight into any delivered-product group */}
      <div className="space-y-3">
        <SectionHeader
          icon={<PackageIcon className="text-muted-foreground size-5" />}
          title="Your products"
          subtitle="Delivered assets in your account"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_LINKS.map(({ type, icon }) => {
            const count = productCounts[type] ?? 0
            return (
              <Link
                key={type}
                href={`/portal/products?type=${type}`}
                className="group bg-card hover:border-primary/40 hover:bg-accent/40 flex items-center gap-3 rounded-2xl border p-4 shadow-xs transition-colors"
              >
                <div className="bg-card flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm">
                  <Image
                    src={icon}
                    alt=""
                    width={26}
                    height={26}
                    className="size-[26px] object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {productTypeLabels[type]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {count > 0 ? `${count} item${count > 1 ? 's' : ''}` : 'None yet'}
                  </span>
                </div>
                <ArrowRightIcon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Community band — GOADS dark + dot-grid hero (same as the marketing site
          hero). Green accent only; channel icons stay monochrome to keep it calm. */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b0c12] p-5 text-white">
        <DotBg />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <TelegramLogo className="size-6 text-white [&_path]:fill-current" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold">Join the GOADS community</p>
              <p className="text-sm text-white/55">
                Fast support, restock alerts &amp; tips — on Telegram and Discord.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMMUNITY_LINKS.map(({ label, href, Logo }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Logo className="size-4 text-white/80 [&_path]:fill-current" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
