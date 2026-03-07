"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Search, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MotionPreset } from "@/components/ui/motion-preset";
import {
  TOOL_CATEGORIES,
  TOOLS,
  getFeaturedTools,
  getToolsByCategory,
  type ToolItem,
} from "@/data/tools-registry";

/** Compact tool card used in category grids */
function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon;
  return (
    <MotionPreset
      fade
      slide={{ direction: "up" }}
      transition={{ duration: 0.4 }}
      delay={index * 0.08}
      inView
    >
      <Link href={`/tools/${tool.slug}`}>
        <Card className="group flex items-start gap-4 p-5 transition-all hover:shadow-md hover:border-primary/30">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {tool.description}
            </p>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 mt-1" />
        </Card>
      </Link>
    </MotionPreset>
  );
}

/** Large featured tool card */
function FeaturedToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon;
  return (
    <MotionPreset
      fade
      slide={{ direction: "up" }}
      transition={{ duration: 0.5 }}
      delay={index * 0.12}
      inView
    >
      <Link href={`/tools/${tool.slug}`}>
        <Card className="group relative flex flex-col gap-4 p-6 transition-all hover:shadow-lg hover:border-primary/40 h-full">
          {/* Badge */}
          <Badge variant="outline" className="w-fit text-xs">
            Popular
          </Badge>

          {/* Icon */}
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-6" />
          </div>

          {/* Text */}
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tool.description}
            </p>
          </div>

          {/* Link */}
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            Open tool
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Card>
      </Link>
    </MotionPreset>
  );
}

/** Trust badges row */
function TrustBadges() {
  const badges = [
    { icon: Zap, text: "100% Free" },
    { icon: Lock, text: "Data stays in browser" },
    { icon: Sparkles, text: "No sign-up required" },
  ];

  return (
    <MotionPreset fade transition={{ duration: 0.5 }} delay={0.2} inView>
      <div className="flex flex-wrap items-center justify-center gap-6 py-2">
        {badges.map((b) => (
          <div
            key={b.text}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <b.icon className="size-4 text-primary" />
            {b.text}
          </div>
        ))}
      </div>
    </MotionPreset>
  );
}

export function ToolsHubContent() {
  const [search, setSearch] = useState("");
  const featured = getFeaturedTools();

  // Filter tools by search query
  const query = search.toLowerCase().trim();
  const filteredCategories = TOOL_CATEGORIES.map((cat) => ({
    ...cat,
    tools: getToolsByCategory(cat.id).filter(
      (t) =>
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    ),
  })).filter((cat) => cat.tools.length > 0);

  const showFeatured = !query; // Hide featured when searching

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container space-y-12 sm:space-y-16">
        {/* Search bar */}
        <MotionPreset fade slide={{ direction: "down" }} transition={{ duration: 0.4 }}>
          <div className="mx-auto max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="pl-10 h-11"
              />
            </div>
          </div>
        </MotionPreset>

        {/* Trust badges */}
        {showFeatured && <TrustBadges />}

        {/* Featured tools */}
        {showFeatured && (
          <div className="space-y-6">
            <MotionPreset fade slide={{ direction: "down" }} transition={{ duration: 0.4 }} inView>
              <h2 className="text-xl font-semibold">Featured Tools</h2>
            </MotionPreset>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((tool, i) => (
                <FeaturedToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {filteredCategories.map((category) => (
          <div key={category.id} className="space-y-5">
            <MotionPreset fade slide={{ direction: "down" }} transition={{ duration: 0.4 }} inView>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{category.label}</h2>
                <Badge variant="outline" className="text-xs font-normal">
                  {category.tools.length}
                </Badge>
              </div>
            </MotionPreset>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        ))}

        {/* No results */}
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p className="text-lg">No tools found for &ldquo;{search}&rdquo;</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </section>
  );
}
