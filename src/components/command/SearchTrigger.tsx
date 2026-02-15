"use client";

import { useCommandStore } from "@/lib/store/commandStore";

interface Props {
  className?: string;
}

export default function SearchTrigger({ className }: Props) {
  const open = useCommandStore((state) => state.open);

  return (
  <button
    onClick={open}
    aria-label="Open search"
    className="group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border/70 bg-muted/30 px-3 text-xs font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] hover:text-[color:var(--accent-icon-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    Search
    <kbd className="ml-2 rounded-md border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
      Ctrl K
    </kbd>
  </button>
);

}