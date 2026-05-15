"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { ToolPageShell } from "@/app/_legacy-tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";

type UIDResult = { uid: string; status: "LIVE" | "DEAD" };

async function checkUID(uid: string): Promise<UIDResult> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/${uid}/picture?redirect=false`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return { uid, status: "DEAD" };
    const data = await res.json();
    const url: string = data?.data?.url ?? "";
    const isDefault =
      !url ||
      url.includes("static") ||
      url.includes("defaultprofile") ||
      url.includes("silhouette");
    return { uid, status: isDefault ? "DEAD" : "LIVE" };
  } catch {
    return { uid, status: "DEAD" };
  }
}

export function CheckUidContent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<string | undefined>();

  const handleCheck = async () => {
    const uids = input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (!uids.length) return;

    setLoading(true);
    setOutput("");
    setStats(undefined);

    const results: UIDResult[] = [];

    for (let i = 0; i < uids.length; i++) {
      setProgress(`Checking ${i + 1}/${uids.length}...`);
      const result = await checkUID(uids[i]);
      results.push(result);
      setOutput(results.map((r) => `${r.uid} | ${r.status}`).join("\n"));
      if (i < uids.length - 1) {
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    const live = results.filter((r) => r.status === "LIVE").length;
    const dead = results.length - live;
    setStats(`${live} live, ${dead} dead out of ${results.length} total`);
    setProgress("");
    setLoading(false);
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <ToolsSidebarMobile />
            <h1 className="text-2xl font-semibold">Check Live UID</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Check if Facebook UIDs are live or dead accounts
            </p>
          </div>
          <Button
            onClick={handleCheck}
            disabled={loading || !input.trim()}
            className="gap-1.5 shrink-0"
          >
            <Play className="size-3.5" />
            {loading ? progress || "Checking..." : "Check UIDs"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolTextarea
            label="Facebook UIDs (one per line)"
            value={input}
            onChange={setInput}
            placeholder={"100012345678\n100098765432\n100011112222"}
          />
          <ToolTextarea
            label="Results"
            value={output}
            readOnly
            stats={stats}
            placeholder="Results will appear here: UID | LIVE or UID | DEAD"
          />
        </div>
      </div>
    </ToolPageShell>
  );
}
