"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CheckDuplicatesPage() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);

  const lines = input.split("\n").filter((l) => l.trim());
  const counts = new Map<string, number>();

  for (const line of lines) {
    const key = caseSensitive ? line.trim() : line.trim().toLowerCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const duplicates = lines.filter((line) => {
    const key = caseSensitive ? line.trim() : line.trim().toLowerCase();
    return (counts.get(key) ?? 0) > 1;
  });

  // Deduplicate the output list (show each duplicate line once)
  const seen = new Set<string>();
  const uniqueDupes: string[] = [];
  for (const line of duplicates) {
    const key = caseSensitive ? line.trim() : line.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueDupes.push(line);
    }
  }

  const output = uniqueDupes.join("\n");
  const stats =
    lines.length > 0
      ? `${lines.length} lines input → ${uniqueDupes.length} duplicates found`
      : undefined;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Check Duplicates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find and report duplicate lines without removing them
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="case"
            checked={caseSensitive}
            onCheckedChange={setCaseSensitive}
          />
          <Label htmlFor="case" className="text-sm">
            Case sensitive
          </Label>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Paste lines to check for duplicates..."
          />
          <ToolTextarea
            label="Duplicates Found"
            value={output}
            readOnly
            stats={stats}
            placeholder="Duplicate lines will appear here..."
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
