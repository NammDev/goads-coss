// Shared shell for all tool sub-routes (/tools/check-uid, /split-data, /2fa,
// /check-ip, /goads-extension). The (panel) route group keeps the parent
// /tools landing page OUT of this layout while still mounting the shell once
// for every sub-tool — sidebar persists across navigations between tools.

import type { ReactNode } from "react"

import { ToolShell } from "@/components/tools/shell"

export default function ToolsPanelLayout({ children }: { children: ReactNode }) {
  return <ToolShell>{children}</ToolShell>
}
