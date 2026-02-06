import Link from "next/link";
import { getAllMdx } from "@/lib/utils/mdx";

export default async function BlogPage() {
  const posts = await getAllMdx("blog");

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Blog
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes and updates
          </h1>
        </header>
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            No posts yet.
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.summary ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.frontmatter.summary}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
