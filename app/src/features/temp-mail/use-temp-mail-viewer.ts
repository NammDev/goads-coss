"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  clearViewerInbox,
  createViewerSession,
  deleteViewerMail,
  getViewerMail,
  getViewerMails,
  getViewerSettings,
  randomAddress as createRandomAddress,
  type ViewerMail,
} from "@/lib/api/temp-mail-viewer"
import {
  currentEmailStorage,
  viewerTokenStorage,
} from "@/lib/storage/browser-storage"
import { processItem, revokeMailObjectUrls, type ParsedViewerMail } from "@/lib/mail/email-parser"
import {
  buildViewerEmail,
  mergeViewerMails,
  normalizeViewerDomain,
  normalizeViewerMailboxName,
  resolveNextPollInterval,
  shouldPollInbox,
  splitViewerEmailAddress,
  validateViewerEmail,
} from "@/lib/mail/mail-viewer"

const POLL_INTERVAL_MS = 12000
const POLL_MAX_INTERVAL_MS = 60000
const POLL_BACKOFF_AFTER_EMPTY = 5
const DEFAULT_MAX_ADDRESS_LEN = 30

type ViewerConfig = {
  defaultDomains: string[]
  domains: string[]
  minAddressLen: number
  maxAddressLen: number
}

const parseMailMetadata = (metadata: unknown) => {
  if (!metadata) return {}
  if (typeof metadata === "object") return metadata as Record<string, unknown>
  try {
    return JSON.parse(String(metadata)) as Record<string, unknown>
  } catch {
    return {}
  }
}

const formatDate = (value?: string) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function useTempMailViewer() {
  const initialEmail = typeof window === "undefined" ? null : splitViewerEmailAddress(currentEmailStorage.get())
  const [viewerConfig, setViewerConfig] = useState<ViewerConfig>({
    defaultDomains: [],
    domains: [],
    minAddressLen: 1,
    maxAddressLen: DEFAULT_MAX_ADDRESS_LEN,
  })
  const [emailName, setEmailName] = useState(initialEmail?.name || "")
  const [fixedDomain, setFixedDomain] = useState(initialEmail?.domain || "")
  const [mails, setMails] = useState<ParsedViewerMail[]>([])
  const [selectedMailId, setSelectedMailId] = useState<number | string | null>(null)
  const [loadingInbox, setLoadingInbox] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [polling, setPolling] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [statusText, setStatusText] = useState("")
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null)
  const [newMailIds, setNewMailIds] = useState<Set<number | string>>(new Set())

  const pollTimerRef = useRef<number | null>(null)
  const emptyPollsRef = useRef(0)
  const currentPollIntervalRef = useRef(POLL_INTERVAL_MS)
  const scheduleNextPollRef = useRef<() => void>(() => {})
  const mailsRef = useRef<ParsedViewerMail[]>([])
  const selectedMailIdRef = useRef<number | string | null>(null)

  useEffect(() => {
    mailsRef.current = mails
  }, [mails])

  useEffect(() => {
    selectedMailIdRef.current = selectedMailId
  }, [selectedMailId])

  const maxAddressLen = useMemo(() => Math.max(Number(viewerConfig.maxAddressLen) || DEFAULT_MAX_ADDRESS_LEN, 1), [viewerConfig.maxAddressLen])
  const minAddressLen = useMemo(() => Math.max(Number(viewerConfig.minAddressLen) || 1, 1), [viewerConfig.minAddressLen])
  const resolvedDomain = fixedDomain || viewerConfig.defaultDomains[0] || viewerConfig.domains[0] || ""
  const domainReady = Boolean(resolvedDomain)
  const email = useMemo(() => buildViewerEmail(emailName, resolvedDomain, maxAddressLen), [emailName, resolvedDomain, maxAddressLen])
  const hasSession = Boolean(viewerTokenStorage.get() && email)
  const displayDomain = resolvedDomain || "domain"
  const selectedMail = mails.find((item) => item.id === selectedMailId) || null
  const lastCheckedText = lastCheckedAt
    ? new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(lastCheckedAt)
    : "Not checked yet"

  const setEmailAddress = useCallback((value: string) => {
    const parts = splitViewerEmailAddress(value)
    if (parts) {
      setEmailName(normalizeViewerMailboxName(parts.name, maxAddressLen))
      setFixedDomain(parts.domain)
      return
    }
    setEmailName(normalizeViewerMailboxName(value, maxAddressLen))
  }, [maxAddressLen])

  const normalizeMail = useCallback(async (
    mail: ViewerMail | ParsedViewerMail,
    { parseRaw = false, createAttachmentUrls = false } = {},
  ): Promise<ParsedViewerMail> => {
    const item = { ...mail } as ParsedViewerMail
    const metadata = parseMailMetadata(item.metadata)
    if (parseRaw && item.raw && (!item.subject || !item.message || createAttachmentUrls)) {
      const processed = await processItem(item, { createAttachmentUrls })
      return {
        ...processed,
        metadata,
        detailLoaded: true,
      }
    }
    return {
      ...item,
      metadata,
      subject: item.subject || String(metadata.subject || "No subject"),
      message: item.message || item.html || item.text || "",
      text: item.text || item.message || String(metadata.snippet || ""),
      source: String(metadata.source || item.source || item.from || "Unknown sender"),
      detailLoaded: Boolean(item.raw || item.message || item.html || item.text),
    }
  }, [])

  const replaceMail = useCallback((mail: ParsedViewerMail) => {
    setMails((current) => current.map((item) => (item.id === mail.id ? mail : item)))
  }, [])

  const revokeAllMailObjectUrls = useCallback(() => {
    mailsRef.current.forEach(revokeMailObjectUrls)
  }, [])

  const hydrateSelectedMailDetail = useCallback(async () => {
    const mail = mailsRef.current.find((item) => item.id === selectedMailIdRef.current)
    if (!mail || loadingDetail) return
    if (mail.raw) {
      if (mail.attachmentUrlsCreated) return
      const processed = await normalizeMail({ ...mail }, { parseRaw: true, createAttachmentUrls: true })
      replaceMail(processed)
      return
    }
    setLoadingDetail(true)
    try {
      const detail = await getViewerMail(mail.id)
      if (!detail) return
      const processed = await normalizeMail({ ...mail, ...detail }, { parseRaw: true, createAttachmentUrls: true })
      replaceMail(processed)
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Failed to load mail")
    } finally {
      setLoadingDetail(false)
    }
  }, [loadingDetail, normalizeMail, replaceMail])

  useEffect(() => {
    if (selectedMailId) {
      void hydrateSelectedMailDetail()
    }
  }, [hydrateSelectedMailDetail, selectedMailId])

  const mergeMails = useCallback(async (rows: ViewerMail[], markNew = false) => {
    const normalized = await Promise.all((rows || []).map((mail) => normalizeMail(mail)))
    const normalizedWithDetails = normalized.map((mail) => {
      const existing = mailsRef.current.find((item) => item.id === mail.id)
      if (!existing?.detailLoaded || mail.detailLoaded) return mail
      return {
        ...mail,
        raw: existing.raw,
        message: existing.message,
        html: existing.html,
        text: existing.text,
        attachments: existing.attachments,
        attachmentUrls: existing.attachmentUrls,
        attachmentUrlsCreated: existing.attachmentUrlsCreated,
        detailLoaded: existing.detailLoaded,
      }
    })
    normalizedWithDetails.forEach((mail) => {
      const existing = mailsRef.current.find((item) => item.id === mail.id)
      if (existing?.attachmentUrlsCreated && mail.raw && mail.raw !== existing.raw) revokeMailObjectUrls(existing)
    })
    const merged = mergeViewerMails(mailsRef.current, normalizedWithDetails, selectedMailIdRef.current)
    setMails(merged.mails)
    setSelectedMailId(merged.selectedMailId)

    if (markNew) {
      merged.freshIds.forEach((id) => {
        setNewMailIds((current) => new Set(current).add(id))
        window.setTimeout(() => {
          setNewMailIds((current) => {
            const next = new Set(current)
            next.delete(id)
            return next
          })
        }, 5000)
      })
    }
  }, [normalizeMail])

  const fetchInbox = useCallback(async ({ silent = false, sinceId = null }: { silent?: boolean; sinceId?: number | string | null } = {}) => {
    if (!viewerTokenStorage.get() || loadingInbox) return 0
    if (!silent) setErrorText("")
    setLoadingInbox(!silent)
    setPolling(silent)
    try {
      const data = await getViewerMails({ limit: 50, offset: 0, sinceId })
      const rows = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : []
      await mergeMails(rows, silent)
      setLastCheckedAt(new Date())
      return rows.length
    } catch (error) {
      if (!silent) {
        setErrorText(error instanceof Error ? error.message : "Failed to load inbox")
      }
      return 0
    } finally {
      setLoadingInbox(false)
      setPolling(false)
    }
  }, [loadingInbox, mergeMails])

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      window.clearTimeout(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }, [])

  const scheduleNextPoll = useCallback(() => {
    if (!viewerTokenStorage.get()) return
    pollTimerRef.current = window.setTimeout(async () => {
      if (!shouldPollInbox({ hasSession: Boolean(viewerTokenStorage.get()), documentHidden: document.hidden })) {
        scheduleNextPollRef.current()
        return
      }
      const sinceId = mailsRef.current[0]?.id || null
      const receivedRows = await fetchInbox({ silent: true, sinceId })
      emptyPollsRef.current = receivedRows > 0 ? 0 : emptyPollsRef.current + 1
      currentPollIntervalRef.current = resolveNextPollInterval({
        emptyPolls: emptyPollsRef.current,
        baseMs: POLL_INTERVAL_MS,
        maxMs: POLL_MAX_INTERVAL_MS,
        backoffAfter: POLL_BACKOFF_AFTER_EMPTY,
      })
      scheduleNextPollRef.current()
    }, currentPollIntervalRef.current)
  }, [fetchInbox])

  useEffect(() => {
    scheduleNextPollRef.current = scheduleNextPoll
  }, [scheduleNextPoll])

  const startPolling = useCallback(() => {
    stopPolling()
    emptyPollsRef.current = 0
    currentPollIntervalRef.current = POLL_INTERVAL_MS
    scheduleNextPoll()
  }, [scheduleNextPoll, stopPolling])

  const loadInbox = useCallback(async () => {
    const nextEmail = email
    setStatusText("")
    if (!resolvedDomain) {
      setErrorText("Email domain is not configured.")
      return
    }
    if (emailName.length < minAddressLen) {
      setErrorText(`Please enter at least ${minAddressLen} characters.`)
      return
    }
    if (!validateViewerEmail(nextEmail)) {
      setErrorText("Please enter a valid email name.")
      return
    }

    setLoadingInbox(true)
    setErrorText("")
    try {
      if (!fixedDomain) setFixedDomain(resolvedDomain)
      const data = await createViewerSession(nextEmail)
      setEmailAddress(data.email || nextEmail)
      currentEmailStorage.set(data.email || nextEmail)
      viewerTokenStorage.set(data.token || "")
      revokeAllMailObjectUrls()
      setMails([])
      setSelectedMailId(null)
      setLoadingInbox(false)
      await fetchInbox()
      startPolling()
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Failed to load mailbox")
    } finally {
      setLoadingInbox(false)
    }
  }, [email, emailName.length, fetchInbox, fixedDomain, minAddressLen, resolvedDomain, revokeAllMailObjectUrls, setEmailAddress, startPolling])

  const randomAddress = useCallback(async () => {
    setLoadingInbox(true)
    setErrorText("")
    setStatusText("")
    try {
      const data = await createRandomAddress()
      setEmailAddress(data.email || "")
      currentEmailStorage.set(data.email || "")
      viewerTokenStorage.set(data.token || "")
      revokeAllMailObjectUrls()
      setMails([])
      setSelectedMailId(null)
      setLoadingInbox(false)
      await fetchInbox()
      startPolling()
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Failed to create random address")
    } finally {
      setLoadingInbox(false)
    }
  }, [fetchInbox, revokeAllMailObjectUrls, setEmailAddress, startPolling])

  const copyAddress = useCallback(async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      setStatusText("Copy failed")
    }
  }, [email])

  const deleteMail = useCallback(async (mailId: number | string) => {
    try {
      await deleteViewerMail(mailId)
      const deletedMail = mailsRef.current.find((item) => item.id === mailId)
      revokeMailObjectUrls(deletedMail)
      setMails((current) => current.filter((item) => item.id !== mailId))
      if (selectedMailIdRef.current === mailId) {
        const next = mailsRef.current.find((item) => item.id !== mailId)
        setSelectedMailId(next?.id || null)
      }
      setStatusText("Deleted")
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Delete failed")
    }
  }, [])

  const clearInbox = useCallback(async () => {
    if (!viewerTokenStorage.get()) return
    try {
      await clearViewerInbox()
      revokeAllMailObjectUrls()
      setMails([])
      setSelectedMailId(null)
      setStatusText("Inbox cleared")
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Clear inbox failed")
    }
  }, [revokeAllMailObjectUrls])

  const selectMail = useCallback((mail: ParsedViewerMail) => {
    if (selectedMailIdRef.current !== mail.id) {
      const previous = mailsRef.current.find((item) => item.id === selectedMailIdRef.current)
      revokeMailObjectUrls(previous)
    }
    setSelectedMailId(mail.id)
  }, [])

  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden && viewerTokenStorage.get()) {
      void fetchInbox({ silent: true })
    }
  }, [fetchInbox])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const jwt = query.get("jwt")
    if (jwt) {
      viewerTokenStorage.set(jwt)
      query.delete("jwt")
      const nextSearch = query.toString()
      window.history.replaceState({}, document.title, `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`)
    }

    const fragment = window.location.hash.replace(/^#/, "")
    if (fragment) {
      const params = new URLSearchParams(fragment.startsWith("?") ? fragment.slice(1) : fragment)
      const mailbox = params.get("mailbox") || params.get("email")
      if (mailbox) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setEmailAddress(mailbox)
        window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`)
      }
    }

    void getViewerSettings().then((data) => {
      const defaultDomains = (data?.defaultDomains || []).map(normalizeViewerDomain).filter(Boolean)
      const domains = (data?.domains || []).map(normalizeViewerDomain).filter(Boolean)
      const nextConfig = {
        defaultDomains,
        domains,
        minAddressLen: data?.minAddressLen || 1,
        maxAddressLen: data?.maxAddressLen || DEFAULT_MAX_ADDRESS_LEN,
      }
      setViewerConfig(nextConfig)
      const preferredDomain = defaultDomains[0] || domains[0]
      if (preferredDomain && !fixedDomain) setFixedDomain(preferredDomain)
      setEmailName((current) => normalizeViewerMailboxName(current, nextConfig.maxAddressLen))
    }).catch((error) => {
      if (!fixedDomain) {
        setErrorText(error instanceof Error ? error.message : "Failed to load email domain configuration")
      }
    })

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      revokeAllMailObjectUrls()
      stopPolling()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    email,
    emailName,
    fixedDomain,
    displayDomain,
    mails,
    selectedMail,
    selectedMailId,
    loadingInbox,
    loadingDetail,
    polling,
    errorText,
    statusText,
    newMailIds,
    maxAddressLen,
    minAddressLen,
    domainReady,
    hasSession,
    lastCheckedText,
    formatDate,
    setEmailName: (value: string) => setEmailName(normalizeViewerMailboxName(value, maxAddressLen)),
    loadInbox,
    randomAddress,
    copyAddress,
    deleteMail,
    clearInbox,
    selectMail,
  }
}
