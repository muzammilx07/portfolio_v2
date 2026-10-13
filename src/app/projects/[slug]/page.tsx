import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  CheckCircle2,
  Clock,
  Calendar,
  Terminal,
} from "lucide-react";
import { projects } from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} — Muzammil Shareef`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    notFound();
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="space-y-10 pb-16">
      <div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to all projects</span>
        </Link>
      </div>

      <header className="space-y-4 pb-8 border-b border-divider">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="rounded bg-muted px-2 py-0.5 text-foreground font-medium">
            {project.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>{project.readTime}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span className="tabular-nums">{project.year}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {project.status}
          </span>
        </div>

        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl leading-snug">
          {project.title}
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          {project.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <Github className="size-3.5" />
              <span>View on GitHub</span>
              <ArrowUpRight className="size-3 opacity-70" />
            </a>
          )}

          {project.liveUrl && project.liveUrl !== project.repoUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <span>Live Application</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </a>
          )}
        </div>
      </header>

      <section className="grid grid-cols-3 gap-3 rounded-xl border border-divider bg-card/60 p-4 text-center">
        {project.metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <p className="text-lg font-mono font-medium tracking-tight text-foreground sm:text-xl tabular-nums">
              {m.value}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8 text-sm leading-relaxed text-foreground/90 font-normal">
        <div className="space-y-2">
          <h2 className="text-base font-medium text-foreground">1. Architecture Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2 rounded-xl border border-divider bg-card/40 p-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span>The Bottleneck</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>

          <div className="space-y-2 rounded-xl border border-divider bg-card/40 p-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{project.solution}</p>
          </div>
        </div>

        {project.codeSnippet && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Terminal className="size-3.5 text-foreground" />
                <span className="text-foreground font-medium">Core Implementation</span>
              </span>
              <span>Source extract</span>
            </div>
            <div className="rounded-xl border border-divider bg-zinc-950 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
              <pre className="leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <h2 className="text-base font-medium text-foreground">2. Engineering Highlights</h2>
          <ul className="space-y-2.5">
            {project.keyFeatures.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-medium text-foreground">3. System & Runtime Guarantees</h2>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {project.architectureHighlights.map((hl) => (
                <li key={hl} className="flex items-start gap-2">
                  <span className="text-foreground font-mono">→</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-divider">
          <h3 className="text-xs font-mono uppercase text-muted-foreground">Tech Stack</h3>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-divider bg-muted/50 px-2.5 py-1 text-[11px] font-mono text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="pt-8 border-t border-divider flex items-center justify-between gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col text-left transition-colors"
          >
            <span className="text-[10px] font-mono uppercase text-muted-foreground">← Previous Project</span>
            <span className="text-sm font-medium text-foreground group-hover:underline">
              {prevProject.title.split(" // ")[0]}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col text-right transition-colors"
          >
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Next Project →</span>
            <span className="text-sm font-medium text-foreground group-hover:underline">
              {nextProject.title.split(" // ")[0]}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  );
}
