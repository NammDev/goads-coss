"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ICONS = [
  "👍", "❤️", "😍", "😂", "😮", "😢", "😡", "🎉",
  "🔥", "💯", "✅", "⭐", "💪", "🚀", "💰", "📈",
  "🎯", "💡", "⚡", "🏆", "👏", "🙏", "💎", "🌟",
  "❌", "⚠️", "📌", "🔔", "💬", "📱",
];

export default function FbIconsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (icon: string) => {
    navigator.clipboard.writeText(icon);
    setCopied(icon);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(ICONS.join(" "));
    setCopied("__all__");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Facebook Icons</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Unicode emoji icons commonly used in social media marketing. Click to copy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={copyAll}>
            {copied === "__all__" ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied === "__all__" ? "Copied!" : "Copy All"}
          </Button>
          <span className="text-xs text-muted-foreground">{ICONS.length} icons</span>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => copy(icon)}
                  title={`Copy ${icon}`}
                  className="relative flex h-12 w-full items-center justify-center rounded-lg border border-transparent text-2xl transition-colors hover:border-border hover:bg-muted"
                >
                  {icon}
                  {copied === icon && (
                    <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 text-xs font-medium text-emerald-600">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageShell>
  );
}
