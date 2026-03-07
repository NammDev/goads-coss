"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RemoveDuplicatesPage() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);

  const lines = input.split("\n").filter((l) => l.trim());
  const seen = new Set<string>();
  const unique: string[] = [];
  let dupeCount = 0;

  for (const line of lines) {
    const key = caseSensitive ? line.trim() : line.trim().toLowerCase();
    if (seen.has(key)) {
      dupeCount++;
    } else {
      seen.add(key);
      unique.push(line);
    }
  }

  const output = unique.join("\n");
  const stats = lines.length > 0 ? `${lines.length} → ${unique.length} (${dupeCount} removed)` : undefined;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Remove Duplicates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Remove duplicate lines from text
          </p>
        </div>

        {/* Options */}
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

        {/* Side-by-side */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Paste text with duplicates..."
          />
          <ToolTextarea
            label="Output"
            value={output}
            readOnly
            stats={stats}
            placeholder="Deduplicated results..."
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
