// Cart helpers extracted from cart-popover.tsx. Pure — no JSX, no hooks.

import type { useCart } from '@/lib/cart-context'
import { CONTACT } from '@/data/contact-info'

export const TELEGRAM_URL = CONTACT.telegram.support

export function buildTelegramMessage(
  items: ReturnType<typeof useCart>['items'],
  subtotal: number,
  payment: string,
) {
  const lines = items.map(
    (i) => `- ${i.name} x${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`,
  )
  return [
    '🛒 *New Order from GoAds*',
    '',
    ...lines,
    '',
    `💰 Total: $${subtotal.toFixed(2)}`,
    `💳 Payment: ${payment}`,
  ].join('\n')
}
