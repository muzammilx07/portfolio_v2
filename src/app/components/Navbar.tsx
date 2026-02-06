import Link from "next/link";
import Image from "next/image";
import ToggleTheme from "./ui/ToggleTheme";
import { Mail } from "lucide-react";
import Button from "./ui/Button";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resource" },
];

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Link href="/" className="group relative shrink-0">
            <Image
              src="/pr.webp"
              alt="Profile"
              width={50}
              height={50}
              priority
              className="
                rounded-lg
                border border-border
                bg-card
                transition-transform duration-150
                ease-out
                transform
                hover:scale-85
                active:scale-80
              "
            />
          </Link>

          <ul className="flex items-end gap-3 sm:gap-4 md:gap-6  text-xs sm:text-sm font-medium whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-foreground transition hover:text-muted-foreground "
                >
                  <span>{link.label}</span>
                  {/* underline */}
                  <span
                    className="
                    absolute left-0 -bottom-0.5 h-0.5 w-0 bg-foreground
                    transition-all duration-300
                    group-hover:w-full
                  "
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
          {/* Theme Toggle */}
          <ToggleTheme />
          {/* CTA */}
          <Button variant="secondary" icon={<Mail className="h-4 w-4" />}>
            Get in touch
          </Button>
        </div>
      </div>
    </nav>
  );
}
