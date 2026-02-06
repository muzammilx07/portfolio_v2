import Link from "next/link";
import { socialLinks } from "@/lib/data/social";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Muzammil. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
