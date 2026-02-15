import Link from "next/link";
import { Github, Globe } from "lucide-react";
import {
  SiDocker,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import Tooltip from "@/components/shared/Tooltip";
import PillLink from "../shared/PillLink";

const projects = [
  {
    slug: "notesbuddy",
    title: "NotesBuddy",
    summary:
      "Study platform with notes, flashcards, quizzes, an AI chatbot, and interactive learning tools.",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/notesbuddy",
    tech: ["Next.js", "TypeScript", "React", "Vercel", "Database", "Tailwind"],
    status: "Production Ready",
  },
  {
    slug: "forgeboard",
    title: "ForgeBoard",
    summary:
      "Collaborative kanban for teams with real-time boards, comments, and activity timelines.",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/forgeboard",
    tech: ["Next.js", "React", "TypeScript", "Vercel", "Postgres", "Tailwind"],
    status: "Active Development",
  },
  {
    slug: "atlasflow",
    title: "AtlasFlow",
    summary:
      "Workflow automation with triggers, scheduled runs, and visual pipelines.",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/atlasflow",
    tech: ["React", "TypeScript", "Node.js", "Redis", "Docker", "Tailwind"],
    status: "In Review",
  },
  {
    slug: "pulsewave",
    title: "PulseWave",
    summary: "Analytics dashboard with live KPIs, cohorts, and report exports.",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/pulsewave",
    tech: ["Next.js", "TypeScript", "React", "Vercel", "Charts", "Tailwind"],
    status: "Deployment Staged",
  },
];

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  React: SiReact,
  Vercel: SiVercel,
  Tailwind: SiTailwindcss,
  Postgres: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
};

export default function FeaturedProjects() {
  return (
    <section className="border-t border-l border-r border-dashed border-border text-foreground">
      <div className="flex flex-row">
        <div className="w-1/2 rounded-br-4xl border-b border-r border-dashed border-border px-6 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Featured Projects
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
        </div>
        <div className="w-1/2" />
      </div>

      <div className="mt-6 p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <div>
            <PillLink
              href="/projects"
              label="View All Projects"
              className="w-full px-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: (typeof projects)[number];
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex h-full flex-col gap-3 rounded-2xl border border-dashed border-border bg-background/70 p-4 transition-colors transition-transform duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)]">
      <div className="relative -mx-4 -mt-4 h-44 w-[calc(100%+2rem)] overflow-hidden rounded-t-2xl border-b border-dashed border-border">
        <div className="absolute inset-0 -rotate-1 bg-muted/30 transition-transform duration-300 group-hover:rotate-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-lg font-semibold text-foreground transition-colors group-hover:text-[color:var(--accent-icon-fg)]"
        >
          {project.title}
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground">
          <a
            href={project.liveUrl}
            aria-label="Live site"
            className="rounded-full border border-dashed border-border p-2 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:text-[color:var(--accent-icon-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={project.repoUrl}
            aria-label="GitHub repository"
            className="rounded-full border border-dashed border-border p-2 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent-hover-border)] hover:text-[color:var(--accent-icon-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{project.summary}</p>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Technologies
        </p>
        <div className="mt-2 flex items-center gap-2 overflow-x-auto">
          {project.tech.map((tech) => {
            const Icon = techIcons[tech];
            return (
              // eslint-disable-next-line react/jsx-key
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-border bg-muted/30 text-muted-foreground transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] hover:text-[color:var(--accent-icon-fg)]">
                {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                <span className="sr-only">{tech}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {project.status}
        </span>
        <div>
          <PillLink href={`/projects/${project.slug}`} label="View Details" className="w-full " />
        </div>
      </div>
    </div>
  );
}
