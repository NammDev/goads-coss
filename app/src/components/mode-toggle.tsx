'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="cursor-pointer">
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <Moon className="hidden h-[1.2rem] w-[1.2rem] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
