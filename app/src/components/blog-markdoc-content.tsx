import type { RenderableTreeNode } from "@markdoc/markdoc"
import { MarkdocRenderer } from "@/lib/markdoc-renderer"

/** Server component wrapper — renders Markdoc tree without crossing the client boundary */
export function BlogMarkdocContent({ content }: { content: RenderableTreeNode }) {
  return <MarkdocRenderer content={content} />
}
