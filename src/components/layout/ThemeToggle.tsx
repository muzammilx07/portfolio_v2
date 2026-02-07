"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
  { id: "dark", label: "Dark", icon: Moon },
] as const;

interface ThemeToggleProps {
  className?: string;
}

const defaultTriggerClassName =
  "inline-flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-3 text-xs font-medium text-muted-foreground shadow-sm cursor-pointer motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // close when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // avoid hydration mismatch with resolvedTheme
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectTheme = (id: (typeof themes)[number]["id"]) => {
    setTheme(id);
    setOpen(false);
  };

  const CurrentIcon =
    resolvedTheme === "dark" ? Moon : resolvedTheme === "light" ? Sun : Monitor;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        className={`group ${className ?? defaultTriggerClassName}`}
      >
        <motion.span
          initial={false}
          animate={{ rotate: open ? 8 : 0, scale: open ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex h-5 w-5 items-center justify-center"
        >
          <CurrentIcon size={16} />
        </motion.span>
        <span className="hidden capitalize sm:inline">
          {mounted ? resolvedTheme : "theme"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-border bg-background/95 p-1 shadow-lg backdrop-blur"
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = mounted && resolvedTheme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitem"
                  onClick={() => selectTheme(t.id)}
                  className={`flex h-9 w-full items-center gap-2 rounded-xl px-2.5 text-xs font-medium cursor-pointer motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-border bg-background/60">
                    <Icon size={14} />
                  </span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
