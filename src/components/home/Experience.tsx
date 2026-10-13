"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  summary: string;
  achievements: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Blackbuck",
    role: "Frontend Developer Intern",
    period: "Jan 2026 — Mar 2026",
    location: "Hyderabad, IN",
    isCurrent: true,
    summary:
      "Engineered real-time dashboard interfaces bridging machine learning predictions with operational review workflows.",
    achievements: [
      "Shipped responsive React.js interfaces for 3 core AI/ML features, eliminating manual data-review bottlenecks for operations staff.",
      "Architected async FastAPI pipelines connecting model inference endpoints with sub-200ms round-trip latency.",
      "Collaborated closely with ML engineers and product managers to ensure seamless integration and timely production rollout.",
    ],
    skills: [
      "React.js",
      "FastAPI",
      "Python",
      "RESTful APIs",
      "JavaScript",
      "Git",
    ],
  },
  {
    company: "Zatokshi Ventures",
    role: "Frontend Developer (UI/UX)",
    period: "Sep 2024 — Feb 2025",
    location: "Hyderabad, IN",
    isCurrent: false,
    summary:
      "Designed and developed customer-facing web applications, responsive component libraries, and interactive 3D elements.",
    achievements: [
      "Decreased average page turnaround time by 40% using modular, atomic React component hierarchies.",
      "Embedded lightweight 3D WebGL modules to deliver interactive product storytelling without compromising FPS.",
      "Improved route speed by 30% through dynamic code-splitting, lazy route hydration, and asset budget optimization.",
      "Established reusable UI design tokens across mobile and desktop viewports to maintain strict visual ergonomics.",
    ],
    skills: [
      "React.js",
      "Tailwind CSS",
      "WebGL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Git",
    ],
  },
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="experience"
      className="space-y-4 pb-10 sm:pb-14 border-t border-divider pt-10"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Experience{" "}
          <span className="font-serif italic text-xs lowercase text-muted-foreground/80 font-normal">
            — career trajectory
          </span>
        </h2>
        <span className="text-xs font-mono text-muted-foreground">
          2+ Years Shipping
        </span>
      </div>

      <div className="divide-y divide-divider">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={exp.company}
              className="group -mx-3 px-3 py-4 rounded-xl transition-colors hover:bg-muted/40 cursor-pointer"
              onClick={() => toggle(idx)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">
                      {exp.company}
                    </h3>
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-serif italic text-foreground text-[15px] font-normal">
                      {exp.role}
                    </span>{" "}
                    · {exp.location}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <time className="text-xs font-mono tabular-nums text-muted-foreground">
                    {exp.period}
                  </time>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-foreground" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-4">
                        {exp.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block rounded border border-divider px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
