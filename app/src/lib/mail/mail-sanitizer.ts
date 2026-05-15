import DOMPurify from "dompurify"

// Media proxy endpoint in goads-coss (proxied to Cloudflare Worker)
const MEDIA_PROXY_PATH = "/api/tempmail/api/viewer/media"

type MailTrustedTypesPolicy = {
  createHTML: (html: string) => unknown
}

type MailTrustedTypesFactory = {
  createPolicy: (
    name: string,
    rules: {
      createHTML: (html: string) => string
    },
  ) => MailTrustedTypesPolicy
}

type WindowWithTrustedTypes = Window & {
  trustedTypes?: MailTrustedTypesFactory
}

export const MAIL_ALLOWED_TAGS = [
  "a",
  "b",
  "body",
  "blockquote",
  "br",
  "center",
  "code",
  "div",
  "em",
  "font",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "hr",
  "i",
  "html",
  "img",
  "li",
  "ol",
  "p",
  "picture",
  "pre",
  "s",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
  "video",
]

export const MAIL_ALLOWED_ATTR = [
  "align",
  "aria-hidden",
  "aria-label",
  "alt",
  "background",
  "bgcolor",
  "border",
  "cellpadding",
  "cellspacing",
  "class",
  "controls",
  "controlslist",
  "colspan",
  "crossorigin",
  "data-lazy-src",
  "data-original",
  "data-src",
  "data-url",
  "decoding",
  "dir",
  "fetchpriority",
  "height",
  "href",
  "id",
  "lang",
  "leftmargin",
  "loop",
  "marginheight",
  "marginwidth",
  "media",
  "muted",
  "name",
  "nowrap",
  "playsinline",
  "poster",
  "preload",
  "rel",
  "role",
  "rowspan",
  "scope",
  "sizes",
  "src",
  "srcset",
  "style",
  "target",
  "title",
  "topmargin",
  "type",
  "valign",
  "width",
]

const MAIL_URI_ATTRS = new Set([
  "background",
  "data-lazy-src",
  "data-original",
  "data-src",
  "data-url",
  "href",
  "poster",
  "src",
  "srcset",
])

export const MAIL_SANITIZE_CONFIG = {
  ALLOWED_TAGS: MAIL_ALLOWED_TAGS,
  ALLOWED_ATTR: MAIL_ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false,
  WHOLE_DOCUMENT: true,
  ADD_URI_SAFE_ATTR: MAIL_ALLOWED_ATTR.filter((attr) => !MAIL_URI_ATTRS.has(attr)),
  FORBID_TAGS: [
    "base",
    "button",
    "embed",
    "form",
    "iframe",
    "input",
    "link",
    "math",
    "meta",
    "object",
    "option",
    "script",
    "select",
    "svg",
    "textarea",
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|blob):\/\/|data:image\/(?:png|gif|jpe?g|webp|bmp|svg\+xml);base64,)/i,
}

const UNSAFE_CSS_PATTERN = /(?:@import|behavior\s*:|-moz-binding|expression\s*\(|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html)/i
const REMOTE_MEDIA_PATTERN = /^https?:/i

const normalizeProtocolRelativeUrl = (value: unknown) => {
  const url = String(value || "").trim()
  return url.startsWith("//") ? `https:${url}` : url
}

const firstSrcsetUrl = (value: unknown) => {
  const [candidate = ""] = String(value || "").split(",")
  return normalizeProtocolRelativeUrl(candidate.trim().split(/\s+/)[0])
}

const safeMediaUrl = (value: unknown) => /^(?:https?:|blob:|data:image\/(?:png|gif|jpe?g|webp|bmp|svg\+xml);base64,)/i.test(String(value || ""))

export const buildMediaProxyUrl = (value: unknown) => {
  const url = normalizeProtocolRelativeUrl(value)
  if (!REMOTE_MEDIA_PATTERN.test(url)) return url
  const base = typeof window !== "undefined" ? window.location.origin : ""
  return `${base}${MEDIA_PROXY_PATH}?${new URLSearchParams({ url }).toString()}`
}

const normalizeMediaSrcset = (value: unknown) => String(value || "")
  .split(",")
  .map((candidate) => {
    const parts = candidate.trim().split(/\s+/).filter(Boolean)
    if (!parts.length) return ""
    return [buildMediaProxyUrl(parts[0]), ...parts.slice(1)].join(" ")
  })
  .filter(Boolean)
  .join(", ")

const setProxiedMediaAttr = (node: Element, attr: string) => {
  if (node.hasAttribute(attr)) {
    node.setAttribute(attr, buildMediaProxyUrl(node.getAttribute(attr)))
  }
}

const stripUnsafeCss = (html: string) => {
  if (typeof document === "undefined") return html
  const doc = document.implementation.createHTMLDocument("")
  doc.documentElement.innerHTML = html
  doc.querySelectorAll("[style]").forEach((node) => {
    if (UNSAFE_CSS_PATTERN.test(node.getAttribute("style") || "")) {
      node.removeAttribute("style")
    }
  })
  doc.querySelectorAll("style").forEach((node) => {
    if (UNSAFE_CSS_PATTERN.test(node.textContent || "")) {
      node.remove()
    }
  })
  const headHtml = Array.from(doc.head.querySelectorAll("style")).map((node) => node.outerHTML).join("")
  if (!doc.body.hasAttributes()) return `${headHtml}${doc.body.innerHTML}`
  const wrapper = doc.createElement("div")
  Array.from(doc.body.attributes).forEach((attr) => {
    wrapper.setAttribute(attr.name, attr.value)
  })
  wrapper.innerHTML = doc.body.innerHTML
  return `${headHtml}${wrapper.outerHTML}`
}

const normalizeMediaElements = (root: ParentNode) => {
  root.querySelectorAll("[src], [href], [poster], [background], [data-src], [data-lazy-src], [data-original], [data-url]").forEach((node) => {
    ;["src", "href", "poster", "background", "data-src", "data-lazy-src", "data-original", "data-url"].forEach((attr) => {
      if (node.hasAttribute(attr)) {
        node.setAttribute(attr, normalizeProtocolRelativeUrl(node.getAttribute(attr)))
      }
    })
  })
  root.querySelectorAll("[srcset]").forEach((node) => {
    node.setAttribute("srcset", normalizeMediaSrcset(node.getAttribute("srcset")))
  })
  root.querySelectorAll("img").forEach((img) => {
    img.setAttribute("referrerpolicy", "no-referrer")
    setProxiedMediaAttr(img, "src")
    setProxiedMediaAttr(img, "background")
    if (img.getAttribute("src")) return
    const fallback = [
      firstSrcsetUrl(img.getAttribute("srcset")),
      img.getAttribute("data-src"),
      img.getAttribute("data-lazy-src"),
      img.getAttribute("data-original"),
      img.getAttribute("data-url"),
    ].find(safeMediaUrl)
    if (fallback) img.setAttribute("src", buildMediaProxyUrl(fallback))
  })
  root.querySelectorAll("picture source").forEach((source) => {
    setProxiedMediaAttr(source, "src")
  })
  root.querySelectorAll("video").forEach((video) => {
    if (!video.hasAttribute("controls")) video.setAttribute("controls", "")
    if (!video.getAttribute("preload")) video.setAttribute("preload", "metadata")
    setProxiedMediaAttr(video, "poster")
    setProxiedMediaAttr(video, "src")
    if (video.getAttribute("src") || video.querySelector("source[src]")) return
    const fallback = [
      video.getAttribute("data-src"),
      video.getAttribute("data-lazy-src"),
      video.getAttribute("data-original"),
      video.getAttribute("data-url"),
    ].find(safeMediaUrl)
    if (fallback) video.setAttribute("src", buildMediaProxyUrl(fallback))
  })
  root.querySelectorAll("video source").forEach((source) => {
    setProxiedMediaAttr(source, "src")
  })
}

export const sanitizeMailHtml = (html: unknown) => stripUnsafeCss(DOMPurify.sanitize(String(html || ""), MAIL_SANITIZE_CONFIG))

let trustedTypesPolicy: MailTrustedTypesPolicy | null | undefined

export const getMailTrustedTypesPolicy = () => {
  if (trustedTypesPolicy !== undefined) return trustedTypesPolicy
  const trustedTypes = typeof window === "undefined" ? null : (window as WindowWithTrustedTypes).trustedTypes
  if (!trustedTypes) {
    trustedTypesPolicy = null
    return trustedTypesPolicy
  }
  try {
    trustedTypesPolicy = trustedTypes.createPolicy("dompurify", {
      createHTML: (html: string) => sanitizeMailHtml(html),
    })
  } catch {
    trustedTypesPolicy = null
  }
  return trustedTypesPolicy
}

export const createTrustedMailHtml = (html: unknown) => {
  const policy = getMailTrustedTypesPolicy()
  return policy ? policy.createHTML(String(html || "")) : sanitizeMailHtml(html)
}

export const hardenMailLinks = (html: unknown) => {
  const template = document.createElement("template")
  template.innerHTML = createTrustedMailHtml(html) as string
  template.content.querySelectorAll("a").forEach((link) => {
    link.setAttribute("target", "_blank")
    link.setAttribute("rel", "noopener noreferrer")
  })
  normalizeMediaElements(template.content)
  return template.innerHTML
}

export const isSafeCidReplacementUrl = (value: unknown) => String(value || "").startsWith("blob:")

export const replaceCidReference = (html: string, contentId: string, replacementUrl: string) => {
  if (!contentId || !isSafeCidReplacementUrl(replacementUrl)) return html
  return String(html || "").split(`cid:${contentId}`).join(replacementUrl)
}
