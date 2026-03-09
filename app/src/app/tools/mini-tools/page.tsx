"use client";

import Link from "next/link";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TOOLS, TOOL_CATEGORIES } from "@/data/tools-registry";

export default function MiniToolsPage() {
  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">All Tools</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse all {TOOLS.length} free tools — no sign-up, 100% client-side
          </p>
        </div>

        {TOOL_CATEGORIES.map((cat) => {
          const catTools = TOOLS.filter((t) => t.category === cat.id);
          if (!catTools.length) return null;
          return (
            <div key={cat.id} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {catTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                      <Card className="group h-full transition-colors hover:border-primary/40 hover:bg-muted/40">
                        <CardContent className="flex items-center gap-3 pt-4 pb-4">
                          <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="text-primary size-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold truncate">
                                {tool.title}
                              </p>
                              {tool.featured && (
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {tool.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ToolPageShell>
  );
}
