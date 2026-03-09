"use client";

import { useState } from "react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";

function extractFbId(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  // profile.php?id=NUMBERS
  const profileMatch = trimmed.match(/facebook\.com\/profile\.php\?.*id=(\d+)/i);
  if (profileMatch) return profileMatch[1];

  // facebook.com/NUMBERS (pure numeric path)
  const numericMatch = trimmed.match(/facebook\.com\/(\d+)\/?$/i);
  if (numericMatch) return numericMatch[1];

  // facebook.com/username
  const usernameMatch = trimmed.match(/facebook\.com\/([^/?#]+)/i);
  if (usernameMatch) {
    const name = usernameMatch[1];
    return `${name} (non-numeric)`;
  }

  return `${trimmed} (unrecognized)`;
}

export default function FindFbIdPage() {
  const [input, setInput] = useState("");

  const lines = input.split("\n");
  const results = lines.map((line) => (line.trim() ? extractFbId(line) : ""));
  const output = results.join("\n");

  const processed = lines.filter((l) => l.trim()).length;
  const stats = processed > 0 ? `${processed} URLs processed` : undefined;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Find Facebook ID</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Extract numeric IDs from Facebook profile URLs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Facebook URLs"
            value={input}
            onChange={setInput}
            placeholder={"https://facebook.com/profile.php?id=123456\nhttps://facebook.com/username\nhttps://facebook.com/100012345678"}
          />
          <ToolTextarea
            label="Extracted IDs"
            value={output}
            readOnly
            stats={stats}
            placeholder="Extracted IDs will appear here..."
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
