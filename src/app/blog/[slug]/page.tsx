import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContentSlugs, getMdxBySlug } from "@/lib/utils/mdx";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMdxBySlug("blog", slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} — Muzammil Shareef`,
    description: post.frontmatter.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getMdxBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const formattedDate = post.frontmatter.date
    ? new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(post.frontmatter.date))
    : "";

  return (
    <article className="space-y-8 pb-16">
      <div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to writing</span>
        </Link>
      </div>

      <header className="space-y-3 border-b border-divider pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
          {formattedDate && <time className="tabular-nums">{formattedDate}</time>}
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {post.frontmatter.title}
        </h1>

        {post.frontmatter.summary && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.frontmatter.summary}
          </p>
        )}

        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed text-foreground/90 space-y-4">
        {content}
      </div>
    </article>
  );
}
