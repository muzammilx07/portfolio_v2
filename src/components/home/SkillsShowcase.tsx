import { Badge } from "@/components/ui/Badge";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "GSAP",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Zustand",
];

export default function SkillsShowcase() {
  return (
    <section className="bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Stack
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Focused, performance-first tooling
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} label={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
