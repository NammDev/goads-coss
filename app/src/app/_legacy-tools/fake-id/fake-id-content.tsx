"use client";

import { useRef, useState } from "react";
import { Download, IdCard } from "lucide-react";

import { ToolPageShell } from "@/app/_legacy-tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { type Country, type IDFields, renderIDCard } from "./id-canvas-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function randomID(country: Country): string {
  const digits = () => Math.floor(Math.random() * 9e8 + 1e8).toString();
  if (country === "us") return `D${Math.floor(Math.random() * 1e7)}`;
  if (country === "ph") return digits();
  return `${digits()} ${digits().slice(0, 4)} ${digits().slice(0, 4)}`;
}

export function FakeIdContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>("us");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const generate = () => {
    if (!canvasRef.current) return;
    const fields: IDFields = {
      country,
      fullName,
      dob,
      gender,
      address,
      idNumber: idNumber || randomID(country),
    };
    renderIDCard(canvasRef.current, fields);
    setPreview(canvasRef.current.toDataURL("image/png"));
  };

  const download = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `fake-id-${country}.png`;
    a.click();
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Fake ID Card Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            For testing/educational purposes only. Generated images are not real documents.
          </p>
        </div>

        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="py-3 px-4 text-xs text-warning">
            Disclaimer: This tool generates fictional ID card images for UI testing and
            educational purposes only. Do not use generated images to deceive or impersonate.
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Country / Document Type</Label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="us">🇺🇸 US — California Driver License</option>
                <option value="ph">🇵🇭 Philippines — National ID</option>
                <option value="in">🇮🇳 India — Aadhaar Card</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Michael Doe"
                className="h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Date of Birth</Label>
                <Input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="01/15/1990"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Gender</Label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="M">M — Male</option>
                  <option value="F">F — Female</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Los Angeles, CA 90001"
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">ID Number (leave blank to auto-generate)</Label>
              <Input
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Auto-generated"
                className="h-9 text-sm font-mono"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <Button onClick={generate} className="gap-1.5">
                <IdCard className="size-3.5" />
                Generate ID Card
              </Button>
              {preview && (
                <Button variant="outline" onClick={download} className="gap-1.5">
                  <Download className="size-3.5" />
                  Download PNG
                </Button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-xs">Preview</Label>
            {preview ? (
              <img
                src={preview}
                alt="Generated ID card"
                className="w-full rounded-lg border shadow-sm"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground">
                Fill in the form and click Generate
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolPageShell>
  );
}
