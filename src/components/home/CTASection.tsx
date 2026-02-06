import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Collaboration
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Lets build something that performs
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Ready for a launch-ready product with motion, clarity, and speed.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button>Schedule a call</Button>
          <Button variant="secondary">Download resume</Button>
        </div>
      </div>
    </section>
  );
}
