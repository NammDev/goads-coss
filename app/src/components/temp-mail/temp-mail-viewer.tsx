"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { Copy, RefreshCw, Trash2 } from "lucide-react"

import { MailBodySandbox } from "@/features/temp-mail/mail-body-sandbox"
import { useTempMailViewer } from "@/features/temp-mail/use-temp-mail-viewer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function TempMailViewer({ className }: { className?: string }) {
  const viewer = useTempMailViewer()

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("flex flex-col gap-4", className)}>
        {/* Email input row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-h-10 flex-1 items-center overflow-hidden rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring">
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
              className="h-10 border-0 font-mono shadow-none focus-visible:ring-0"
            />
            <span className="shrink-0 px-2 text-sm font-semibold text-muted-foreground">
              {viewer.emailName.length}/{viewer.maxAddressLen}
            </span>
            <span className="shrink-0 px-1 text-sm font-semibold text-muted-foreground">@</span>
            <span className="shrink-0 pr-3 text-sm font-semibold">{viewer.displayDomain}</span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-testid="load-mailbox"
                onClick={() => void viewer.loadInbox()}
                disabled={viewer.loadingInbox || !viewer.domainReady}
                size="sm"
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
                onClick={() => void viewer.copyAddress()}
                disabled={!viewer.email}
                size="sm"
              >
                <Copy className="mr-1.5 size-3.5" />
                Copy
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
                : "border-border bg-muted text-muted-foreground",
            )}
          >
            {viewer.errorText || viewer.statusText}
          </div>
        )}

        {/* Main grid: inbox list + mail content */}
        <div data-testid="viewer-grid" className="grid grid-cols-12 gap-4">
          {/* Inbox sidebar */}
          <aside className="col-span-12 overflow-hidden rounded-lg border md:col-span-4">
            <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-4 py-2.5">
              <div>
                <span className="text-sm font-semibold">Inbox</span>
                <span className="ml-2 text-xs text-muted-foreground">{viewer.mails.length} mails</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    data-testid="clear-inbox"
                    variant="ghost"
                    size="sm"
                    onClick={() => void viewer.clearInbox()}
                    disabled={!viewer.mails.length}
                    className="h-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-1 size-3.5" />
                    Clear all
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete all mails in inbox</TooltipContent>
              </Tooltip>
            </div>

            {/* Polling status bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
              <span className={cn("size-1.5 rounded-full", viewer.hasSession ? "bg-emerald-500" : "bg-muted-foreground/40")} />
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
                <ul className="p-2">
                  {viewer.mails.map((mail) => (
                    <li key={String(mail.id)}>
                      <button
                        type="button"
                        data-testid="mail-item"
                        aria-current={viewer.selectedMailId === mail.id ? "true" : undefined}
                        onClick={() => viewer.selectMail(mail)}
                        className={cn(
                          "group flex w-full items-start justify-between gap-2 rounded-md border-l-2 px-3 py-2.5 text-left transition-colors",
                          viewer.selectedMailId === mail.id
                            ? "border-l-foreground bg-muted"
                            : "border-l-transparent hover:bg-muted/50",
                          viewer.newMailIds.has(mail.id) && "ring-1 ring-emerald-400",
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <strong className="block truncate text-sm font-medium">
                            {mail.subject || "No subject"}
                          </strong>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
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
                          className="rounded px-1.5 text-base leading-5 text-muted-foreground/50 opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
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
          <section className="col-span-12 min-h-[480px] overflow-hidden rounded-lg border md:col-span-8">
            {viewer.selectedMail ? (
              <article className="flex h-full flex-col">
                <header className="border-b bg-muted/40 px-4 py-3">
                  <h2 className="text-sm font-semibold">{viewer.selectedMail.subject || "No subject"}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{viewer.selectedMail.source}</p>
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
    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}

function PreviewEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center p-6 text-sm text-muted-foreground">
      {children}
    </div>
  )
}

// Unused but kept for API compatibility in case needed later
const _ButtonRef = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => <button ref={ref} type="button" {...props} />,
)
_ButtonRef.displayName = "_ButtonRef"
