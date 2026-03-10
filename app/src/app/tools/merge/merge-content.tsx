"use client";

import { useState } from "react";
import { Play, Plus, X } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MergeContent() {
  const [sources, setSources] = useState(["", ""]);
  const [delimiter, setDelimiter] = useState("|");
  const [matchCol, setMatchCol] = useState("1");
  const [output, setOutput] = useState("");

  const updateSource = (idx: number, val: string) => {
    const next = [...sources];
    next[idx] = val;
    setSources(next);
  };

  const addSource = () => setSources([...sources, ""]);

  const removeSource = (idx: number) => {
    if (sources.length <= 2) return;
    setSources(sources.filter((_, i) => i !== idx));
  };

  const merge = () => {
    const colIdx = parseInt(matchCol, 10) - 1;
    if (isNaN(colIdx) || colIdx < 0) return;

    // Build map from first source: key → full line parts
    const map = new Map<string, string[]>();
    const firstLines = sources[0].split("\n").filter((l) => l.trim());
    for (const line of firstLines) {
      const parts = line.split(delimiter);
      const key = parts[colIdx]?.trim();
      if (key) map.set(key, parts);
    }

    // Merge subsequent sources
    for (let s = 1; s < sources.length; s++) {
      const lines = sources[s].split("\n").filter((l) => l.trim());
      for (const line of lines) {
        const parts = line.split(delimiter);
        const key = parts[colIdx]?.trim();
        if (!key) continue;

        const existing = map.get(key);
        if (existing) {
          // Append non-key columns
          const extra = parts.filter((_, i) => i !== colIdx);
          map.set(key, [...existing, ...extra]);
        }
      }
    }

    const results = Array.from(map.values()).map((parts) =>
      parts.join(delimiter)
    );
    setOutput(results.join("\n"));
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Filter & Merge Data</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Combine multiple text sources and merge by matching key
          </p>
        </div>

        {/* Sources */}
        <div className="space-y-4">
          {sources.map((src, i) => (
            <div key={i} className="relative">
              <ToolTextarea
                label={`Source ${i + 1}`}
                value={src}
                onChange={(val) => updateSource(i, val)}
                placeholder={`Paste data for source ${i + 1}...`}
                rows={6}
              />
              {sources.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0"
                  onClick={() => removeSource(i)}
                >
                  <X className="size-3.5" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={addSource}>
            <Plus className="size-3.5" />
            Add Source
          </Button>
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Match by column</Label>
            <Input
              value={matchCol}
              onChange={(e) => setMatchCol(e.target.value)}
              className="w-20 h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Delimiter</Label>
            <Input
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-20 h-8 text-xs"
            />
          </div>
        </div>

        <Button onClick={merge} className="gap-1.5">
          <Play className="size-3.5" />
          Merge
        </Button>

        <ToolTextarea
          label="Output"
          value={output}
          readOnly
          placeholder="Merged results..."
        />
      </div>
    </ToolPageShell>
  );
}
