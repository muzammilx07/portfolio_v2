"use client";

import { useState } from "react";
import { Linkedin, Link2, X } from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const experiences = [
  {
    role: "Frontend Engineer",
    company: "Nimbus Studio",
    dates: "Jan 2024 - Present",
    location: "Remote",
    status: "Currently Shipping",
    summary:
      "Lead UI systems for a multi-tenant dashboard with performance budgets and design tokens.",
    highlights: [
      "Built component library used across 4 products",
      "Reduced bundle size by 22% with route-level splitting",
    ],
    stack: ["React", "TypeScript", "Next.js", "Tailwind", "Git"],
  },
  {
    role: "UI Engineer",
    company: "Pixel Harbor",
    dates: "May 2021 - May 2022",
    location: "Remote",
    status: "Archived",
    summary:
      "Crafted marketing and product pages with strong accessibility and SEO.",
    highlights: [
      "Set up design QA checklist and page audits",
      "Created motion system for product launches",
    ],
    stack: ["React", "Tailwind", "Git"],
  },
];

const stackIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  Tailwind: SiTailwindcss,
  Postgres: SiPostgresql,
  Docker: SiDocker,
  Git: SiGit,
};

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-l border-r border-dashed border-border text-foreground">
      <div className="flex flex-row">
        <div className="w-1/2 rounded-br-4xl border-b border-r border-dashed border-border px-6 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience
          </h2>
        </div>
        <div className="w-1/2" />
      </div>

      <div className="mt-6 p-5 sm:p-6">
        <div className="grid gap-4">
          {experiences.map((item, index) => {
            const isOpen = openIndex === index;
            const detailsId = `experience-${index}-details`;

            return (
              <article
                key={`${item.company}-${item.role}`}
                className="group relative flex h-full flex-col gap-3 rounded-2xl border border-dashed border-border bg-background/70 p-4 transition-colors transition-transform duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-xs font-semibold text-foreground">
                      {item.company.slice(0, 2)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {item.company}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{item.dates}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                {isOpen ? (
                  <div id={detailsId} className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {item.summary}
                    </p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>• {highlight}</li>
                      ))}
                    </ul>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Skills
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.stack.map((tech) => {
                          const Icon = stackIcons[tech];
                          return (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-[color:var(--accent-hover-border)] group-hover:text-[color:var(--accent-icon-fg)]"
                            >
                              {Icon ? (
                                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              ) : null}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Skills
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map((tech) => {
                        const Icon = stackIcons[tech];
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-[color:var(--accent-hover-border)] group-hover:text-[color:var(--accent-icon-fg)]"
                          >
                            {Icon ? (
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : null}
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-dashed border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] hover:text-[color:var(--accent-icon-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isOpen ? "Collapse" : "Expand"} Details →
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
