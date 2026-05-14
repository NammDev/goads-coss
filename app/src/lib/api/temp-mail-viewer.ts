import { tempMailFetch } from "@/lib/api/temp-mail-client"

export type ViewerSettings = {
  title?: string
  domains?: string[]
  defaultDomains?: string[]
  minAddressLen?: number
  maxAddressLen?: number
  enableUserCreateEmail?: boolean
  enableUserDeleteEmail?: boolean
}

export type ViewerSession = {
  email: string
  token: string
  address_id: number
}

export type ViewerMail = {
  id: number | string
  address?: string
  source?: string
  subject?: string
  message?: string
  html?: string
  text?: string
  raw?: string
  metadata?: unknown
  created_at?: string
  from?: string
  message_id?: string
  attachments?: unknown[]
  attachmentUrls?: string[]
  attachmentUrlsCreated?: boolean
  detailLoaded?: boolean
}

export type ViewerMailListResponse = {
  results?: ViewerMail[]
  count?: number
}

export const getViewerSettings = () => tempMailFetch<ViewerSettings>("/open_api/settings")

export const createViewerSession = (email: string) =>
  tempMailFetch<ViewerSession>("/api/viewer/session", {
    method: "POST",
    body: { email },
  })

export const randomAddress = () =>
  tempMailFetch<ViewerSession>("/api/viewer/random", {
    method: "POST",
  })

export const getViewerMails = ({
  limit = 50,
  offset = 0,
  sinceId = null,
}: {
  limit?: number
  offset?: number
  sinceId?: number | string | null
} = {}) => {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  })
  if (sinceId) params.set("since_id", String(sinceId))
  return tempMailFetch<ViewerMailListResponse>(`/api/viewer/mails?${params.toString()}`)
}

export const getViewerMail = (id: number | string) =>
  tempMailFetch<ViewerMail | null>(`/api/viewer/mails/${id}`)

export const deleteViewerMail = (id: number | string) =>
  tempMailFetch<{ success?: boolean }>(`/api/viewer/mails/${id}`, {
    method: "DELETE",
  })

export const clearViewerInbox = () =>
  tempMailFetch<{ success?: boolean }>("/api/viewer/mails", {
    method: "DELETE",
  })
