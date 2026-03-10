"use client";

import { useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type IPInfo = {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  timezone: string;
};

async function fetchIP(): Promise<IPInfo> {
  const res = await fetch("https://ipinfo.io/json");
  return res.json();
}

export function CheckIpContent() {
  const [info, setInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchIP();
      setInfo(data);
    } catch {
      setInfo(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const copyIP = () => {
    if (info) navigator.clipboard.writeText(info.ip);
  };

  const rows = info
    ? [
        { label: "IP Address", value: info.ip, copyable: true },
        { label: "ISP / Org", value: info.org },
        { label: "City", value: info.city },
        { label: "Region", value: info.region },
        { label: "Country", value: info.country },
        { label: "Timezone", value: info.timezone },
      ]
    : [];

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <ToolsSidebarMobile />
            <h1 className="text-2xl font-semibold">IP Address Checker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View your current public IP and location info
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={load}>
            <RefreshCw className="size-3.5" />
            Refresh
          </Button>
        </div>

        <Card className="divide-y">
          {loading ? (
            <div className="space-y-4 p-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          ) : info ? (
            rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <span className="text-sm text-muted-foreground">
                  {row.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">
                    {row.value}
                  </span>
                  {row.copyable && (
                    <Button variant="ghost" size="sm" onClick={copyIP}>
                      <Copy className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Failed to fetch IP info. Please try again.
            </div>
          )}
        </Card>
      </div>
    </ToolPageShell>
  );
}
