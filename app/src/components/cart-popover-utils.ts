// Cart helpers extracted from cart-popover.tsx. Pure — no JSX, no hooks.

import type { useCart } from '@/lib/cart-context'
import { CONTACT } from '@/data/contact-info'

// Display price: thousands grouped to the international standard
// (1000 → "1,000"), drop the trailing ".00" for whole amounts, keep 2
// decimals only when there are real cents (1234.5 → "1,234.50"). UI only.
export function formatPrice(n: number): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

// Orders go to the official GoAds Telegram (per request).
export const TELEGRAM_URL = CONTACT.telegram.official

// Builds a concise, professional order summary (plain text — Telegram's
// prefilled compose box does not render Markdown). Brand name in full caps;
// no item-count line; restrained tone.
export function buildTelegramMessage(
  items: ReturnType<typeof useCart>['items'],
  subtotal: number,
  payment: string,
  note?: string,
) {
  const trimmedNote = note?.trim()

  const itemLines = items.flatMap((i, idx) => [
    `${idx + 1}. ${i.name}`,
    `   ${i.quantity} × $${formatPrice(i.price)} = $${formatPrice(i.price * i.quantity)}`,
  ])

  return [
    '👋 Hello GOADS Team,',
    '',
    "I'd like to place an order. Here are the details:",
    '',
    '🧾 Order',
    ...itemLines,
    '',
    `💳 Payment: ${payment}`,
    `💰 Total: $${formatPrice(subtotal)} USD`,
    ...(trimmedNote ? ['', `📝 Note: ${trimmedNote}`] : []),
    '',
    'Please confirm availability and the next steps for payment & delivery. Thank you!',
  ].join('\n')
}
