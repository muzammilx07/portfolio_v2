export interface ProjectSummary {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
}

export const projects: ProjectSummary[] = [
  {
    slug: "command-portfolio",
    title: "Command Portfolio",
    summary: "VS Code-inspired command palette with blazing fast search.",
    tags: ["Next.js", "TypeScript", "FlexSearch"],
  },
  {
    slug: "commerce-suite",
    title: "Commerce Suite",
    summary: "High-conversion storefront with server-first rendering.",
    tags: ["App Router", "Tailwind", "Stripe"],
  },
  {
    slug: "motion-dashboard",
    title: "Motion Dashboard",
    summary: "Real-time analytics with accessible motion design.",
    tags: ["GSAP", "Zustand", "Charts"],
  },
];
