"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Mail, RefreshCw } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch as UISwitch } from "@/components/ui/switch";

type Email = {
  uid: string;
  f: string; // from
  s: string; // subject
  d: string; // date
  html?: string;
  text?: string;
};

type InboxResponse = {
  msgs?: Email[];
  error?: string;
};

export default function GetnadaPage() {
  const [email, setEmail] = useState("");
  const [msgs, setMsgs] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchInbox = async (addr: string) => {
    if (!addr.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/getnada?email=${encodeURIComponent(addr)}`);
      const data: InboxResponse = await res.json();
      if (data.error) throw new Error(data.error);
      setMsgs(data.msgs ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch inbox");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (autoRefresh && email) {
      intervalRef.current = setInterval(() => fetchInbox(email), 10_000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, email]);

  const handleCheck = () => fetchInbox(email);

  const toggleExpand = (uid: string) =>
    setExpanded((prev) => (prev === uid ? null : uid));

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Quick Read Getnada</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Read your temporary Getnada inbox without leaving the page
          </p>
        </div>

        {/* Input row */}
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Getnada Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="yourname@getnada.com"
              className="h-9 text-sm"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleCheck} disabled={loading || !email.trim()} className="gap-1.5 h-9">
              <Mail className="size-3.5" />
              Check Inbox
            </Button>
          </div>
        </div>

        {/* Auto-refresh toggle */}
        <div className="flex items-center gap-2">
          <UISwitch
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
          />
          <Label htmlFor="auto-refresh" className="text-sm cursor-pointer">
            Auto-refresh every 10 seconds
          </Label>
          {autoRefresh && (
            <RefreshCw className="size-3.5 text-muted-foreground animate-spin" />
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && msgs.length === 0 && email && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No messages found in this inbox.
          </p>
        )}

        {/* Message list */}
        {!loading && msgs.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{msgs.length} message{msgs.length !== 1 ? "s" : ""}</p>
            {msgs.map((msg) => (
              <Card key={msg.uid} className="overflow-hidden">
                <button
                  onClick={() => toggleExpand(msg.uid)}
                  className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{msg.s || "(no subject)"}</p>
                    <p className="text-xs text-muted-foreground truncate">From: {msg.f}</p>
                    <p className="text-xs text-muted-foreground">{msg.d}</p>
                  </div>
                  {expanded === msg.uid ? (
                    <ChevronUp className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  )}
                </button>
                {expanded === msg.uid && (
                  <CardContent className="border-t px-4 py-3">
                    {msg.html ? (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none text-xs"
                        dangerouslySetInnerHTML={{ __html: msg.html }}
                      />
                    ) : (
                      <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground">
                        {msg.text ?? "(empty)"}
                      </pre>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
