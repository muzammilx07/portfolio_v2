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
    <section className="bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Writing
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Recent notes
          </h2>
        </div>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.title}
              className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
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
