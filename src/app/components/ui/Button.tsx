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
        `
        inline-flex items-center justify-center gap-2
        px-3 sm:px-4
        py-1 sm:py-1.5
        rounded-lg
        text-xs sm:text-sm
        font-medium
        border
        transition-all
        duration-200
        hover:-translate-y-0.5
        `,
        variant === "primary" &&
          `
          bg-primary
          text-primary-foreground
          border-primary/20
          hover:bg-primary/90
          `,
        variant === "secondary" &&
          `
          bg-muted/40
          text-muted-foreground
          border-border
          hover:bg-muted
          hover:text-foreground
          `,
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
