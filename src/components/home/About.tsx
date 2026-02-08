import Image from "next/image";
import {
  SiDailydotdev,
  SiGithub,
  SiJavascript,
  SiLinkedin,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiX,
} from "react-icons/si";
import { ArrowUpRight, Sparkles } from "lucide-react";

const skills = [
  { label: "React", Icon: SiReact },
  { label: "JavaScript", Icon: SiJavascript },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "Tailwind", Icon: SiTailwindcss },
];

const socials = [
  {
    label: "X (formerly Twitter)",
    handle: "@iammcadi",
    href: "https://x.com/iammcadi",
    Icon: SiX,
  },
  {
    label: "GitHub",
    handle: "ncdai",
    href: "https://github.com/ncdai",
    Icon: SiGithub,
  },
  {
    label: "LinkedIn",
    handle: "ncdai",
    href: "https://www.linkedin.com/in/ncdai",
    Icon: SiLinkedin,
  },
  {
    label: "daily.dev",
    handle: "@ncdai",
    href: "https://app.daily.dev/ncdai",
    Icon: SiDailydotdev,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-l border-r border-dashed border-border text-foreground"
    >
      <div className="flex flex-row">
        <div className="w-1/2 rounded-br-4xl border-b border-r border-dashed border-border px-6 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Me
          </h2>
        </div>
        <div className="w-1/2" />
      </div>

      <div className="mt-6 flex gap-0 rounded-2xl border-t border-dashed border-border text-foreground">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-3 border-b border-dashed border-border pb-4">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Muzammil Shareef
            </h3>
            <Sparkles className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            I am a full stack web developer and open source contributor. I focus
            on building MVPs and performance-first products with clean,
            pragmatic UX.
          </p>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Skills
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 ">
              {skills.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-dashed border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Connect
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {socials.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-[color:var(--accent-icon-border)] bg-[color:var(--accent-icon-bg)] text-[color:var(--accent-icon-fg)] shadow-[0_0_0_1px_rgba(251,191,36,0.15)] transition-transform duration-200 motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:-rotate-2">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {handle}
                      </span>
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--accent-arrow-fg)] transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
