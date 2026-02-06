import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border bg-background/90 text-foreground backdrop-blur"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground"
          aria-label={`${siteConfig.name} home`}
        >
          
          <span>{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <ul className="hidden items-center gap-4 text-sm font-medium md:flex">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-muted-foreground transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="hidden items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition hover:bg-muted md:flex"
            aria-label="Open search"
          >
            <span>Search</span>
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Ctrl K
            </span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
