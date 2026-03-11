"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PRESET_DELIMITERS = [
  { label: "Pipe |", value: "|" },
  { label: "Comma ,", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Space", value: " " },
  { label: "Colon :", value: ":" },
  { label: "Semicolon ;", value: ";" },
];

export function SplitDataContent() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState("|");
  const [customDelimiter, setCustomDelimiter] = useState("");
  const [columns, setColumns] = useState("1");

  const activeDelimiter = customDelimiter || delimiter;

  // Process split
  const output = input
    .split("\n")
    .filter((l) => l.trim())
    .map((line) => {
      const parts = line.split(activeDelimiter);
      const indices = columns
        .split(",")
        .map((c) => parseInt(c.trim(), 10) - 1)
        .filter((i) => !isNaN(i));
      return indices.map((i) => parts[i] ?? "").join(activeDelimiter);
    })
    .join("\n");

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Split Data</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Split text by delimiter into separate columns
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Delimiter</Label>
            <div className="flex flex-wrap gap-1">
              {PRESET_DELIMITERS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => {
                    setDelimiter(d.value);
                    setCustomDelimiter("");
                  }}
                  className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                    activeDelimiter === d.value && !customDelimiter
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Custom</Label>
            <Input
              value={customDelimiter}
              onChange={(e) => setCustomDelimiter(e.target.value)}
              placeholder="e.g. ::"
              className="w-20 h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Get columns (comma-separated)</Label>
            <Input
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              placeholder="1,2,3"
              className="w-28 h-8 text-xs"
            />
          </div>
        </div>

        {/* Side-by-side */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Paste data here..."
          />
          <ToolTextarea
            label="Output"
            value={output}
            readOnly
            placeholder="Results will appear here..."
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
