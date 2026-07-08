'use client'

import { useSyncExternalStore } from 'react'

/** Time-of-day greeting resolved on the client to match the user's local hour.
 *  Server (and first client paint) render a neutral "Welcome back" so hydration
 *  agrees; the client snapshot then upgrades to Morning/Afternoon/Evening. */
function timeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const noopSubscribe = () => () => {}

export function PortalGreeting({ name }: { name: string }) {
  const greeting = useSyncExternalStore(
    noopSubscribe,
    timeGreeting,
    () => 'Welcome back',
  )

  return (
    <span>
      {greeting}, {name}!
    </span>
  )
}
