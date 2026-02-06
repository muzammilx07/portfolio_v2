import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export default function Button({
  children,
  className,
  variant = "primary",
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 sm:px-4 sm:py-1.5 sm:text-sm",
        variant === "primary" &&
          "bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90",
        variant === "secondary" &&
          "bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && (
        <span className="flex items-center">{icon}</span>
      )}
    </button>
  );
}
