import FlexSearch from "flexsearch";
import { getAllMdx } from "@/lib/utils/mdx";

export type SearchType = "blog" | "projects";

export interface SearchEntry {
  id: string;
  type: SearchType;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export interface SearchResult {
  id: string;
  type: SearchType;
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

const normalize = (value: string) => value.trim();

export function createSearchIndex(entries: SearchEntry[]) {
  const index = new FlexSearch.Document<SearchEntry, true>({
    tokenize: "forward",
    cache: 100,
    document: {
      id: "id",
      index: [
        { field: "title", weight: 3 },
        { field: "description", weight: 2 },
        { field: "tags", weight: 2 },
        { field: "content", weight: 1 },
      ],
      store: ["id", "type", "slug", "title", "description", "tags"],
    },
  });

  entries.forEach((entry) => {
    index.add(entry);
  });

  return index;
}

export async function buildSearchEntries(): Promise<SearchEntry[]> {
  const [blogs, projects] = await Promise.all([
    getAllMdx("blog"),
    getAllMdx("projects"),
  ]);

  const blogEntries = blogs.map((post) => ({
    id: `blog:${post.slug}`,
    type: "blog" as const,
    slug: post.slug,
    title: normalize(post.frontmatter.title),
    description: normalize(post.frontmatter.summary ?? ""),
    tags: post.frontmatter.tags ?? [],
    content: post.content,
  }));

  const projectEntries = projects.map((project) => ({
    id: `projects:${project.slug}`,
    type: "projects" as const,
    slug: project.slug,
    title: normalize(project.frontmatter.title),
    description: normalize(project.frontmatter.summary ?? ""),
    tags: project.frontmatter.tags ?? [],
    content: project.content,
  }));

  return [...blogEntries, ...projectEntries];
}

export async function buildSearchIndex() {
  const entries = await buildSearchEntries();
  const index = createSearchIndex(entries);
  return { index, entries };
}

export function searchIndex(
  index: FlexSearch.Document<SearchEntry, true>,
  query: string,
  limit = 8,
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results = index.search(query, { limit, enrich: true });
  const flat = results.flatMap((result) => result.result);

  return flat.map((doc) => ({
    id: doc.id,
    type: doc.type,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    tags: doc.tags,
  }));
}
