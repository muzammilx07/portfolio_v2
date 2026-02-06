import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ContentType = "blog" | "projects";

export interface Frontmatter {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

export interface MdxContent {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: string;
}

const contentRoot = path.join(process.cwd(), "content");

async function readDirectorySafe(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath);
  } catch {
    return [];
  }
}

function getTypeDir(type: ContentType) {
  return path.join(contentRoot, type);
}

export async function getContentSlugs(type: ContentType): Promise<string[]> {
  const dir = getTypeDir(type);
  const entries = await readDirectorySafe(dir);

  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getMdxBySlug(
  type: ContentType,
  slug: string,
): Promise<MdxContent | null> {
  const dir = getTypeDir(type);
  const filePath = path.join(dir, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(raw);
    const meta = data as Frontmatter;

    return {
      slug,
      frontmatter: meta,
      content,
      readingTime: readingTime(content).text,
    };
  } catch {
    return null;
  }
}

export async function getAllMdx(type: ContentType): Promise<MdxContent[]> {
  const slugs = await getContentSlugs(type);
  const entries = await Promise.all(slugs.map((slug) => getMdxBySlug(type, slug)));

  return entries.filter((entry): entry is MdxContent => Boolean(entry));
}
