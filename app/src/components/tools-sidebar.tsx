"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, PanelLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  TOOL_CATEGORIES,
  getToolsByCategory,
  type ToolItem,
} from "@/data/tools-registry";

/** Single tool link in the sidebar */
function ToolLink({ tool, isActive }: { tool: ToolItem; isActive: boolean }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-accent text-accent-foreground font-medium border-l-2 border-primary -ml-px"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      {tool.title}
    </Link>
  );
}

/** Sidebar navigation content (shared between desktop & mobile) */
function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {TOOL_CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id);
        return (
          <Collapsible key={category.id} defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
              {category.label}
              <ChevronDown className="size-3.5 transition-transform [[data-state=closed]_&]:rotate-[-90deg]" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 pl-1">
              {tools.map((tool) => (
                <ToolLink
                  key={tool.slug}
                  tool={tool}
                  isActive={pathname === `/tools/${tool.slug}`}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );
}

/** Desktop sidebar — sticky, scrollable */
export function ToolsSidebar() {
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-[calc(var(--header-height)+1rem)] max-h-[calc(100svh-var(--header-height)-2rem)] overflow-y-auto pr-4 border-r border-border/60">
        <SidebarNav />
      </div>
    </aside>
  );
}

/** Mobile sidebar trigger + sheet drawer */
export function ToolsSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden gap-1.5"
        >
          <PanelLeft className="size-4" />
          Tools
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4 pt-8">
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
