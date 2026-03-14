'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon, PuzzleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Logo from '@/assets/svg/logo'
import { TOOL_CATEGORIES, getToolsByCategory, getFeaturedTools, type ToolItem } from '@/data/tools-registry'
import { Card3D, useCard3DEffects } from '@/components/card-3d'

function PortalToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon
  return (
    <Card3D index={index} inView>
      <Link href={`/portal/tools/${tool.slug}`} className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon className="text-primary size-4" />
            <h3 className="text-sm font-semibold leading-tight">{tool.title}</h3>
          </div>
          <span className="text-primary shrink-0 text-lg font-bold">Free</span>
        </div>
        <p className="text-muted-foreground mt-2 text-xs">{tool.description}</p>
        <div className="min-h-6" />
        <div className="flex items-end justify-between">
          <Logo className="size-6" />
          <Button size="sm" variant="outline" className="cursor-pointer gap-1.5">
            Open Tool
            <ArrowUpRightIcon className="group-hover/card:rotate-45 size-3.5 transition-transform duration-200" />
          </Button>
        </div>
      </Link>
    </Card3D>
  )
}

export default function PortalToolsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  useCard3DEffects(containerRef)

  const featured = getFeaturedTools()

  return (
    <div className="space-y-10" ref={containerRef}>
      <div>
        <h1 className="text-2xl font-semibold">Tools</h1>
        <p className="text-muted-foreground mt-1 text-sm">Free tools for ads account management</p>
      </div>

      {/* Popular */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Popular Tools</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool, i) => (
            <PortalToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </div>

      {/* By category */}
      {TOOL_CATEGORIES.map((cat) => {
        const tools = getToolsByCategory(cat.id)
        return (
          <div key={cat.id} className="space-y-4">
            <h2 className="text-lg font-semibold">{cat.label}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool, i) => (
                <PortalToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Extensions link */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Extensions</h2>
        <Link
          href="/portal/tools/extensions"
          className="bg-card hover:bg-accent flex items-center gap-3 rounded-lg border p-4 transition-colors"
        >
          <PuzzleIcon className="text-primary size-5" />
          <div>
            <p className="text-sm font-medium">BM Invite Extension</p>
            <p className="text-muted-foreground text-xs">Chrome extension for automatic BM invitation acceptance</p>
          </div>
          <ArrowUpRightIcon className="text-muted-foreground ml-auto size-4" />
        </Link>
      </div>
    </div>
  )
}
