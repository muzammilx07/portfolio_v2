"use client";

import Link from "next/link";

const posts = [
  {
    title: "Architecting Sub-200ms AI Interfaces: Bridging FastAPI and React",
    date: "Mar 2026",
    href: "/blog/building-sub-200ms-ai-interfaces-fastapi-react",
    readTime: "5 min",
  },
  {
    title: "Engineering Real-Time Threat Streams: WebSockets, XGBoost & CICIDS",
    date: "Feb 2026",
    href: "/blog/realtime-threat-telemetry-websockets-xgboost",
    readTime: "6 min",
  },
  {
    title:
      "Designing Lightweight Cross-Origin Embeddable Widgets in Next.js 14",
    date: "Jan 2026",
    href: "/blog/designing-cross-origin-embeddable-widgets-nextjs14",
    readTime: "5 min",
  },
];

export default function RecentBlog() {
  return (
    <section className="space-y-4 pb-10 sm:pb-14 border-t border-divider pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Writing{" "}
          <span className="font-serif italic text-xs lowercase text-muted-foreground/80 font-normal">
            — thoughts on interface craft
          </span>
        </h2>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>All notes</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="divide-y divide-divider">
        {posts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 -mx-3 px-3 py-3 rounded-xl transition-colors hover:bg-muted/40"
          >
            <h3 className="text-sm font-medium text-foreground group-hover:underline underline-offset-4 decoration-1 decoration-foreground/40 group-hover:decoration-foreground">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-muted-foreground">
              <span>{post.readTime}</span>
              <time className="tabular-nums">{post.date}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
