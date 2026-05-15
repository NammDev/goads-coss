// Help shell only — token wrapper provided by the parent (documentation) group layout.

import { HelpShell } from "@/components/help/help-shell"

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <HelpShell>{children}</HelpShell>
}
