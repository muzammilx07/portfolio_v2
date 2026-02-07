"use client";

import { useCommandStore } from "@/lib/store/commandStore";

interface SearchButtonProps {
  className?: string;
}

export default function SearchButton({ className }: SearchButtonProps) {
  const open = useCommandStore((state) => state.open);

  return (
    <button
      type="button"
      className={className}
      aria-label="Open search"
      onClick={open}
    >
      <span className="motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none group-hover:translate-x-[1px]">
        Search
      </span>
      <span className="rounded border border-border/80 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none group-hover:-translate-y-[1px] group-hover:text-foreground">
        Ctrl K
      </span>
    </button>
  );
}
