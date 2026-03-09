"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <button
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border-transparent text-sm font-medium transition-all hover:bg-primary/15 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
      onClick={toggleTheme}
      type="button"
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <MoonStar className="hidden size-4 dark:block" aria-hidden="true" />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}
