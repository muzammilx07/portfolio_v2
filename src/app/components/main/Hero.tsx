import Button from "@/app/components/ui/Button";
import { Github, Linkedin, Twitter, Mail, ArrowRight} from "lucide-react";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];
const InlineTech = ({ children }: { children: React.ReactNode }) => (
  <span
    className="
      relative mx-1 inline-block font-medium text-foreground
      transition-all duration-200
      hover:-translate-y-px
    "
  >
    {children}
    <span
      className="
        pointer-events-none absolute left-0 -bottom-0.5
        h-0.5 w-full bg-primary/40
        scale-x-0 origin-left
        transition-transform duration-200
        group-hover:scale-x-100
      "
    />
  </span>
);


export default function Hero() {
    
  return (
    <section className="relative w-full bg-background text-foreground px-6 pt-16 pb-16">
      {/* subtle radial accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,var(--color-accent),transparent_60%)] opacity-15" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              <span className="text-md text-muted-foreground">
                Hi, <span className="text-2xl">I’m Muzammil</span>!
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              A Full-Stack <span className="text-primary">Web</span> Developer
            </h1>

            {/* Short Description */}
            <p className="group max-w-lg text-muted-foreground leading-relaxed">
              I build interactive web apps using
              <InlineTech>TypeScript</InlineTech>,<InlineTech>React</InlineTech>
              ,<InlineTech>Next.js</InlineTech>,<InlineTech>Bun</InlineTech> and
              <InlineTech>PostgreSQL</InlineTech>. With a focus on{" "}
              <InlineTech>UI design</InlineTech>. Enthusiastic about{" "}
              <InlineTech>Three.js</InlineTech>, driven by a keen eye for
              design.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button className="shadow-md">Resume / CV</Button>
              <Button variant="secondary" className="opacity-90">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Right column: Tech stack + Socials */}
          <div className="flex flex-col justify-between gap-8">
            {/* Tech stack */}

            {/* Socials */}
            <div>
              <p className="mb-2 text-sm text-muted-foreground uppercase tracking-widest">
                Connect
              </p>
              <div className="flex flex-col gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-3 py-2 px-3 rounded-md transition-all duration-300 hover:bg-muted/40 -mx-3 bg-secondary text-secondary-foreground"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {label}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all ml-auto transform group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
