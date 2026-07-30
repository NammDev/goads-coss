// /tools/bookmark — GOADS Bookmark, the bookmarklet script library.
// Composition uses the tool design language atoms — see docs/foreplay/tool-design-language.md

import type { Metadata } from "next"
import { Bookmark } from "lucide-react"

import { ToolBody } from "@/components/tools/body"
import { ToolHeader } from "@/components/tools/header"
import { BookmarkTool } from "@/components/tools/bookmark"

export const metadata: Metadata = {
  title: "GOADS Bookmark | GOADS Tools",
  description:
    "Free bookmarklet scripts for Facebook Business Manager. Drag to your bookmark bar and run BM invites or admin removal in one click.",
}

export default function BookmarkPage() {
  return (
    <>
      <ToolHeader icon={<Bookmark className="size-7" />} title="GOADS Bookmark" />
      <ToolBody>
        <BookmarkTool />
      </ToolBody>
    </>
  )
}
