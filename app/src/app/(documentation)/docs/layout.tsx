// Docs shell only — token wrapper provided by the parent (documentation) group layout.

import { DocsShell } from "@/components/docs-shell"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsShell>{children}</DocsShell>
}
