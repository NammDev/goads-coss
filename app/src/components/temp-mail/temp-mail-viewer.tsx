"use client"

import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react"
import { Check, Copy, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { MailBodySandbox } from "@/features/temp-mail/mail-body-sandbox"
import { useTempMailViewer } from "@/features/temp-mail/use-temp-mail-viewer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function TempMailViewer({ className }: { className?: string }) {
  const viewer = useTempMailViewer()
  const [copied, setCopied] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Field shows the FULL address (name@domain) so it's one selectable/
  // copyable string. Only the local part is editable; domain is fixed.
  const fullAddress = viewer.emailName
    ? `${viewer.emailName}@${viewer.displayDomain}`
    : ""

  // After typing, the controlled value re-expands to name@domain which would
  // shove the caret past the domain — pin it back to the end of the name
  // (only while the user is actually focused in the field).
  useEffect(() => {
    const el = emailInputRef.current
    if (!el || document.activeElement !== el) return
    const pos = viewer.emailName.length
    el.setSelectionRange(pos, pos)
  }, [viewer.emailName, viewer.displayDomain])

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("flex flex-col gap-4", className)}>
        {/* Email input row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Foreplay light input — always-white block, no dark: variants.
              Domain shown as placeholder hint (email@<domain>) instead of a
              literal suffix span. */}
          <div className="flex min-h-12 flex-1 items-center overflow-hidden rounded-[10px] border border-[var(--solid-50)] bg-white focus-within:border-[var(--solid-400)]">
            <input
              ref={emailInputRef}
              value={fullAddress}
              onChange={(e) => {
                // keep only the local part (before first "@"); domain is fixed
                const localPart = e.target.value.split("@")[0].slice(0, viewer.maxAddressLen)
                viewer.setEmailName(localPart)
              }}
              onKeyDown={(e) => { if (e.key === "Enter") void viewer.loadInbox() }}
              type="text"
              inputMode="email"
              data-testid="mailbox-name-input"
              autoComplete="off"
              spellCheck={false}
              placeholder={`email@${viewer.displayDomain || "goadsagency.com"}`}
              aria-label="Disposable email address"
              className="h-12 w-full min-w-0 border-0 bg-transparent px-3 font-mono text-base text-[var(--solid-900)] outline-none selection:bg-[var(--solid-900)] selection:text-white placeholder:text-[var(--solid-300)] md:text-sm"
            />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="load-mailbox"
                onClick={() => void viewer.loadInbox()}
                disabled={viewer.loadingInbox || !viewer.domainReady}
                className="h-9 shrink-0 cursor-pointer rounded-[8px] border-0 px-3.5 font-sans text-[0.9375rem] font-[550] leading-5 bg-[var(--solid-900)] text-white shadow-none transition-colors duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[var(--solid-700)] active:bg-[var(--solid-600)]"
              >
                Load
              </Button>
            </TooltipTrigger>
            <TooltipContent>Load inbox for this email address</TooltipContent>
          </Tooltip>

          {/* Mobile line break — keeps [input + Load] on row 1 and wraps
              Random/Copy to row 2. Hidden ≥sm (all four share one row). */}
          <div aria-hidden className="hidden basis-full max-sm:block" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="random-mailbox"
                onClick={() => void viewer.randomAddress()}
                disabled={viewer.loadingInbox}
                className="h-9 shrink-0 cursor-pointer rounded-[8px] border border-[var(--solid-100)] px-3.5 font-sans text-[0.9375rem] font-[550] leading-5 bg-white text-[var(--solid-900)] shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-colors duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[var(--solid-25)] hover:text-[var(--solid-900)] active:bg-[var(--solid-50)]"
              >
                Random
              </Button>
            </TooltipTrigger>
            <TooltipContent>Generate a random email address</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="copy-mailbox"
                onClick={() => {
                  void viewer.copyAddress()
                  toast.success("Copied")
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                disabled={!viewer.email}
                className="h-9 shrink-0 cursor-pointer rounded-[8px] border border-[var(--solid-100)] px-3.5 font-sans text-[0.9375rem] font-[550] leading-5 bg-white text-[var(--solid-900)] shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-colors duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[var(--solid-25)] hover:text-[var(--solid-900)] active:bg-[var(--solid-50)]"
              >
                {copied ? <Check className="mr-1.5 size-3.5" /> : <Copy className="mr-1.5 size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy email address to clipboard</TooltipContent>
          </Tooltip>
        </div>

        {/* Status / Error message */}
        {(viewer.errorText || viewer.statusText) && (
          <div
            data-testid="viewer-message"
            className={cn(
              "rounded-md border px-4 py-2.5 text-sm",
              viewer.errorText
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-[var(--solid-50)] bg-[var(--solid-25)] text-[var(--solid-500)]",
            )}
          >
            {viewer.errorText || viewer.statusText}
          </div>
        )}

        {/* Main grid: inbox list + mail content */}
        <div data-testid="viewer-grid" className="grid grid-cols-12 gap-4">
          {/* Inbox sidebar */}
          <aside className="col-span-12 overflow-hidden rounded-[16px] border border-[var(--solid-50)] bg-white md:col-span-4">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--solid-50)] bg-[var(--solid-25)] px-4 py-3">
              <div>
                <span className="text-sm font-semibold">Inbox</span>
                <span className="ml-2 text-xs text-[var(--solid-400)]">{viewer.mails.length} mails</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    data-testid="clear-inbox"
                    variant="ghost"
                    size="sm"
                    onClick={() => void viewer.clearInbox()}
                    disabled={!viewer.mails.length}
                    className="h-7 bg-white text-red-500 shadow-[inset_0_0_0_1px_rgb(254_202_202)] hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="mr-1 size-3.5" />
                    Clear all
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete all mails in inbox</TooltipContent>
              </Tooltip>
            </div>

            {/* Polling status bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--solid-50)] bg-white px-4 py-2 text-xs text-[var(--solid-400)]">
              <span className={cn("size-1.5 rounded-full", viewer.hasSession ? "bg-emerald-500" : "bg-emerald-500")} />
              <span>{viewer.hasSession ? "Auto-reload on" : "Auto-reload off"}</span>
              <span>· Last checked {viewer.lastCheckedText}</span>
              {viewer.polling && <RefreshCw className="size-3 animate-spin" />}
            </div>

            {/* Mail list */}
            {!viewer.hasSession ? (
              <EmptyState>Enter an email address and click Load to start.</EmptyState>
            ) : viewer.loadingInbox && !viewer.mails.length ? (
              <EmptyState>Loading inbox...</EmptyState>
            ) : !viewer.mails.length ? (
              <EmptyState>No mails yet. Waiting for incoming messages.</EmptyState>
            ) : (
              <ScrollArea className="max-h-[520px]">
                <ul className="flex flex-col divide-y divide-[var(--solid-50)]">
                  {viewer.mails.map((mail) => (
                    <li key={String(mail.id)}>
                      <button
                        type="button"
                        data-testid="mail-item"
                        aria-current={viewer.selectedMailId === mail.id ? "true" : undefined}
                        onClick={() => viewer.selectMail(mail)}
                        className={cn(
                          "group flex w-full items-start justify-between gap-2 border-l-[3px] px-4 py-3 text-left transition-colors",
                          viewer.selectedMailId === mail.id
                            ? "bg-[var(--solid-25)]"
                            : "bg-white hover:bg-[var(--solid-25)]",
                          viewer.newMailIds.has(mail.id)
                            ? "border-emerald-500"
                            : "border-transparent"
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <strong className={cn(
                            "block break-words text-sm",
                            viewer.newMailIds.has(mail.id)
                              ? "font-semibold text-[var(--solid-900)]"
                              : "font-medium text-[var(--solid-500)]"
                          )}>
                            {mail.subject || "No subject"}
                          </strong>
                          <span className={cn(
                            "mt-0.5 block text-xs",
                            viewer.newMailIds.has(mail.id)
                              ? "text-[var(--solid-500)]"
                              : "text-[var(--solid-400)]"
                          )}>
                            {viewer.formatDate(mail.created_at)}
                          </span>
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          title="Delete mail"
                          onClick={(e) => { e.stopPropagation(); void viewer.deleteMail(mail.id) }}
                          onKeyDown={(e) => {
                            if (e.key !== "Enter" && e.key !== " ") return
                            e.preventDefault(); e.stopPropagation()
                            void viewer.deleteMail(mail.id)
                          }}
                          className="rounded px-1.5 text-base leading-5 text-[var(--solid-300)] opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                        >
                          ×
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </aside>

          {/* Mail content panel */}
          <section className="col-span-12 min-h-[480px] overflow-hidden rounded-[16px] border border-[var(--solid-50)] bg-white md:col-span-8">
            {viewer.selectedMail ? (
              <article className="flex h-full flex-col">
                <header className="border-b border-[var(--solid-50)] bg-[var(--solid-25)] px-4 py-3">
                  <h2 className="text-sm font-semibold">{viewer.selectedMail.subject || "No subject"}</h2>
                  <p className="mt-0.5 text-xs text-[var(--solid-400)]">{viewer.selectedMail.source}</p>
                </header>
                {!viewer.loadingDetail || viewer.selectedMail.message || viewer.selectedMail.text ? (
                  <MailBodySandbox
                    className="min-h-[420px] flex-1 border-0 bg-white"
                    html={viewer.selectedMail.message || viewer.selectedMail.text || ""}
                  />
                ) : (
                  <PreviewEmpty>Loading mail...</PreviewEmpty>
                )}
              </article>
            ) : (
              <PreviewEmpty>Select a mail to read its content.</PreviewEmpty>
            )}
          </section>
        </div>
      </div>
    </TooltipProvider>
  )
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-6 text-center text-sm text-[var(--solid-400)]">
      {children}
    </div>
  )
}

function PreviewEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center p-6 text-sm text-[var(--solid-400)]">
      {children}
    </div>
  )
}

// Unused but kept for API compatibility in case needed later
const _ButtonRef = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => <button ref={ref} type="button" {...props} />,
)
_ButtonRef.displayName = "_ButtonRef"
