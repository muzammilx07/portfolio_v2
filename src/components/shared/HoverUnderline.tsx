import { cn } from "@/lib/utils";

type HoverUnderlineProps = {
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
};

export default function HoverUnderline({
  children,
  className,
  underlineClassName,
}: HoverUnderlineProps) {
  return (
    <span className={cn("group relative inline-block", className)}>
      <span>{children}</span>
      <span
        className={cn(
          "absolute left-0 -bottom-0.5 h-px w-0 bg-foreground transition-[width] duration-300 group-hover:w-full",
          underlineClassName
        )}
      />
    </span>
  );
}
