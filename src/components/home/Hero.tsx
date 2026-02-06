import Button from "@/components/ui/Button";
import { personal } from "@/lib/data/personal";

export default function Hero() {
  return (
    <section className="w-full bg-background px-6 pb-16 pt-16 text-foreground">
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-sm text-muted-foreground">Hi, I am {personal.name}.</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {personal.role} building fast, reliable web experiences.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {personal.summary}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>View projects</Button>
          <Button variant="secondary">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}
