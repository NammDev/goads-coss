"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/_legacy-tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Card, CardContent } from "@/components/ui/card";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const URL_RE = /https?:\/\/[^\s]+/g;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/g;

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}

export function CheckContentContent() {
  const [input, setInput] = useState("");

  const chars = input.length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineArr = input.split("\n");
  const lines = lineArr.length;
  const sentences = input.trim()
    ? input.split(/[.!?]+/).filter((s) => s.trim()).length
    : 0;
  const paragraphs = input.trim()
    ? input.split(/\n\s*\n/).filter((p) => p.trim()).length
    : 0;

  const emails = input.match(EMAIL_RE) ?? [];
  const urls = input.match(URL_RE) ?? [];
  const phones = input.match(PHONE_RE) ?? [];

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Check Content</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze text — character count, word count, emails, URLs, and more
          </p>
        </div>

        <ToolTextarea
          label="Input"
          value={input}
          onChange={setInput}
          placeholder="Paste any text to analyze..."
          rows={8}
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Characters" value={chars} />
          <StatCard label="Words" value={words} />
          <StatCard label="Lines" value={lines} />
          <StatCard label="Sentences" value={sentences} />
          <StatCard label="Paragraphs" value={paragraphs} />
        </div>

        {/* Detected patterns */}
        <div className="space-y-3">
          <DetectedList label="Emails found" items={emails} />
          <DetectedList label="URLs found" items={urls} />
          <DetectedList label="Phone numbers found" items={phones} />
        </div>
      </div>
    </ToolPageShell>
  );
}

function DetectedList({ label, items }: { label: string; items: string[] }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          {label}{" "}
          <span className="text-foreground font-semibold">{items.length}</span>
        </p>
        {items.length > 0 ? (
          <ul className="space-y-0.5">
            {items.slice(0, 10).map((item, i) => (
              <li key={i} className="font-mono text-xs truncate text-foreground/80">
                {item}
              </li>
            ))}
            {items.length > 10 && (
              <li className="text-xs text-muted-foreground">
                +{items.length - 10} more
              </li>
            )}
          </ul>
        ) : (
          <p className="text-xs text-muted-foreground/60">None detected</p>
        )}
      </CardContent>
    </Card>
  );
}
