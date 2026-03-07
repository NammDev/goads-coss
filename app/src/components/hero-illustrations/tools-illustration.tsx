'use client'

import {
  Shield, Cookie, ListFilter, Scissors, Copy, Merge,
  StickyNote, Globe, ImagePlus,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'

const tools = [
  { icon: Shield, name: '2FA Generator', desc: 'TOTP codes' },
  { icon: Cookie, name: 'Cookie Converter', desc: 'JSON to UID' },
  { icon: ListFilter, name: 'Account Filter', desc: 'Parse & reformat' },
  { icon: Scissors, name: 'Split Data', desc: 'By delimiter' },
  { icon: Copy, name: 'Remove Duplicates', desc: 'Deduplicate lines' },
  { icon: Merge, name: 'Filter & Merge', desc: 'Combine by key' },
  { icon: StickyNote, name: 'Online Notepad', desc: 'Browser-saved notes' },
  { icon: Globe, name: 'IP Checker', desc: 'Location info' },
  { icon: ImagePlus, name: 'Batch Watermark', desc: 'Multiple images' },
]

/* Staggered row layout: row1=5 cards, row2=4 cards offset */
const row1 = tools.slice(0, 5)
const row2 = tools.slice(5, 9)

export function ToolsIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
      {/* Faded code bg */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
        <pre className="font-mono text-[10px] leading-relaxed whitespace-pre">
{`const parse = (data) => {           const generate2FA = (secret) => {
  return data.split('\\n')             const totp = new TOTP(secret)
    .filter(Boolean)                    return totp.generate()
    .map(line => {                    }
      const [uid, pass] = line
        .split('|')                   const convertCookie = (json) => {
      return { uid, pass }              return Object.entries(json)
    })                                    .map(([k, v]) => k + '=' + v)
}                                         .join('; ')  }`}
        </pre>
      </div>

      {/* Gradient fade edges */}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />

      <div className="flex flex-col items-center justify-center gap-4 py-6">
        {/* Row 1 — 5 cards */}
        <div className="flex gap-3">
          {row1.map((tool, i) => {
            const Icon = tool.icon
            const rotations = ['-rotate-1', 'rotate-0.5', '-rotate-0.5', 'rotate-1', '-rotate-0.5']
            return (
              <div key={tool.name} className={`${rotations[i]} transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}>
                <Card className="relative overflow-hidden p-3 w-40">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="text-primary size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{tool.name}</p>
                      <p className="text-muted-foreground text-[10px]">{tool.desc}</p>
                    </div>
                  </div>
                  <BorderBeam size={35} duration={14} colorFrom="var(--primary)" colorTo="var(--primary)" />
                </Card>
              </div>
            )
          })}
        </div>

        {/* Row 2 — 4 cards, offset to center */}
        <div className="flex gap-3">
          {row2.map((tool, i) => {
            const Icon = tool.icon
            const rotations = ['rotate-0.5', '-rotate-1', 'rotate-1', '-rotate-0.5']
            return (
              <div key={tool.name} className={`${rotations[i]} transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}>
                <Card className="relative overflow-hidden p-3 w-40">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="text-primary size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{tool.name}</p>
                      <p className="text-muted-foreground text-[10px]">{tool.desc}</p>
                    </div>
                  </div>
                  <BorderBeam size={35} duration={14} colorFrom="var(--primary)" colorTo="var(--primary)" />
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute right-8 top-2 z-20">
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-md">100% Free</Badge>
      </div>
      <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2">
        <Badge variant="outline" className="gap-1 bg-background/80 text-xs backdrop-blur-sm">
          9 tools — no sign-up — 100% client-side
        </Badge>
      </div>
    </div>
  )
}
