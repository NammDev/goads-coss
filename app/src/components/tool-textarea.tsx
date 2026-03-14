"use client";

import { useRef } from "react";
import { Clipboard, Download, Trash2, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ToolTextareaProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  label?: string;
  /** Show line count badge */
  showLineCount?: boolean;
  /** Stats text displayed next to label (e.g. "Converted: 2/3") */
  stats?: string;
  className?: string;
  rows?: number;
};

/** Count non-empty lines */
function countLines(text: string): number {
  if (!text.trim()) return 0;
  return text.split("\n").filter((l) => l.trim()).length;
}

export function ToolTextarea({
  value,
  onChange,
  placeholder,
  readOnly = false,
  label,
  showLineCount = true,
  stats,
  className,
  rows = 10,
}: ToolTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange?.(text);
    } catch {
      textareaRef.current?.focus();
      document.execCommand("paste");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
  };

  const handleClear = () => onChange?.("");

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goads-tools-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = countLines(value);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Header: label + stats */}
      {(label || stats) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {stats && (
            <span className="text-xs text-muted-foreground">{stats}</span>
          )}
        </div>
      )}

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          className={cn(
            "w-full rounded-lg border-2 border-border bg-background px-3 py-2.5 text-sm font-mono",
            "placeholder:text-muted-foreground/70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "resize-y min-h-[120px]",
            readOnly && "bg-muted/30 cursor-default"
          )}
        />
        {showLineCount && (
          <span className="absolute bottom-2 right-3 text-xs text-muted-foreground pointer-events-none">
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        )}
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-1.5">
        {!readOnly && (
          <>
            <ActionButton
              icon={Clipboard}
              label="Paste"
              shortcut="Ctrl+V"
              onClick={handlePaste}
            />
            <ActionButton
              icon={Trash2}
              label="Clear"
              shortcut="Ctrl+K"
              onClick={handleClear}
            />
          </>
        )}
        {(readOnly || value) && (
          <>
            <ActionButton
              icon={Copy}
              label="Copy"
              shortcut="Ctrl+C"
              onClick={handleCopy}
            />
            <ActionButton
              icon={Download}
              label="Download"
              onClick={handleDownload}
            />
          </>
        )}
      </div>
    </div>
  );
}

/** Small icon button with tooltip */
function ActionButton({
  icon: Icon,
  label,
  shortcut,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: string;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={onClick}>
          <Icon className="size-3.5" />
          {label}
        </Button>
      </TooltipTrigger>
      {shortcut && (
        <TooltipContent>
          <kbd className="text-xs">{shortcut}</kbd>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
