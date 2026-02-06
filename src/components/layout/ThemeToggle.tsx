"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isDark = useMemo(() => {
    if (theme === "system") {
      return resolvedTheme === "dark";
    }

    return theme === "dark";
  }, [resolvedTheme, theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground",
        "transition-colors hover:bg-accent",
      )}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-200",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-200",
          isDark ? "scale-100 opacity-100" : "scale-0 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
