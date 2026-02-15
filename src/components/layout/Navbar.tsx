import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SearchButton from "@/components/command/SearchButton";
import SearchModal from "@/components/command/SearchModal";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import HoverUnderline from "@/components/shared/HoverUnderline";
import PillLink, { pillLinkBaseClass } from "@/components/shared/PillLink";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-dashed border-border/70 bg-background/80 text-foreground backdrop-blur-xl shadow-sm"
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
                  className="rounded-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <HoverUnderline
                    className="text-muted-foreground transition-colors hover:text-[color:var(--accent-icon-fg)]"
                    underlineClassName="-bottom-2 bg-foreground/70 group-hover:bg-[color:var(--accent-icon-fg)]"
                  >
                    {link.label}
                  </HoverUnderline>
                </Link>
              </li>
            ))}
          </ul>
          <SearchButton
            className={`${pillLinkBaseClass} hidden gap-3 md:flex`}
          />
         
          <ThemeToggle className={pillLinkBaseClass} />
        </div>
      </div>
      <SearchModal />
    </nav>
  );
}
