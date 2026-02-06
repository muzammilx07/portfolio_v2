import Link from "next/link";
import { projects } from "@/lib/data/projects";

export default function FeaturedProjects() {
  return (
    <section className="bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="grid gap-5 rounded-2xl bg-card p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Skills + Projects
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Building reliable systems with a sharp design eye.
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              I focus on performance-first delivery and thoughtful interfaces.
              Here are a few recent builds and the tools I trust daily.
            </p>
            <div className="flex flex-wrap gap-2">
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
                  className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block rounded-xl bg-background/60 p-4 transition hover:bg-background"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2 py-0.5"
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
        </div>
      </div>
    </section>
  );
}
