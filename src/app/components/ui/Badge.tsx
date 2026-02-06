"use client";
import { ReactNode, useState } from "react";

interface BadgeProps {
  label: string;
  icon?: ReactNode; // optional logo/icon
  className?: string;
}

export const Badge = ({ label, icon, className }: BadgeProps) => {
  return (
    <div
      className={`
        inline-flex items-center gap-1 px-3 py-1 rounded-lg
        border border-border bg-card text-sm text-muted-foreground 
        font-medium
        transition-all duration-200 hover:bg-primary/10 hover:text-foreground 
        hover:shadow-sm
        ${className ?? ""}
      `}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};


interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg z-50">
          {content}
        </div>
      )}
    </div>
  );
};
