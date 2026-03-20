import React from "react"
import Markdoc, {
  type Node,
  type RenderableTreeNode,
} from "@markdoc/markdoc"
import { DocsCallout } from "@/components/docs-callout"
import { markdocTags } from "@/lib/markdoc-tags"

export type TocHeading = { id: string; title: string; depth: number }

/** Transform a Markdoc AST Node → renderable tree (used with Keystatic's { node } return) */
export function transformMarkdoc(node: Node): RenderableTreeNode {
  return Markdoc.transform(node, { tags: markdocTags })
}

/** Parse a raw Markdoc string → renderable tree (used for ad-hoc strings) */
export function parseMarkdoc(source: string): RenderableTreeNode {
  const ast = Markdoc.parse(source)
  return Markdoc.transform(ast, { tags: markdocTags })
}

/** Extract h2/h3 headings from a Markdoc AST Node for TOC */
export function extractHeadingsFromNode(node: Node): TocHeading[] {
  const headings: TocHeading[] = []

  function walk(n: Node) {
    if (n.type === "heading") {
      const depth = (n.attributes?.level as number) ?? 2
      if (depth <= 3) {
        const title = n.children
          .map((c: Node) => {
            if (c.type === "inline") {
              return c.children
                .map((cc: Node) => String(cc.attributes?.content ?? ""))
                .join("")
            }
            return String(c.attributes?.content ?? "")
          })
          .join("")
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
        headings.push({ id, title, depth })
      }
    }
    for (const child of n.children ?? []) {
      walk(child)
    }
  }

  walk(node)
  return headings
}

export const markdocComponents = {
  Callout: ({
    variant,
    title,
    children,
  }: {
    variant?: "info" | "warning" | "tip"
    title?: string
    children: React.ReactNode
  }) => (
    <DocsCallout variant={variant ?? "info"} title={title}>
      {children}
    </DocsCallout>
  ),
}

/** Render a Markdoc RenderableTreeNode to React */
export function MarkdocRenderer({ content }: { content: RenderableTreeNode }) {
  return <>{Markdoc.renderers.react(content, React, { components: markdocComponents })}</>
}
