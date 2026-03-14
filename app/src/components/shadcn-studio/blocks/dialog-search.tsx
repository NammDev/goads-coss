'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import {
  StoreIcon,
  ShoppingCartIcon,
  WalletIcon,
  PackageIcon,
  WrenchIcon,
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Undo2Icon,
  Loader2Icon,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { searchPortal, type SearchResults } from '@/lib/actions/portal-search-action'

type Props = {
  trigger: ReactNode
  userId?: string
  defaultOpen?: boolean
  className?: string
}

/** Static portal navigation pages */
const portalPages = [
  { label: 'Shop', href: '/portal', icon: StoreIcon },
  { label: 'Orders', href: '/portal/orders', icon: ShoppingCartIcon },
  { label: 'Wallet', href: '/portal/wallet', icon: WalletIcon },
  { label: 'Products', href: '/portal/products', icon: PackageIcon },
  { label: 'Tools', href: '/portal/tools', icon: WrenchIcon },
  { label: 'Profile', href: '/portal/profile', icon: UserIcon },
]

const groupHeadingClass =
  '[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'

const SearchDialog = ({ defaultOpen = false, trigger, userId, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  /** Navigate to href and close dialog */
  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  /** Debounced search — triggers server action */
  useEffect(() => {
    if (!search.trim() || !userId) {
      setResults(null)
      return
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        const data = await searchPortal(userId, search)
        setResults(data)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [search, userId])

  /** Cmd+K global shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const hasResults = results && (results.orders.length > 0 || results.products.length > 0 || results.wallet.length > 0)

  return (
    <div className={className}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search here..."
          value={search}
          onValueChange={setSearch}
          className="text-base [svg:has(+&)]:size-5 [svg:has(+&)]:opacity-100"
        />

        <CommandList className="max-h-[65vh]">
          <CommandEmpty>
            {isPending ? (
              <span className="text-muted-foreground flex items-center justify-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                Searching...
              </span>
            ) : (
              'No results found.'
            )}
          </CommandEmpty>

          {/* Static pages — always visible, filtered by cmdk */}
          <CommandGroup heading="Pages" className={groupHeadingClass}>
            {portalPages.map((page) => (
              <CommandItem
                key={page.href}
                value={page.label}
                onSelect={() => handleSelect(page.href)}
                className="!py-1.5 text-base"
              >
                <page.icon className="text-foreground !size-4.5" />
                <span className="flex-1">{page.label}</span>
                <span className="text-muted-foreground text-xs">{page.href}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Dynamic results — only when query has results */}
          {hasResults && (
            <>
              {results.orders.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Orders" className={groupHeadingClass}>
                    {results.orders.map((order) => (
                      <CommandItem
                        key={order.id}
                        value={`order ${order.orderNumber}`}
                        onSelect={() => handleSelect(order.href)}
                        className="!py-1.5 text-base"
                      >
                        <ShoppingCartIcon className="text-foreground !size-4.5" />
                        <span className="flex-1">Order #{order.orderNumber}</span>
                        <span className="text-muted-foreground text-sm">{order.total}</span>
                        <span className="text-muted-foreground text-xs capitalize">{order.status}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {results.products.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Products" className={groupHeadingClass}>
                    {results.products.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={`product ${product.name}`}
                        onSelect={() => handleSelect(product.href)}
                        className="!py-1.5 text-base"
                      >
                        <PackageIcon className="text-foreground !size-4.5" />
                        <span className="flex-1">{product.name}</span>
                        <span className="text-muted-foreground text-sm">{product.price}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {results.wallet.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Wallet" className={groupHeadingClass}>
                    {results.wallet.map((tx) => (
                      <CommandItem
                        key={tx.id}
                        value={`wallet ${tx.type} ${tx.note ?? ''}`}
                        onSelect={() => handleSelect(tx.href)}
                        className="!py-1.5 text-base"
                      >
                        <WalletIcon className="text-foreground !size-4.5" />
                        <span className="flex-1 capitalize">{tx.type} {tx.amount}</span>
                        <span className="text-muted-foreground text-xs">{tx.date}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}

          {/* Loading indicator when searching with existing pages visible */}
          {isPending && search.trim() && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Searching..." className={groupHeadingClass}>
                <CommandItem disabled className="!py-1.5 text-base">
                  <Loader2Icon className="text-muted-foreground !size-4.5 animate-spin" />
                  <span className="text-muted-foreground">Looking up orders, products, wallet...</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>

        <CommandSeparator />

        <div className="text-muted-foreground flex flex-wrap items-center gap-4 p-6">
          <div className="flex flex-1 items-center gap-2">
            <kbd className="rounded border px-1 text-sm">esc</kbd>
            <span>To close</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded border">
              <Undo2Icon className="size-4" />
            </div>
            <span>To Select</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded border">
              <ArrowUpIcon className="size-4" />
            </div>
            <div className="flex size-5 items-center justify-center rounded border">
              <ArrowDownIcon className="size-4" />
            </div>
            <span>To Navigate</span>
          </div>
        </div>
      </CommandDialog>
    </div>
  )
}

export default SearchDialog
