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
            Recent notes
          </h2>
        </div>
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.title}
              className="rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:bg-muted/40"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {post.date}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{post.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
