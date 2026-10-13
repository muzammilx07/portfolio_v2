"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { projects } from "@/lib/data/projects";

type CategoryFilter =
  | "All"
  | "AI & Systems"
  | "Computer Vision"
  | "Full-Stack & Cloud"
  | "DevTools & Motion";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="A curated catalog of systems engineering, computer vision, developer tools, and tactile web experiments."
      />

      {/* Filter Tabs (ramx.in unique pattern) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
        {(
          [
            "All",
            "AI & Systems",
            "Computer Vision",
            "Full-Stack & Cloud",
            "DevTools & Motion",
          ] as const
        ).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? "bg-foreground text-background font-semibold"
                : "border border-divider text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="divide-y divide-divider">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 -mx-3 px-3 py-4 rounded-xl transition-colors hover:bg-muted/40"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium text-foreground hover:underline underline-offset-4"
                >
                  {project.title}
                </Link>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {project.year}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/80 rounded border border-divider px-1.5 py-0.5">
                  {project.category}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded border border-divider px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1 sm:pt-0 shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} source code`}
                  className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                  title="Source code"
                >
                  <Github className="size-4" />
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`${project.title} case study`}
                className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                title="Read Case Study"
              >
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
