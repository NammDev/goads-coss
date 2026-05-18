'use client'

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/components/product-catalog'

/* ---------- types ---------- */

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  unit?: string
}

/**
 * v2 cart storage schema.
 * ownerCustomerId: Clerk userId bound on portal mount — used to clear cart on user switch.
 * pendingCheckout: true when the user was redirected to wallet due to insufficient balance.
 * pendingCheckoutTotal: snapshot of the cart total at redirect time (for banner display only).
 */
type CartStorage = {
  version: 2
  ownerCustomerId: string | null
  items: CartItem[]
  pendingCheckout: boolean
  pendingCheckoutTotal: number | null
}

/* ---------- external store (localStorage-backed) ---------- */

const STORAGE_KEY = 'goads-cart'

const DEFAULT_STATE: CartStorage = {
  version: 2,
  ownerCustomerId: null,
  items: [],
  pendingCheckout: false,
  pendingCheckoutTotal: null,
}

let listeners: (() => void)[] = []
let cartState: CartStorage = { ...DEFAULT_STATE }

function getSnapshot(): CartStorage {
  return cartState
}

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function emit() {
  listeners.forEach((l) => l())
}

function persist(state: CartStorage) {
  cartState = state
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
  emit()
}

function hydrate(activeUserId?: string | null) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    const parsed = JSON.parse(raw) as Partial<CartStorage>

    // Migrate v1 (no version field) to v2
    const stored: CartStorage = {
      version: 2,
      ownerCustomerId: parsed.ownerCustomerId ?? null,
      items: parsed.items ?? [],
      pendingCheckout: parsed.pendingCheckout ?? false,
      pendingCheckoutTotal: parsed.pendingCheckoutTotal ?? null,
    }

    // Owner mismatch: clear cart and pending state (Requirement 7.5)
    if (
      activeUserId &&
      stored.ownerCustomerId &&
      stored.ownerCustomerId !== activeUserId
    ) {
      cartState = { ...DEFAULT_STATE, ownerCustomerId: activeUserId }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState))
      return
    }

    cartState = stored
  } catch {
    cartState = { ...DEFAULT_STATE }
  }
}

/* ---------- actions ---------- */

function generateId(product: Product): string {
  return product.name.toLowerCase().replace(/\s+/g, '-')
}

function addItem(product: Product) {
  if (product.price === 'contact') return
  const id = generateId(product)
  const existing = cartState.items.find((i) => i.id === id)
  if (existing) {
    persist({
      ...cartState,
      items: cartState.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })
  } else {
    persist({
      ...cartState,
      items: [
        ...cartState.items,
        { id, name: product.name, price: product.price, quantity: 1, unit: product.unit },
      ],
    })
  }
  /* notify cart sheet to auto-open + show toast */
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart:item-added'))
    const qty = existing ? existing.quantity + 1 : 1
    toast(`${product.name} added to cart`, {
      description: `Quantity: ${qty}`,
      action: {
        label: 'View Cart',
        onClick: () => window.dispatchEvent(new CustomEvent('cart:item-added')),
      },
    })
  }
}

function removeItem(id: string) {
  persist({ ...cartState, items: cartState.items.filter((i) => i.id !== id) })
}

function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) return removeItem(id)
  persist({
    ...cartState,
    items: cartState.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
  })
}

function clearCart() {
  persist({ ...cartState, items: [] })
}

function setPendingCheckout(pending: boolean, snapshotTotal?: number) {
  persist({
    ...cartState,
    pendingCheckout: pending,
    pendingCheckoutTotal: snapshotTotal ?? cartState.pendingCheckoutTotal,
  })
}

function clearPendingCheckout() {
  persist({
    ...cartState,
    pendingCheckout: false,
    pendingCheckoutTotal: null,
  })
}

function bindOwner(customerId: string) {
  if (cartState.ownerCustomerId === customerId) return
  // If a different owner was stored, clear the cart first
  if (cartState.ownerCustomerId && cartState.ownerCustomerId !== customerId) {
    persist({ ...DEFAULT_STATE, ownerCustomerId: customerId })
    return
  }
  persist({ ...cartState, ownerCustomerId: customerId })
}

/** Open the cart UI without mutating it (e.g. a "View cart" CTA). */
export function openCart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart:open'))
  }
}

/* ---------- context ---------- */

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  subtotal: number
  ownerCustomerId: string | null
  pendingCheckout: boolean
  pendingCheckoutTotal: number | null
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setPendingCheckout: (pending: boolean, snapshotTotal?: number) => void
  clearPendingCheckout: () => void
  bindOwner: (customerId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

/* cached server snapshot to avoid infinite re-render */
const SERVER_SNAPSHOT: CartStorage = { ...DEFAULT_STATE }
function getServerSnapshot(): CartStorage {
  return SERVER_SNAPSHOT
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  /* hydrate once on mount */
  if (typeof window !== 'undefined' && cartState.items.length === 0 && !cartState.ownerCustomerId) {
    hydrate()
  }

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const value: CartContextValue = {
    items: state.items,
    totalItems: state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    ownerCustomerId: state.ownerCustomerId,
    pendingCheckout: state.pendingCheckout,
    pendingCheckoutTotal: state.pendingCheckoutTotal,
    addItem: useCallback((p: Product) => addItem(p), []),
    removeItem: useCallback((id: string) => removeItem(id), []),
    updateQuantity: useCallback((id: string, q: number) => updateQuantity(id, q), []),
    clearCart: useCallback(() => clearCart(), []),
    setPendingCheckout: useCallback(
      (pending: boolean, snapshotTotal?: number) => setPendingCheckout(pending, snapshotTotal),
      [],
    ),
    clearPendingCheckout: useCallback(() => clearPendingCheckout(), []),
    bindOwner: useCallback((customerId: string) => bindOwner(customerId), []),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
