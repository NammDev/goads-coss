export const normalizeViewerDomain = (value: unknown) => String(value || "").trim().toLowerCase().replace(/^@/, "")

export const normalizeViewerMailboxName = (value: unknown, maxLength = 30) => {
  const localPart = String(value || "").split("@")[0]
  return localPart
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._+-]/g, "")
    .slice(0, Math.max(Number(maxLength) || 30, 1))
}

export const splitViewerEmailAddress = (value: unknown) => {
  const normalized = String(value || "").trim().toLowerCase()
  const parts = normalized.split("@")
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null
  return {
    name: parts[0],
    domain: normalizeViewerDomain(parts[1]),
  }
}

export const buildViewerEmail = (name: string, domain: string, maxLength = 30) => {
  const normalizedName = normalizeViewerMailboxName(name, maxLength)
  const normalizedDomain = normalizeViewerDomain(domain)
  return normalizedName && normalizedDomain ? `${normalizedName}@${normalizedDomain}` : ""
}

export const validateViewerEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim())

type MailLike = {
  id: number | string
  created_at?: string
}

export const mergeViewerMails = <T extends MailLike>(
  existingMails: T[],
  incomingMails: T[],
  selectedMailId: number | string | null = null,
) => {
  const byId = new Map((existingMails || []).map((item) => [item.id, item]))
  const previousIds = new Set(byId.keys())
  const freshIds: Array<number | string> = []

  ;(incomingMails || []).forEach((item) => {
    byId.set(item.id, item)
    if (!previousIds.has(item.id)) freshIds.push(item.id)
  })

  const mails = Array.from(byId.values()).sort((a, b) => {
    const aTime = new Date(a.created_at || 0).getTime()
    const bTime = new Date(b.created_at || 0).getTime()
    return bTime - aTime
  })

  const nextSelectedMailId = selectedMailId && mails.some((item) => item.id === selectedMailId)
    ? selectedMailId
    : mails[0]?.id || null

  return {
    mails,
    freshIds,
    selectedMailId: nextSelectedMailId,
  }
}

export const shouldPollInbox = ({
  hasSession,
  documentHidden,
}: {
  hasSession: boolean
  documentHidden: boolean
}) => Boolean(hasSession && !documentHidden)

export const resolveNextPollInterval = ({
  emptyPolls = 0,
  baseMs = 12000,
  maxMs = 60000,
  backoffAfter = 5,
} = {}) => (Number(emptyPolls) >= backoffAfter ? maxMs : baseMs)
