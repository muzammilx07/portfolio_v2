import Link from "next/link";

const posts = [
  {
    title: "Shipping fast with Next.js App Router",
    date: "Feb 2026",
  },
  {
    title: "Designing motion-first interfaces",
    date: "Jan 2026",
  },
];

export default function RecentBlog() {
  return (
    <section className="bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Writing
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Recent Notes
          </h2>
        </div>
        <div className="space-y-2">
          {posts.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:border-[color:var(--accent-hover-border)] hover:bg-[color:var(--accent-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {post.date}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
