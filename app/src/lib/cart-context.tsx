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

type CartState = {
  items: CartItem[]
}

/* ---------- external store (localStorage-backed) ---------- */

const STORAGE_KEY = 'goads-cart'
let listeners: (() => void)[] = []
let cartState: CartState = { items: [] }

function getSnapshot(): CartState {
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

function persist(state: CartState) {
  cartState = state
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
  emit()
}

function hydrate() {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) cartState = JSON.parse(raw)
  } catch {
    cartState = { items: [] }
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
      items: cartState.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })
  } else {
    persist({
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
  persist({ items: cartState.items.filter((i) => i.id !== id) })
}

function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) return removeItem(id)
  persist({
    items: cartState.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
  })
}

function clearCart() {
  persist({ items: [] })
}

/* ---------- context ---------- */

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

/* cached server snapshot to avoid infinite re-render */
const SERVER_SNAPSHOT: CartState = { items: [] }
function getServerSnapshot(): CartState {
  return SERVER_SNAPSHOT
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  /* hydrate once on mount */
  if (typeof window !== 'undefined' && cartState.items.length === 0) {
    hydrate()
  }

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const value: CartContextValue = {
    items: state.items,
    totalItems: state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    addItem: useCallback((p: Product) => addItem(p), []),
    removeItem: useCallback((id: string) => removeItem(id), []),
    updateQuantity: useCallback((id: string, q: number) => updateQuantity(id, q), []),
    clearCart: useCallback(() => clearCart(), []),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
