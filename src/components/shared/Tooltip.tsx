import { cn } from "@/lib/utils";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 scale-95 rounded-md border border-dashed border-border bg-background/95 px-2 py-1 text-[10px] text-muted-foreground opacity-0 shadow-sm transition-opacity transition-transform duration-200 group-hover:scale-100 group-hover:opacity-100">
        {label}
      </span>
    </span>
  );
}
