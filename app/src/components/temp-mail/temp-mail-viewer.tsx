"use client"

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react"
import { Check, Copy, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { MailBodySandbox } from "@/features/temp-mail/mail-body-sandbox"
import { useTempMailViewer } from "@/features/temp-mail/use-temp-mail-viewer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function TempMailViewer({ className }: { className?: string }) {
  const viewer = useTempMailViewer()
  const [copied, setCopied] = useState(false)

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("flex flex-col gap-4", className)}>
        {/* Email input row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-h-12 flex-1 items-center overflow-hidden rounded-[10px] border border-[var(--fp-solid-50)] bg-white dark:border-border dark:bg-background focus-within:border-[var(--fp-solid-400)] dark:focus-within:border-ring">
            <Input
              value={viewer.emailName}
              onChange={(e) => viewer.setEmailName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") void viewer.loadInbox() }}
              type="text"
              inputMode="email"
              data-testid="mailbox-name-input"
              autoComplete="off"
              spellCheck={false}
              maxLength={viewer.maxAddressLen}
              placeholder="Enter email name"
              aria-label="Disposable email name"
              className="h-12 border-0 font-mono shadow-none focus-visible:ring-0 placeholder:text-[var(--fp-solid-300)] dark:placeholder:text-zinc-500"
            />
            <span className="shrink-0 px-2 text-sm font-semibold text-[var(--fp-solid-400)] dark:text-zinc-400">
              {viewer.emailName.length}/{viewer.maxAddressLen}
            </span>
            <span className="shrink-0 px-1 text-sm font-semibold text-[var(--fp-solid-400)] dark:text-zinc-400">@</span>
            <span className="shrink-0 pr-3 text-sm font-semibold">{viewer.displayDomain}</span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="load-mailbox"
                onClick={() => void viewer.loadInbox()}
                disabled={viewer.loadingInbox || !viewer.domainReady}
                size="sm"
                className="bg-background text-foreground hover:bg-[var(--fp-solid-600)] active:bg-[var(--fp-solid-400)] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Load
              </Button>
            </TooltipTrigger>
            <TooltipContent>Load inbox for this email address</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="random-mailbox"
                variant="outline"
                onClick={() => void viewer.randomAddress()}
                disabled={viewer.loadingInbox}
                size="sm"
                className="border-0 bg-[var(--fp-solid-25)] text-[var(--fp-solid-900)] hover:bg-[var(--fp-solid-50)] active:bg-[var(--fp-solid-100)] dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
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
                variant="outline"
                onClick={() => {
                  void viewer.copyAddress()
                  toast.success("Copied")
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                disabled={!viewer.email}
                size="sm"
                className="border-0 bg-[var(--fp-solid-25)] text-[var(--fp-solid-900)] hover:bg-[var(--fp-solid-50)] active:bg-[var(--fp-solid-100)] dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
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
                : "border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] text-[var(--fp-solid-500)] dark:border-border dark:bg-muted dark:text-zinc-400",
            )}
          >
            {viewer.errorText || viewer.statusText}
          </div>
        )}

        {/* Main grid: inbox list + mail content */}
        <div data-testid="viewer-grid" className="grid grid-cols-12 gap-4">
          {/* Inbox sidebar */}
          <aside className="col-span-12 overflow-hidden rounded-[16px] border border-[var(--fp-solid-50)] bg-white dark:border-border dark:bg-background md:col-span-4">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] px-4 py-3 dark:border-border dark:bg-muted">
              <div>
                <span className="text-sm font-semibold">Inbox</span>
                <span className="ml-2 text-xs text-[var(--fp-solid-400)] dark:text-zinc-400">{viewer.mails.length} mails</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    data-testid="clear-inbox"
                    variant="ghost"
                    size="sm"
                    onClick={() => void viewer.clearInbox()}
                    disabled={!viewer.mails.length}
                    className="h-7 bg-white text-red-500 shadow-[inset_0_0_0_1px_rgb(254_202_202)] hover:bg-red-50 hover:text-red-600 dark:bg-zinc-900 dark:text-red-400 dark:shadow-[inset_0_0_0_1px_rgb(153_27_27)] dark:hover:bg-red-900/30 dark:hover:text-red-300"
                  >
                    <Trash2 className="mr-1 size-3.5" />
                    Clear all
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete all mails in inbox</TooltipContent>
              </Tooltip>
            </div>

            {/* Polling status bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--fp-solid-50)] bg-white px-4 py-2 text-xs text-[var(--fp-solid-400)] dark:border-border dark:bg-background dark:text-zinc-400">
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
                <ul className="flex flex-col divide-y divide-[var(--fp-solid-50)] dark:divide-border">
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
                            ? "bg-[var(--fp-solid-25)] dark:bg-muted"
                            : "bg-white hover:bg-[var(--fp-solid-25)] dark:bg-background dark:hover:bg-muted/50",
                          viewer.newMailIds.has(mail.id)
                            ? "border-emerald-500"
                            : "border-transparent"
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <strong className={cn(
                            "block break-words text-sm",
                            viewer.newMailIds.has(mail.id)
                              ? "font-semibold text-[var(--fp-solid-900)] dark:text-zinc-50"
                              : "font-medium text-[var(--fp-solid-500)] dark:text-zinc-400"
                          )}>
                            {mail.subject || "No subject"}
                          </strong>
                          <span className={cn(
                            "mt-0.5 block text-xs",
                            viewer.newMailIds.has(mail.id)
                              ? "text-[var(--fp-solid-500)] dark:text-zinc-300"
                              : "text-[var(--fp-solid-400)] dark:text-zinc-500"
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
                          className="rounded px-1.5 text-base leading-5 text-[var(--fp-solid-300)] opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 dark:text-zinc-500"
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
          <section className="col-span-12 min-h-[480px] overflow-hidden rounded-[16px] border border-[var(--fp-solid-50)] bg-white dark:border-border dark:bg-background md:col-span-8">
            {viewer.selectedMail ? (
              <article className="flex h-full flex-col">
                <header className="border-b border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] px-4 py-3 dark:border-border dark:bg-muted">
                  <h2 className="text-sm font-semibold">{viewer.selectedMail.subject || "No subject"}</h2>
                  <p className="mt-0.5 text-xs text-[var(--fp-solid-400)] dark:text-zinc-400">{viewer.selectedMail.source}</p>
                </header>
                {!viewer.loadingDetail || viewer.selectedMail.message || viewer.selectedMail.text ? (
                  <MailBodySandbox
                    className="min-h-[420px] flex-1 border-0 bg-white dark:bg-background"
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
    <div className="px-4 py-6 text-center text-sm text-[var(--fp-solid-400)] dark:text-zinc-400">
      {children}
    </div>
  )
}

function PreviewEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center p-6 text-sm text-[var(--fp-solid-400)] dark:text-zinc-400">
      {children}
    </div>
  )
}

// Unused but kept for API compatibility in case needed later
const _ButtonRef = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => <button ref={ref} type="button" {...props} />,
)
_ButtonRef.displayName = "_ButtonRef"
