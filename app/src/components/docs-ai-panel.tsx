"use client"

import { Bot, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DocsAiPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <aside
      className={`hidden shrink-0 border-l border-border transition-all duration-300 lg:block ${
        open ? "w-[320px]" : "w-0 overflow-hidden border-l-0"
      }`}
    >
      <div className="flex h-full w-[320px] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Bot className="size-4 text-primary" />
            AI Assistant
          </div>
          <Button variant="ghost" size="icon" className="size-7" onClick={onClose} aria-label="Close AI panel">
            <X className="size-3.5" />
          </Button>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Bot className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Ask a question about GoAds</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Get instant answers about ad accounts, billing, setup, and more.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask anything..."
              className="h-9 text-sm"
              disabled
            />
            <Button size="icon" className="size-9 shrink-0" disabled aria-label="Send message">
              <Send className="size-3.5" />
            </Button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            AI features coming soon
          </p>
        </div>
      </div>
    </aside>
  )
}
