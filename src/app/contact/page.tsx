"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import OmniLED from "@/components/display/MatrixDisplay";

const contactMethods = [
  {
    name: "Email",
    value: "muzammilxshareef@gmail.com",
    href: "mailto:muzammilxshareef@gmail.com",
    primary: true,
  },
  {
    name: "GitHub",
    value: "github.com/muzammilx07",
    href: "https://github.com/muzammilx07",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/muzammil633",
    href: "https://www.linkedin.com/in/muzammil633",
  },
  {
    name: "X (Twitter)",
    value: "@itsShareef63",
    href: "https://x.com/itsShareef63",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText("muzammilxshareef@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact"
        description="Whether you have an inquiry, an interesting role, or an interface challenge — feel free to reach out."
      />

      <div className="space-y-6">
        <div className="rounded-xl border border-divider bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <MapPin className="size-3.5 text-emerald-500" />
            <span>HYDERABAD, INDIA · AVAILABLE REMOTELY WORLDWIDE</span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/90 font-normal">
            The quickest way to reach me is via email. I typically respond
            within 24 hours on weekdays.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="mailto:muzammilxshareef@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <Mail className="size-3.5" />
              <span>Send an Email</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-muted-foreground" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="divide-y divide-divider pt-2">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noreferrer noopener"
                  : undefined
              }
              className="group flex items-center justify-between py-3.5 text-sm transition-colors hover:bg-muted/30 -mx-2 px-2 rounded-lg"
            >
              <span className="font-medium text-foreground">{method.name}</span>
              <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground group-hover:text-foreground">
                <span>{method.value}</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>

        <div className="space-y-3 pt-6 border-t border-divider">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="font-semibold text-foreground uppercase tracking-widest">
              TELEMETRY & SIGNAL CONSOLE
            </span>
            <span>OMNI-01 // UPLINK</span>
          </div>
          <OmniLED />
        </div>
      </div>
    </div>
  );
}
