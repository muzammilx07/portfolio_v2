"use client";

const stackGroups = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "HTML5/CSS3"],
  },
  {
    category: "Frameworks & UI",
    items: [
      "React.js",
      "Next.js (App Router)",
      "FastAPI",
      "Spring Boot",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "WebGL",
    ],
  },
  {
    category: "GenAI & ML",
    items: [
      "LLM Workflows",
      "OpenAI API",
      "Gemini API",
      "Prompt Pipelines",
      "scikit-learn",
      "XGBoost",
      "Isolation Forest",
      "Vector Embeddings",
    ],
  },
  {
    category: "Databases & ORM",
    items: ["PostgreSQL", "MongoDB", "Firebase", "Prisma ORM", "SQLAlchemy", "Hibernate/JPA"],
  },
  {
    category: "Core & Systems",
    items: [
      "Data Structures & Algorithms (300+ Solved)",
      "Microservices Architecture",
      "RESTful APIs",
      "WebSockets",
      "Distributed Systems",
      "OOP / DBMS",
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Vite",
      "Postman",
      "Maven",
      "Linux",
      "Vercel",
    ],
  },
];

export default function SkillsShowcase() {
  return (
    <section className="space-y-4 pb-10 sm:pb-14 border-t border-divider pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-normal text-muted-foreground">
          Tech Stack
        </h2>
        <span className="text-xs font-mono text-muted-foreground">
          Specializations
        </span>
      </div>

      <dl className="space-y-3.5 text-sm">
        {stackGroups.map((group) => (
          <div
            key={group.category}
            className="group flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 -mx-2 px-2 py-1.5 rounded-lg transition-colors hover:bg-muted/30"
          >
            <dt className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
              {group.category}
            </dt>
            <dd className="min-w-0 flex-1 text-foreground/90 font-normal">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>

      {/* Education & Achievements Highlight */}
      <div className="pt-6 mt-6 border-t border-divider/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Education & Honors
          </h3>
          <span className="text-[11px] font-mono text-emerald-500 dark:text-emerald-400">
            300+ DSA Problems
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="rounded-lg border border-divider/80 bg-card/50 p-3 space-y-1">
            <div className="font-semibold text-foreground">
              B.Tech in Computer Science
            </div>
            <div className="text-muted-foreground">
              JNTU Hyderabad · 2022 – Dec 2026
            </div>
            <div className="text-[11px] text-emerald-500 font-medium">
              GPA: 8.2 / 10
            </div>
          </div>

          <div className="rounded-lg border border-divider/80 bg-card/50 p-3 space-y-1">
            <div className="font-semibold text-foreground">
              Hackathon & Competitive Honors
            </div>
            <div className="text-muted-foreground">
              Ranked 2nd at Codeathon Hackathon
            </div>
            <div className="text-[11px] text-muted-foreground/80">
              Active Geekathon Builder · Geekster MERN Certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
