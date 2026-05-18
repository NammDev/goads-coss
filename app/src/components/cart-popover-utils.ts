// Cart helpers extracted from cart-popover.tsx. Pure — no JSX, no hooks.

import type { useCart } from '@/lib/cart-context'
import { CONTACT } from '@/data/contact-info'

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
    `   ${i.quantity} × $${i.price.toFixed(2)} = $${(i.price * i.quantity).toFixed(2)}`,
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
    `💰 Total: $${subtotal.toFixed(2)} USD`,
    ...(trimmedNote ? ['', `📝 Note: ${trimmedNote}`] : []),
    '',
    'Please confirm availability and the next steps for payment & delivery. Thank you!',
  ].join('\n')
}
