"use client";

import { ArrowUpRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="space-y-4 pb-12 sm:pb-16 border-t border-divider pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-normal text-muted-foreground">Get In Touch</h2>
        <span className="text-xs font-mono text-muted-foreground">Open for work</span>
      </div>

      <div className="space-y-4">
        <p className="text-base text-foreground/90 leading-relaxed font-normal">
          Whether you have a product requiring interface craft, an intelligent AI workflow in need of integration, or a distributed service to build — my inbox is always open.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="mailto:muzammilxshareef@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            <Mail className="size-3.5" />
            <span>Say hello</span>
          </a>

          <a
            href="https://github.com/muzammilx07"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>GitHub</span>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </a>

          <a
            href="https://www.linkedin.com/in/muzammil633"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
}
