"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/** Detect field type from a string segment */
function is2FA(s: string): boolean {
  const clean = s.trim().replace(/[\s=-]/g, "").toUpperCase();
  return /^[A-Z2-7]{32}$/.test(clean);
}
function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
function isCookie(s: string): boolean {
  return s.includes("c_user=");
}
function isToken(s: string): boolean {
  return s.trim().startsWith("EAA");
}

type ParsedAccount = {
  uid: string;
  pass: string;
  twofa: string;
  email: string;
  cookie: string;
  token: string;
};

function parseLine(line: string): ParsedAccount | null {
  const parts = line.split("|").map((p) => p.trim());
  if (parts.length < 2) return null;

  const acc: ParsedAccount = {
    uid: "",
    pass: "",
    twofa: "",
    email: "",
    cookie: "",
    token: "",
  };

  // First part is usually UID (numeric)
  if (/^\d+$/.test(parts[0])) acc.uid = parts[0];

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (!p) continue;
    if (isCookie(p) && !acc.cookie) acc.cookie = p;
    else if (isToken(p) && !acc.token) acc.token = p;
    else if (is2FA(p) && !acc.twofa) acc.twofa = p;
    else if (isEmail(p) && !acc.email) acc.email = p;
    else if (!acc.pass && i === 1) acc.pass = p;
  }

  return acc.uid ? acc : null;
}

function formatAccount(
  acc: ParsedAccount,
  fields: string[],
  fillNA: boolean
): string {
  return fields
    .map((f) => {
      const val = acc[f as keyof ParsedAccount];
      return val || (fillNA ? "N/A" : "");
    })
    .join("|");
}

const OUTPUT_FORMATS = [
  { label: "UID|Pass|2FA|Email", fields: ["uid", "pass", "twofa", "email"] },
  { label: "UID|Pass|2FA", fields: ["uid", "pass", "twofa"] },
  { label: "UID|Pass", fields: ["uid", "pass"] },
  {
    label: "UID|Pass|2FA|Email|Cookie",
    fields: ["uid", "pass", "twofa", "email", "cookie"],
  },
  { label: "Full (all fields)", fields: ["uid", "pass", "twofa", "email", "cookie", "token"] },
];

export default function FilterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [formatIdx, setFormatIdx] = useState(0);
  const [only2FA, setOnly2FA] = useState(false);
  const [onlyCookie, setOnlyCookie] = useState(false);
  const [fillNA, setFillNA] = useState(false);

  const filter = () => {
    const lines = input.split("\n").filter((l) => l.trim());
    // Deduplicate
    const unique = [...new Set(lines)];
    const format = OUTPUT_FORMATS[formatIdx];

    const results: string[] = [];
    for (const line of unique) {
      const acc = parseLine(line);
      if (!acc) continue;
      if (only2FA && !acc.twofa) continue;
      if (onlyCookie && !acc.cookie) continue;
      results.push(formatAccount(acc, format.fields, fillNA));
    }
    setOutput(results.join("\n"));
  };

  const inputCount = input.split("\n").filter((l) => l.trim()).length;
  const outputCount = output.split("\n").filter((l) => l.trim()).length;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Account Filter</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Parse & reformat account data (UID|Pass|2FA|Email|Cookie|Token)
          </p>
        </div>

        <ToolTextarea
          label="Input"
          value={input}
          onChange={setInput}
          placeholder="Paste account data here (one per line)..."
        />

        {/* Options */}
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Output format</Label>
            <div className="flex flex-wrap gap-1.5">
              {OUTPUT_FORMATS.map((f, i) => (
                <button
                  key={f.label}
                  onClick={() => setFormatIdx(i)}
                  className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                    formatIdx === i
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Switch id="only2fa" checked={only2FA} onCheckedChange={setOnly2FA} />
              <Label htmlFor="only2fa" className="text-sm">Only with 2FA</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="onlyCookie" checked={onlyCookie} onCheckedChange={setOnlyCookie} />
              <Label htmlFor="onlyCookie" className="text-sm">Only with Cookie</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="fillNA" checked={fillNA} onCheckedChange={setFillNA} />
              <Label htmlFor="fillNA" className="text-sm">Fill N/A for missing</Label>
            </div>
          </div>
        </div>

        <Button onClick={filter} className="gap-1.5">
          <Play className="size-3.5" />
          Filter
        </Button>

        <ToolTextarea
          label="Output"
          value={output}
          readOnly
          stats={inputCount > 0 ? `${inputCount} → ${outputCount}` : undefined}
          placeholder="Filtered results..."
        />
      </div>
    </ToolPageShell>
  );
}
