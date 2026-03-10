"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Bookmarklet = {
  name: string;
  description: string;
  code: string;
};

const BOOKMARKLETS: Bookmarklet[] = [
  {
    name: "Copy All UIDs",
    description: "Extracts all numeric IDs (8+ digits) from the current page and copies them to clipboard.",
    code: `javascript:(function(){var ids=[...document.body.innerText.matchAll(/\\b\\d{8,}\\b/g)].map(m=>m[0]);var unique=[...new Set(ids)];navigator.clipboard.writeText(unique.join('\\n'));alert('Copied '+unique.length+' IDs');})();`,
  },
  {
    name: "Dark Mode Toggle",
    description: "Toggles a dark overlay on any website for easier reading in low light.",
    code: `javascript:(function(){var el=document.getElementById('__dm_overlay');if(el){el.remove();}else{var d=document.createElement('div');d.id='__dm_overlay';d.style.cssText='position:fixed;inset:0;background:#000;opacity:0.45;pointer-events:none;z-index:999999;mix-blend-mode:multiply;';document.body.appendChild(d);}})();`,
  },
  {
    name: "Clear Cookies",
    description: "Clears all cookies for the current domain. Useful for testing fresh sessions.",
    code: `javascript:(function(){document.cookie.split(';').forEach(function(c){document.cookie=c.trim().split('=')[0]+'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';});alert('Cookies cleared for '+location.hostname);})();`,
  },
  {
    name: "View Page Source",
    description: "Opens the current page's HTML source in a new browser tab.",
    code: `javascript:(function(){window.open('view-source:'+location.href,'_blank');})();`,
  },
  {
    name: "Scroll to Top / Bottom",
    description: "Adds floating buttons to quickly jump to the top or bottom of any page.",
    code: `javascript:(function(){if(document.getElementById('__scroll_btns'))return;var s=document.createElement('div');s.id='__scroll_btns';s.style.cssText='position:fixed;bottom:20px;right:20px;z-index:999999;display:flex;flex-direction:column;gap:6px;';s.innerHTML='<button onclick="window.scrollTo(0,0)" style="padding:8px 12px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">▲ Top</button><button onclick="window.scrollTo(0,document.body.scrollHeight)" style="padding:8px 12px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">▼ Bottom</button>';document.body.appendChild(s);})();`,
  },
  {
    name: "Highlight All Links",
    description: "Outlines all hyperlinks on the page in red so you can spot them easily.",
    code: `javascript:(function(){var links=document.querySelectorAll('a');links.forEach(function(a){a.style.outline='2px solid red';});alert('Highlighted '+links.length+' links');})();`,
  },
];

export function BookmarkletsContent() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Bookmarklet Scripts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Useful JavaScript bookmarklets for ad account management. Copy the code and save as a browser bookmark.
          </p>
        </div>

        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/40">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              <strong>How to use:</strong> Copy the code, create a new bookmark in your browser, paste the code as the URL, and click the bookmark on any page.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {BOOKMARKLETS.map((bm) => (
            <Card key={bm.name}>
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold">{bm.name}</h3>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        JS
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{bm.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-1.5"
                    onClick={() => copy(bm.name, bm.code)}
                  >
                    {copied === bm.name ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied === bm.name ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 text-[11px] font-mono text-muted-foreground whitespace-pre-wrap break-all">
                  <code>{bm.code}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolPageShell>
  );
}
