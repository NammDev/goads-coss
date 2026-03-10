"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Copy, Download } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** TOTP implementation — RFC 6238 / RFC 4226 */
async function generateTOTP(secret: string): Promise<string> {
  // Decode base32 secret
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleanSecret = secret.replace(/[\s=-]/g, "").toUpperCase();
  let bits = "";
  for (const c of cleanSecret) {
    const val = base32Chars.indexOf(c);
    if (val === -1) throw new Error("Invalid base32");
    bits += val.toString(2).padStart(5, "0");
  }
  const keyBytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < keyBytes.length; i++) {
    keyBytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }

  // Time counter (30s window)
  const epoch = Math.floor(Date.now() / 1000);
  const counter = Math.floor(epoch / 30);
  const counterBytes = new Uint8Array(8);
  let tmp = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = tmp & 0xff;
    tmp = Math.floor(tmp / 256);
  }

  // HMAC-SHA1
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes));

  // Dynamic truncation
  const offset = sig[sig.length - 1] & 0x0f;
  const code =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff);

  return (code % 1000000).toString().padStart(6, "0");
}

/** Extract valid base32 secrets from input text */
function parseSecrets(input: string): string[] {
  const lines = input.split("\n").filter((l) => l.trim());
  const secrets = new Set<string>();

  for (const line of lines) {
    // Try extracting 32-char base32 segment from pipe-separated data
    const parts = line.split("|");
    for (const part of parts) {
      const clean = part.trim().replace(/[\s=-]/g, "").toUpperCase();
      if (/^[A-Z2-7]{16,}$/.test(clean)) {
        secrets.add(clean);
        break;
      }
    }
  }
  return Array.from(secrets);
}

type CodeEntry = { secret: string; code: string };

export function TwoFaContent() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<CodeEntry[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const generate = useCallback(async () => {
    const secrets = parseSecrets(input);
    const results: CodeEntry[] = [];
    for (const secret of secrets) {
      try {
        const code = await generateTOTP(secret);
        results.push({ secret, code });
      } catch {
        results.push({ secret, code: "ERROR" });
      }
    }
    setEntries(results);
  }, [input]);

  // Auto-refresh countdown
  useEffect(() => {
    if (entries.length === 0) return;

    const tick = () => {
      const remaining = 30 - (Math.floor(Date.now() / 1000) % 30);
      setTimeLeft(remaining);
      if (remaining === 30) generate();
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [entries.length, generate]);

  const copyCode = (code: string) => navigator.clipboard.writeText(code);
  const copyAll = () => {
    const text = entries.map((e) => e.code).join("\n");
    navigator.clipboard.writeText(text);
  };
  const exportTxt = () => {
    const text = entries.map((e) => `${e.secret}|${e.code}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `2fa-codes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const progressPercent = (timeLeft / 30) * 100;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <ToolsSidebarMobile />
            <h1 className="text-2xl font-semibold">2FA Code Generator</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generate TOTP codes from your 2FA secrets
            </p>
          </div>
        </div>

        {/* Input */}
        <ToolTextarea
          value={input}
          onChange={setInput}
          placeholder="Enter 2FA secrets (one per line)..."
          label="Secrets"
        />

        <Button onClick={generate} className="gap-1.5">
          <Play className="size-3.5" />
          Generate
        </Button>

        {/* Countdown */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Codes refresh automatically</span>
              <span>{timeLeft}s remaining</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Results table */}
        {entries.length > 0 && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Secret</TableHead>
                  <TableHead className="w-32">Code</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, i) => (
                  <TableRow key={entry.secret}>
                    <TableCell className="text-muted-foreground">
                      {i + 1}
                    </TableCell>
                    <TableCell className="font-mono text-xs truncate max-w-[200px]">
                      {entry.secret}
                    </TableCell>
                    <TableCell className="font-mono text-lg font-semibold tracking-widest">
                      {entry.code.slice(0, 3)}{" "}
                      <span>{entry.code.slice(3)}</span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(entry.code)}
                      >
                        <Copy className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Bulk actions */}
        {entries.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={copyAll}>
              <Copy className="size-3.5" />
              Copy All Codes
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={exportTxt}>
              <Download className="size-3.5" />
              Export .txt
            </Button>
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
