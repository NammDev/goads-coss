import type { ReactNode } from "react";

import { ToolsSidebar } from "@/components/tools-sidebar";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
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
