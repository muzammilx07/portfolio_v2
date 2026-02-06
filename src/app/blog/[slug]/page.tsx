import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getContentSlugs, getMdxBySlug } from "@/lib/utils/mdx";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = await getMdxBySlug("blog", params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await getMdxBySlug("blog", params.slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const formattedDate = post.frontmatter.date
    ? format(new Date(post.frontmatter.date), "MMM dd, yyyy")
    : "";

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {formattedDate && <span>{formattedDate} • </span>}
            <span>{post.readingTime}</span>
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.frontmatter.title}
          </h1>
        </header>
        <div className="prose prose-neutral max-w-none">
          {content}
        </div>
      </div>
    </article>
  );
}
