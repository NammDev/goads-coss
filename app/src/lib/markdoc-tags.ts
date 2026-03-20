import type { Schema } from "@markdoc/markdoc"

export const callout: Schema = {
  render: "Callout",
  attributes: {
    variant: {
      type: String,
      default: "info",
      matches: ["info", "warning", "tip"],
    },
    title: { type: String },
  },
}

export const markdocTags = { callout }
