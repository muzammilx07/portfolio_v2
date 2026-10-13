import Link from "next/link";
import { getAllMdx } from "@/lib/utils/mdx";
import PageHeader from "@/components/shared/PageHeader";

export default async function BlogPage() {
  const posts = await getAllMdx("blog");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Writing"
        description="Essays, engineering notes, and observations on frontend architecture and interface craft."
      />

      {posts.length === 0 ? (
        <div className="py-8 text-sm text-muted-foreground">
          Notes and essays coming soon.
        </div>
      ) : (
        <div className="divide-y divide-divider">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6 -mx-3 px-3 py-4 rounded-xl transition-colors hover:bg-muted/40"
            >
              <div className="space-y-1">
                <h2 className="text-sm font-medium text-foreground group-hover:underline underline-offset-4 decoration-1 decoration-foreground/40 group-hover:decoration-foreground">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.summary ? (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {post.frontmatter.summary}
                  </p>
                ) : null}
              </div>

              {post.frontmatter.date && (
                <time className="text-xs font-mono tabular-nums text-muted-foreground shrink-0">
                  {post.frontmatter.date}
                </time>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
