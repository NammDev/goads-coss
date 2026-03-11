'use client'

import { MonitorIcon } from 'lucide-react'

/** Fixed bottom banner shown on mobile screens in admin panel */
export function MobileWarning() {
  return (
    <div className="bg-yellow-50 text-yellow-800 fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 border-t border-yellow-200 p-3 text-center text-sm md:hidden dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
      <MonitorIcon className="size-4 shrink-0" />
      <span>Use a desktop for the best experience</span>
    </div>
  )
}
