import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const navPillBase =
  "inline-flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-3 text-xs font-medium text-muted-foreground shadow-sm cursor-pointer motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b  border-border/70 bg-background/80 text-foreground backdrop-blur-xl shadow-sm"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground"
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
                  className="relative text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${navPillBase} group relative hidden gap-3 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-10 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent before:content-[''] motion-safe:before:transition-transform motion-safe:before:duration-500 hover:before:translate-x-[220%] md:flex`}
            aria-label="Open search"
          >
            <span className="motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none group-hover:translate-x-[1px]">
              Search
            </span>
            <span className="rounded border border-border/80 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none group-hover:-translate-y-[1px] group-hover:text-foreground">
              Ctrl K
            </span>
          </button>
          <ThemeToggle className={navPillBase} />
        </div>
      </div>
    </nav>
  );
}
