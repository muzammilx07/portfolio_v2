"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import DevTerminal from "../interactive/DevTerminal";
import { WordRotate } from "../animations/WordRotate";

const links = [
  { label: "Email", href: "mailto:muzammilxshareef@gmail.com" },
  { label: "GitHub", href: "https://github.com/muzammilx07" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muzammil633" },
  { label: "X", href: "https://x.com/itsShareef63" },
];

export default function Hero() {
  return (
    <section className="space-y-8 pb-10 sm:pb-14">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Mohammed Muzammil Shareef
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-divider bg-muted/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Software Engineer</span>
            <span>·</span>
            <WordRotate
              words={[
                "Full-Stack & UI Crafter",
                "GenAI & LLM Integrator",
                "AI/ML Systems Engineer",
                "Java & Microservices Builder",
              ]}
              className="font-serif italic text-foreground text-[15px]"
            />
          </div>

          <div className="pt-0.5">
            <span className="text-[11px] font-mono text-muted-foreground/75 tracking-wider">
              17.3850° N, 78.4867° E // HYDERABAD, IN
            </span>
          </div>
        </div>

        <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-full border border-border shadow-sm ring-2 ring-divider">
          <Image
            src="/pr.webp"
            alt="Muzammil Shareef"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="space-y-3 text-base leading-[1.75] text-foreground/90 font-normal">
        <p>
          Software engineer blending{" "}
          <span className="font-serif italic text-foreground font-normal">
            craft-driven UI engineering
          </span>
          ,{" "}
          <span className="font-serif italic text-foreground font-normal">
            Generative AI & LLM workflows
          </span>
          , and{" "}
          <span className="font-serif italic text-foreground font-normal">
            distributed service architecture
          </span>
          .
        </p>
        <p className="text-sm leading-[1.65] text-muted-foreground">
          CS graduate specializing in AI/ML from Hyderabad, India. Shipping sub-200ms reactive web applications, orchestrating intelligent model pipelines, and expanding into enterprise Java microservices.
        </p>
      </div>

      <nav
        aria-label="Social and contact links"
        className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noreferrer noopener" : undefined
            }
            className="group inline-flex items-center gap-1 text-foreground craft-link font-normal"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </a>
        ))}
      </nav>

      <div className="pt-2">
        <DevTerminal />
      </div>
    </section>
  );
}
