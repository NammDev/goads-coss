"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";

type CookieObj = { name: string; value: string };

function convertLine(line: string): string | null {
  try {
    // Try parse JSON array of cookie objects
    const cookies: CookieObj[] = JSON.parse(line.trim());
    if (!Array.isArray(cookies)) return null;

    const cookieStr = cookies.map((c) => `${c.name}=${c.value}`).join(";");
    const cUser = cookies.find((c) => c.name === "c_user");
    const uid = cUser?.value ?? "";

    if (!uid || uid.length <= 3) return null;

    // Extract password if present after JSON (pipe or space separated)
    const afterJson = line.trim().replace(/^\[.*\]/, "").trim();
    const pass = afterJson.startsWith("|")
      ? afterJson.slice(1).split("|")[0]
      : "";

    return `${uid}|${pass}|${cookieStr}`;
  } catch {
    return null;
  }
}

export default function CookiePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const lines = input.split("\n").filter((l) => l.trim());
    const results: string[] = [];
    for (const line of lines) {
      const result = convertLine(line);
      if (result) results.push(result);
    }
    setOutput(results.join("\n"));
  };

  const inputCount = input.split("\n").filter((l) => l.trim()).length;
  const outputCount = output.split("\n").filter((l) => l.trim()).length;
  const stats =
    inputCount > 0 ? `Converted: ${outputCount}/${inputCount}` : undefined;

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Cookie Converter</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Convert JSON cookies to UID|Password|Cookie format
          </p>
        </div>

        <ToolTextarea
          label="Input (Cookie JSON, one per line)"
          value={input}
          onChange={setInput}
          placeholder={'[{"name":"c_user","value":"100012345"},{"name":"xs","value":"abc"}]'}
        />

        <Button onClick={convert} className="gap-1.5">
          <Play className="size-3.5" />
          Convert
        </Button>

        <ToolTextarea
          label="Output"
          value={output}
          readOnly
          stats={stats}
          placeholder="UID|Pass|Cookie results..."
        />
      </div>
    </ToolPageShell>
  );
}
