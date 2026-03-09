"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FilterTextPage() {
  const [input, setInput] = useState("");
  const [contains, setContains] = useState("");
  const [notContains, setNotContains] = useState("");
  const [minLen, setMinLen] = useState("");
  const [maxLen, setMaxLen] = useState("");

  const lines = input.split("\n");

  const filtered = lines.filter((line) => {
    if (contains && !line.toLowerCase().includes(contains.toLowerCase())) return false;
    if (notContains && line.toLowerCase().includes(notContains.toLowerCase())) return false;
    if (minLen && line.length < parseInt(minLen, 10)) return false;
    if (maxLen && line.length > parseInt(maxLen, 10)) return false;
    return true;
  });

  const output = filtered.join("\n");
  const inputCount = lines.filter((l) => l.trim()).length;
  const matchCount = filtered.filter((l) => l.trim()).length;
  const stats =
    inputCount > 0 ? `${inputCount} lines → ${matchCount} matched` : undefined;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Filter Text</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Filter lines by keyword or length conditions
          </p>
        </div>

        {/* Filter options */}
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Contains</Label>
            <Input
              value={contains}
              onChange={(e) => setContains(e.target.value)}
              placeholder="keyword"
              className="h-8 w-40 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Does NOT contain</Label>
            <Input
              value={notContains}
              onChange={(e) => setNotContains(e.target.value)}
              placeholder="keyword"
              className="h-8 w-40 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Min length</Label>
            <Input
              type="number"
              value={minLen}
              onChange={(e) => setMinLen(e.target.value)}
              placeholder="0"
              className="h-8 w-24 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Max length</Label>
            <Input
              type="number"
              value={maxLen}
              onChange={(e) => setMaxLen(e.target.value)}
              placeholder="∞"
              className="h-8 w-24 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Paste text to filter..."
          />
          <ToolTextarea
            label="Filtered Output"
            value={output}
            readOnly
            stats={stats}
            placeholder="Matching lines will appear here..."
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
