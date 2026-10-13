"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data/projects";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-divider pb-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Selected Projects{" "}
          <span className="font-serif italic text-xs lowercase text-muted-foreground/80 font-normal">
            — engineering case studies
          </span>
        </h2>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <span>View all ({projects.length})</span>
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {featured.map((project) => (
          <div
            key={project.slug}
            className="group relative rounded-xl border border-divider bg-card/40 p-4 transition-all duration-200 hover:border-border hover:bg-card hover:shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-foreground text-sm hover:underline"
                  >
                    {project.title}
                  </Link>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {project.summary}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted/70 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-0.5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                    title="GitHub Repository"
                  >
                    <Github className="size-4" />
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                  title="Read Case Study"
                >
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
