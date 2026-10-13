"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FooterPet from "@/components/shared/FooterPet";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-20 border-t border-divider pt-8 pb-16 text-xs text-muted-foreground">
      {/* Interactive NiteshSeram-Style Vector Companion */}
      <FooterPet />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-0.5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            LOCAL TIME // HYDERABAD, IN
          </p>
          <div className="flex items-center gap-2 font-mono tabular-nums text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">{localTime || "17:30:00"}</span>
            <span className="text-[10px] text-muted-foreground">IST (UTC+5:30)</span>
          </div>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="mailto:muzammilxshareef@gmail.com"
            className="craft-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <span>Email</span>
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href="https://github.com/muzammilx07"
            target="_blank"
            rel="noreferrer noopener"
            className="craft-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href="https://www.linkedin.com/in/muzammil633"
            target="_blank"
            rel="noreferrer noopener"
            className="craft-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href="https://x.com/itsShareef63"
            target="_blank"
            rel="noreferrer noopener"
            className="craft-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <span>X</span>
            <ArrowUpRight className="size-3" />
          </a>
          <Link
            href="/contact"
            className="craft-link text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-divider/60 pt-4 text-[11px] text-muted-foreground/75">
        <p>
          © {new Date().getFullYear()} Mohammed Muzammil Shareef.{" "}
          <span className="font-serif italic text-foreground/80 ml-1">
            Crafted with restraint & precision.
          </span>
        </p>
        <p className="font-mono text-[10px]">
          <kbd className="rounded border border-divider px-1.5 py-0.5">Cmd+K</kbd> Search ·{" "}
          <kbd className="rounded border border-divider px-1.5 py-0.5">Alt+T</kbd> Theme
        </p>
      </div>
    </footer>
  );
}
