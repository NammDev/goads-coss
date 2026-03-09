"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MotionPreset } from "@/components/ui/motion-preset";
import Logo from "@/assets/svg/logo";
import { TOOLS, getFeaturedTools, type ToolItem } from "@/data/tools-registry";
import { Card3D, useCard3DEffects } from "@/components/card-3d";

/* ---------- tool card ---------- */

function ToolCardBM({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon;
  return (
    <Card3D index={index} inView>
      <Link href={`/tools/${tool.slug}`} className="flex h-full flex-col justify-between">
        {/* top: icon + name left, price right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold leading-tight">
              {tool.title}
            </h3>
          </div>
          <span className="shrink-0 text-lg font-bold text-primary">
            Free
          </span>
        </div>

        {/* description */}
        <p className="text-muted-foreground mt-2 text-xs">
          {tool.description}
        </p>

        {/* spacer */}
        <div className="min-h-6" />

        {/* bottom: GoAds logo left, button right */}
        <div className="flex items-end justify-between">
          <Logo className="size-6" />
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer gap-1.5"
          >
            Open Tool
            <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:rotate-45" />
          </Button>
        </div>
      </Link>
    </Card3D>
  );
}

/* ---------- main export ---------- */

export function ToolsHubContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  useCard3DEffects(containerRef);

  const popularTools = getFeaturedTools();
  const allTools = TOOLS;

  return (
    <section id="tools" className="py-8 sm:py-16 lg:py-24" ref={containerRef}>
      <div className="container space-y-12 sm:space-y-16">
        {/* Popular Tools */}
        <div className="space-y-6">
          <MotionPreset
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.4 }}
            inView
          >
            <h2 className="text-xl font-semibold">Popular Tools</h2>
          </MotionPreset>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool, i) => (
              <ToolCardBM key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div className="space-y-6">
          <MotionPreset
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.4 }}
            inView
          >
            <h2 className="text-xl font-semibold">All Tools</h2>
          </MotionPreset>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map((tool, i) => (
              <ToolCardBM key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
