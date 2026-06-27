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

/* Self-closing tag rendering the colored brand-icon support channel list.
   Data lives in the DocsSupportChannels component (brand constants). */
export const supportChannels: Schema = {
  render: "SupportChannels",
  selfClosing: true,
  attributes: {},
}

export const markdocTags = { callout, channels: supportChannels }
