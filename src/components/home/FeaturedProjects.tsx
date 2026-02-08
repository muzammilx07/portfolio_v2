import Link from "next/link";
import { projects } from "@/lib/data/projects";

export default function FeaturedProjects() {
  return (
    <section className="border border-dashed border-border flex flex-row mt-6">
      <div className="space-y-3 border-r border-dashed border-border">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-5 pt-12">
          Skills + Projects
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl px-5 pt-6">
          Building reliable systems with a sharp design eye.
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base px-5 pt-1">
          I focus on performance-first delivery and thoughtful interfaces. Here
          are a few recent builds and the tools I trust daily.
        </p>
        <div className="flex border-t border-dashed border-border pt-5">
          <div className="flex flex-wrap gap-2 p-6">
            {[
              "TypeScript",
              "Next.js",
              "React",
              "GSAP",
              "Zustand",
              "Tailwind",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-dashed border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] hover:text-[color:var(--accent-icon-fg)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 p-5 sm:p-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block bg-background/60 p-4 transition-colors border border-dashed border-border hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-dashed border-border px-2 py-0.5 transition-colors hover:border-[color:var(--accent-hover-border)] hover:text-[color:var(--accent-icon-fg)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
