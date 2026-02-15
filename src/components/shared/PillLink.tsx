import Link from "next/link";
import { cn } from "@/lib/utils";

export const pillLinkBaseClass =
  "group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border/70 bg-muted/30 px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] hover:text-[color:var(--accent-icon-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type PillLinkProps = {
  href: string;
  label: string;
  className?: string;
  suffix?: string;
};

export default function PillLink({
  href,
  label,
  className,
  suffix = "→",
}: PillLinkProps) {
  return (
    <Link
      href={href}
      className={cn(pillLinkBaseClass, className)}
    >
      <span className="motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-[1px]">
        {label}
        {suffix ? ` ${suffix}` : ""}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent bg-[length:200%_100%] bg-[position:0%_0%] transition-[background-position] duration-500 group-hover:bg-[position:100%_0%]" />
    </Link>
  );
}
