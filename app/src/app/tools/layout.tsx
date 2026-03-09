import type { ReactNode } from "react";

import Footer from "@/components/shadcn-studio/blocks/footer-component-02/footer-component-02"
import { SiteHeader } from "@/components/site-header"
import { ToolsSidebar } from "@/components/tools-sidebar";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-x-clip [--header-height:4rem]">
      {/* Vertical grid frame lines */}
      <div
        aria-hidden="true"
        className="before:-left-3 after:-right-3 container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:w-px after:bg-border/64"
      />
      {/* Corner dots */}
      <div
        aria-hidden="true"
        className="before:-left-[11.5px] before:-ml-1 after:-right-[11.5px] after:-mr-1 container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
      />
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}

/**
 * Wrapper for individual tool pages that includes the sidebar.
 * Used by each /tools/[slug]/page.tsx — NOT by the hub /tools/page.tsx.
 */
export function ToolPageShell({ children }: { children: ReactNode }) {
  return (
    <section className="py-6 sm:py-10 lg:py-14">
      <div className="container flex gap-8">
        <ToolsSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
