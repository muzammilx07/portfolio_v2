"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 24,
  start = "top 85%",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, once, start, y]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
