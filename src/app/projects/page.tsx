import PageHeader from "@/components/shared/PageHeader";

export default function ProjectsPage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          title="Projects"
          description="Case studies and experiments built for speed and clarity."
        />
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Project archive coming soon.
        </div>
      </div>
    </section>
  );
}