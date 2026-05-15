import { replaceCidReference } from "@/lib/mail/mail-sanitizer"
import type { ViewerMail } from "@/lib/api/temp-mail-viewer"

export const DEFAULT_MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024

const SAFE_INLINE_ATTACHMENT_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/bmp",
])

type RawAttachment = {
  content?: BlobPart | ArrayBuffer | Uint8Array | string
  content_type?: string
  mimeType?: string
  content_id?: string
  contentId?: string
  filename?: string | null
}

export type MailAttachment = {
  id: string
  filename: string
  mimeType: string
  size: string
  sizeBytes: number
  url: string
  blob: Blob | null
}

export type ParsedViewerMail = Omit<ViewerMail, "attachments"> & {
  originalSource?: string
  source?: string
  subject?: string
  message?: string
  text?: string
  attachments?: MailAttachment[]
  attachmentUrlsCreated?: boolean
}

function humanFileSize(size: number) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${parseFloat((size / Math.pow(1024, i)).toFixed(2))} ${["B", "KB", "MB", "GB", "TB"][i]}`
}

const getAttachmentSize = (content: RawAttachment["content"]) => {
  if (!content) return 0
  if (typeof content === "string") return content.length
  if (content instanceof ArrayBuffer) return content.byteLength
  if (ArrayBuffer.isView(content)) return content.byteLength
  if (content instanceof Blob) return content.size
  return 0
}

export const getMaxAttachmentBytes = () => {
  const configured = Number(process.env.NEXT_PUBLIC_MAX_ATTACHMENT_BYTES || DEFAULT_MAX_ATTACHMENT_BYTES)
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_MAX_ATTACHMENT_BYTES
}

export const isInlineRenderableAttachment = (mimeType: unknown) => SAFE_INLINE_ATTACHMENT_TYPES.has(String(mimeType || "").toLowerCase())

export const shouldCreateAttachmentObjectUrl = (
  attachment: Pick<MailAttachment, "mimeType" | "sizeBytes">,
  {
    createAttachmentUrls = false,
    removeAllAttachments = false,
    maxAttachmentBytes = getMaxAttachmentBytes(),
  } = {},
) => Boolean(
  createAttachmentUrls
  && !removeAllAttachments
  && isInlineRenderableAttachment(attachment.mimeType)
  && attachment.sizeBytes <= maxAttachmentBytes,
)

export const revokeMailObjectUrls = (mail?: Pick<ParsedViewerMail, "attachments"> | null) => {
  ;(mail?.attachments || []).forEach((attachment) => {
    if (attachment.url?.startsWith("blob:")) {
      URL.revokeObjectURL(attachment.url)
    }
  })
}

const buildAttachment = (rawAttachment: RawAttachment, options: { createAttachmentUrls?: boolean; removeAllAttachments?: boolean }) => {
  const content = rawAttachment.content
  const mimeType = rawAttachment.content_type || rawAttachment.mimeType || "application/octet-stream"
  const contentId = rawAttachment.content_id || rawAttachment.contentId || ""
  const sizeBytes = getAttachmentSize(content)
  const attachment: MailAttachment = {
    id: contentId || Math.random().toString(36).slice(2, 15),
    filename: rawAttachment.filename || contentId || "",
    mimeType,
    size: humanFileSize(sizeBytes),
    sizeBytes,
    url: "",
    blob: null,
  }

  if (!content || !shouldCreateAttachmentObjectUrl(attachment, options)) return attachment

  let blobPart: BlobPart
  if (ArrayBuffer.isView(content)) {
    const source = new Uint8Array(content.buffer, content.byteOffset, content.byteLength)
    const copy = new Uint8Array(source.byteLength)
    copy.set(source)
    blobPart = copy.buffer as ArrayBuffer
  } else {
    blobPart = content as BlobPart
  }
  const blob = new Blob([blobPart], { type: mimeType })
  attachment.url = URL.createObjectURL(blob)
  attachment.blob = blob
  return attachment
}

export async function processItem(item: ParsedViewerMail, options: { createAttachmentUrls?: boolean; removeAllAttachments?: boolean } = {}) {
  const next = { ...item }
  next.originalSource = next.source

  try {
    const parser = await import("mail-parser-wasm")
    const parsedEmail = parser.parse_message(next.raw || "")
    next.source = parsedEmail.sender || next.source
    next.subject = parsedEmail.subject || ""
    next.message = parsedEmail.body_html || parsedEmail.text || ""
    next.text = parsedEmail.text || ""
    next.attachments = parsedEmail.attachments?.map((attachment: RawAttachment) => {
      const built = buildAttachment(attachment, options)
      if (attachment.content_id && attachment.content_id.length > 0 && built.url) {
        next.message = replaceCidReference(next.message || "", attachment.content_id, built.url)
      }
      return built
    }) || []
    next.attachmentUrlsCreated = Boolean(options.createAttachmentUrls)
  } catch (error) {
    console.error("Error parsing email with mail-parser-wasm", error)
  }

  if (next.subject && next.subject.length > 0 && next.message && next.message.length > 0) {
    return next
  }

  try {
    const { default: PostalMime } = await import("postal-mime")
    const parsedEmail = await PostalMime.parse(next.raw || "")
    next.source = parsedEmail.from?.address || next.source
    if (parsedEmail.from?.address && parsedEmail.from?.name) {
      next.source = `${parsedEmail.from.name} <${parsedEmail.from.address}>`
    }
    next.subject = parsedEmail.subject || "No Subject"
    next.message = parsedEmail.html || parsedEmail.text || next.raw || ""
    next.text = parsedEmail.text || ""
    next.attachments = parsedEmail.attachments?.map((attachment) => {
      const rawAttachment = attachment as RawAttachment
      const built = buildAttachment(rawAttachment, options)
      if (rawAttachment.contentId && rawAttachment.contentId.length > 0 && built.url) {
        next.message = replaceCidReference(next.message || "", rawAttachment.contentId, built.url)
      }
      return built
    }) || []
    next.attachmentUrlsCreated = Boolean(options.createAttachmentUrls)
  } catch (error) {
    console.error("Error parsing email with PostalMime", error)
    next.subject = "No Subject"
    next.message = next.raw || ""
  }

  return next
}

export function getDownloadEmlUrl(raw: string) {
  return URL.createObjectURL(new Blob([raw], { type: "text/plain" }))
}
