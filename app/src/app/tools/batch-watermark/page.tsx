"use client";

import { useRef, useState } from "react";
import { Download, ImagePlus, Play, Trash2 } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type ImageFile = { file: File; url: string };

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "center",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;
type Position = (typeof POSITIONS)[number];

/** Draw watermark text on a canvas and return blob URL */
function applyWatermark(
  img: HTMLImageElement,
  text: string,
  fontSize: number,
  color: string,
  opacity: number,
  position: Position
): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;

  // Draw original image
  ctx.drawImage(img, 0, 0);

  // Configure watermark
  ctx.globalAlpha = opacity / 100;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = color;

  const metrics = ctx.measureText(text);
  const textW = metrics.width;
  const textH = fontSize;
  const pad = 20;

  // Calculate position
  let x = pad;
  let y = textH + pad;

  if (position.includes("center") && !position.includes("top") && !position.includes("bottom")) {
    x = (canvas.width - textW) / 2;
    y = (canvas.height + textH) / 2;
  } else {
    if (position.includes("right")) x = canvas.width - textW - pad;
    else if (position.includes("center")) x = (canvas.width - textW) / 2;

    if (position.includes("bottom")) y = canvas.height - pad;
    else if (position.includes("top")) y = textH + pad;
  }

  ctx.fillText(text, x, y);
  return canvas.toDataURL("image/png");
}

export default function BatchWatermarkPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [text, setText] = useState("GoAds.shop");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    setResults([]);
  };

  const removeImage = (idx: number) => {
    URL.revokeObjectURL(images[idx].url);
    setImages(images.filter((_, i) => i !== idx));
    setResults([]);
  };

  const apply = async () => {
    const processed: string[] = [];
    for (const img of images) {
      const el = new Image();
      el.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        el.onload = () => resolve();
        el.src = img.url;
      });
      const result = applyWatermark(el, text, fontSize, color, opacity, position);
      processed.push(result);
    }
    setResults(processed);
  };

  const downloadAll = () => {
    results.forEach((dataUrl, i) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `watermarked-${i + 1}.png`;
      a.click();
    });
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Batch Watermark</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add watermark to multiple images at once
          </p>
        </div>

        {/* Watermark settings */}
        <Card className="space-y-4 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Watermark Text</Label>
              <Input value={text} onChange={(e) => setText(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Font Size (px)</Label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="h-8 text-xs flex-1" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Opacity: {opacity}%</Label>
              <Slider
                value={[opacity]}
                onValueChange={([v]) => setOpacity(v)}
                max={100}
                step={5}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Position</Label>
            <div className="flex flex-wrap gap-1.5">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`rounded-md border px-2.5 py-1 text-xs capitalize transition-colors ${
                    position === pos
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {pos.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Upload area */}
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 rounded bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="size-3 text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ImagePlus className="size-6" />
              <span className="text-xs">Add Images</span>
            </button>
          </div>
          {images.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {images.length} image{images.length > 1 ? "s" : ""} loaded
            </p>
          )}
        </div>

        {/* Actions */}
        {images.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={apply} className="gap-1.5">
              <Play className="size-3.5" />
              Apply Watermark
            </Button>
            {results.length > 0 && (
              <Button variant="outline" className="gap-1.5" onClick={downloadAll}>
                <Download className="size-3.5" />
                Download All
              </Button>
            )}
          </div>
        )}

        {/* Preview results */}
        {results.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs">Preview</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((dataUrl, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg border">
                  <img src={dataUrl} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
