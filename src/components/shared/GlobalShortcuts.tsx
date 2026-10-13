"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useCommandStore } from "@/lib/store/commandStore";

export default function GlobalShortcuts() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { isOpen, open, close } = useCommandStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle theme with Alt+T
      if (e.altKey && (e.key.toLowerCase() === "t" || e.code === "KeyT")) {
        e.preventDefault();
        const current = resolvedTheme || theme;
        setTheme(current === "dark" ? "light" : "dark");
        return;
      }

      // Command menu with Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, isOpen, open, resolvedTheme, setTheme, theme]);

  return null;
}

