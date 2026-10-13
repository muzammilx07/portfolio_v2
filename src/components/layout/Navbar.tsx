"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "@/components/command/SearchModal";
import { useCommandStore } from "@/lib/store/commandStore";
import { navigation } from "@/config/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const openSearch = useCommandStore((state) => state.open);

  return (
    <>
      <nav
        className="flex items-center justify-between py-5 text-sm"
        aria-label="Main Navigation"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-90 active:scale-95"
          aria-label="Home"
        >
          <div className="flex h-7 items-center gap-1.5 rounded-lg border border-divider bg-card/70 px-2 py-1 shadow-2xs transition-all duration-200 group-hover:border-foreground/30 group-hover:bg-muted/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wider text-foreground text-[11px]">MS</span>
          </div>
          <span className="text-[10px] tracking-widest text-muted-foreground/70 uppercase">
            // 07
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 text-xs font-normal text-muted-foreground sm:gap-5 sm:text-sm">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-foreground ${
                      isActive
                        ? "text-foreground font-medium underline underline-offset-6 decoration-1 decoration-foreground"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 border-l border-divider pl-3">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search site (Cmd+K)"
              className="flex items-center gap-1.5 h-8 px-2 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              title="Search site (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden sm:inline-block text-[10px] font-mono rounded border border-divider px-1 text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </nav>
      <SearchModal />
    </>
  );
}
