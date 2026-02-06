import Button from "@/components/ui/Button";

const projects = [
  {
    title: "Portfolio System",
    description: "Command-first portfolio experience with fast search.",
  },
  {
    title: "Ecommerce Platform",
    description: "Scalable storefront with a performance-first core.",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Featured
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Selected Projects
            </h2>
          </div>
          <Button variant="secondary">View all</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>
              <Button variant="secondary" className="mt-4">
                View case study
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
