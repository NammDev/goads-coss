import React from "react"
import Markdoc, {
  Tag,
  type Node,
  type RenderableTreeNode,
} from "@markdoc/markdoc"
import { DocsCallout } from "@/components/docs-callout"
import { markdocTags } from "@/lib/markdoc-tags"

export type TocHeading = { id: string; title: string; depth: number }

/** Slug rule shared between AST walk (extractHeadingsFromNode) and
 * heading-node transform — guarantees TOC `<a href="#x">` and the
 * rendered `<h2 id="x">` always match. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

/** Extract concatenated text content from a Markdoc heading node's children. */
function getHeadingText(node: Node): string {
  let text = ""
  for (const child of node.children ?? []) {
    if (child.type === "inline") {
      for (const grandchild of child.children ?? []) {
        text += String(grandchild.attributes?.content ?? "")
      }
    } else {
      text += String(child.attributes?.content ?? "")
    }
  }
  return text
}

/** Custom heading node config — injects `id` (slug), class, and title at
 * AST→renderable transform time, so the rendered `<h2 id="...">` is reliable.
 *
 * Why we override the default node instead of using a React component:
 * Markdoc's React renderer (dist/react.js tagName fn) routes any lowercase
 * tag name (h1, h2, ...) DIRECTLY to native HTML — it skips the `components`
 * map entirely for non-PascalCase names. So `markdocComponents.h2 = H(2)` is
 * never called. Setting attributes at AST transform is the only path that
 * actually puts `id` on the rendered element. */
type MarkdocConfig = NonNullable<Parameters<typeof Markdoc.transform>[1]>
const headingNode = {
  children: ["inline"],
  attributes: {
    level: { type: Number, render: false, required: true },
  },
  transform(node: Node, config: MarkdocConfig) {
    const level = node.attributes.level as number
    const id = slugify(getHeadingText(node))
    return new Tag(
      `h${level}`,
      {
        id,
        class: "heading-with-copy",
        title: "Click to copy link",
        ...node.transformAttributes(config),
      },
      node.transformChildren(config),
    )
  },
}

/** Transform a Markdoc AST Node → renderable tree (used with Keystatic's { node } return) */
export function transformMarkdoc(node: Node): RenderableTreeNode {
  return Markdoc.transform(node, {
    tags: markdocTags,
    nodes: { heading: headingNode },
  })
}

/** Parse a raw Markdoc string → renderable tree (used for ad-hoc strings) */
export function parseMarkdoc(source: string): RenderableTreeNode {
  const ast = Markdoc.parse(source)
  return Markdoc.transform(ast, {
    tags: markdocTags,
    nodes: { heading: headingNode },
  })
}

/** Extract h2/h3 headings from a Markdoc AST Node for TOC.
 * IDs are generated with the same `slugify` used by `headingNode.transform` —
 * so TOC anchors and rendered `<h2 id="...">` always match. */
export function extractHeadingsFromNode(node: Node): TocHeading[] {
  const headings: TocHeading[] = []

  function walk(n: Node) {
    if (n.type === "heading") {
      const depth = (n.attributes?.level as number) ?? 2
      if (depth <= 3) {
        const title = getHeadingText(n)
        headings.push({ id: slugify(title), title, depth })
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

/** Render a Markdoc RenderableTreeNode to React.
 *
 * Markdoc's default `document` node wraps everything in an <article> element
 * (see @markdoc/markdoc dist/index.js line 7879: `document = { render: "article" }`).
 * That wrapper breaks `.installation-content > *` selectors — paragraphs end up
 * as grandchildren of the wrapper div, not direct children, so Foreplay's 32px
 * block spacing (and other `> *` rules) never apply.
 *
 * We unwrap the <article> here so the rendered DOM matches Foreplay's verbatim:
 *   <div class="installation-content">
 *     <h2>...</h2>
 *     <p>...</p>     ← direct child, `> *` margin: 32px auto applies
 *   </div>
 */
export function MarkdocRenderer({ content }: { content: RenderableTreeNode }) {
  const tree = Markdoc.renderers.react(content, React, { components: markdocComponents })
  if (
    React.isValidElement(tree) &&
    tree.type === "article"
  ) {
    const { children } = tree.props as { children?: React.ReactNode }
    return <>{children}</>
  }
  return <>{tree}</>
}
