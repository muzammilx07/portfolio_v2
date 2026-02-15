import FlexSearch from "flexsearch";
import type {
  Document,
  DocumentData,
  DocumentDescriptor,
  EnrichedResults,
  EnrichedDocumentSearchResults,
} from "flexsearch";
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

type SearchDocument = SearchEntry & DocumentData;

export interface SearchResult {
  id: string;
  type: SearchType;
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

const normalize = (value: string) => value.trim();

export function createSearchIndex(
  entries: SearchEntry[],
): Document<SearchDocument> {
  const document = {
    id: "id",
    index: ["title", "description", "tags", "content"],
    store: ["id", "type", "slug", "title", "description", "tags"],
  };

  const index = new FlexSearch.Document<SearchDocument>({
    tokenize: "forward",
    cache: 100,
    document: document as unknown as DocumentDescriptor<SearchDocument>,
  });

  entries.forEach((entry) => {
    index.add(entry as SearchDocument);
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
  index: Document<SearchDocument>,
  query: string,
  limit = 8,
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results: EnrichedDocumentSearchResults<DocumentData> = index.search(
    query,
    {
      limit,
      enrich: true,
    },
  ) as EnrichedDocumentSearchResults<DocumentData>;
  const flat: EnrichedResults<DocumentData> = results.flatMap(
    (result) => result.result,
  );

  const toSearchResult = (doc: DocumentData): SearchResult => {
    const entry = doc as Omit<SearchEntry, "content">;
    return {
      id: entry.id,
      type: entry.type,
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      tags: entry.tags,
    };
  };

  return flat
    .map((item) => item.doc)
    .filter((doc): doc is DocumentData => Boolean(doc))
    .map(toSearchResult);
}
