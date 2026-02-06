"use client";

import type { ReactNode } from "react";

interface BadgeProps {
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ label, icon, className }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-foreground hover:shadow-sm ${
        className ?? ""
      }`}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      <span>{label}</span>
    </div>
  );
}
