import PageHeader from "@/components/shared/PageHeader";

export default function ContactPage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          title="Contact"
          description="Lets talk about your next product, launch, or redesign."
        />
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Contact form coming soon.
        </div>
      </div>
    </section>
  );
}