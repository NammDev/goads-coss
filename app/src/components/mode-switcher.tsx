"use client";

import { Circle } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <button
      className="relative inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={toggleTheme}
      title="Toggle theme"
      type="button"
    >
      <Circle className="-rotate-45 size-4 fill-current" strokeWidth={0} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
