"use client";

import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const SIZE_OPTIONS = [256, 512, 1024] as const;
type ImageSize = (typeof SIZE_OPTIONS)[number];

function randomSeed() {
  return Math.floor(Math.random() * 1_000_000);
}

export default function RandomFacePage() {
  const [seed, setSeed] = useState<number>(randomSeed);
  const [size, setSize] = useState<ImageSize>(512);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const imgUrl = `https://i.pravatar.cc/${size}?u=${seed}`;

  const generate = () => {
    setLoading(true);
    setSeed(randomSeed());
    setCount((c) => c + 1);
  };

  const download = async () => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `random-face-${seed}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently fail
    }
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Random Face Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate random avatar photos instantly
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Card className="overflow-hidden">
            <img
              src={imgUrl}
              alt="Random face"
              width={size}
              height={size}
              className="block"
              style={{ width: 320, height: 320, objectFit: "cover" }}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </Card>

          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <Label className="text-xs">Image Size</Label>
              <div className="flex gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      size === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:bg-accent"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Faces generated:{" "}
              <span className="font-semibold text-foreground">{count}</span>
            </p>

            <div className="flex gap-2">
              <Button onClick={generate} disabled={loading} className="gap-1.5">
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Generate New Face
              </Button>
              <Button variant="outline" onClick={download} className="gap-1.5">
                <Download className="size-3.5" />
                Download
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Powered by pravatar.cc — random avatars, not real people.
            </p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  );
}
