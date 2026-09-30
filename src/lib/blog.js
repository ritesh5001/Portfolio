import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

/**
 * Posts are Markdown files in /content/blog. The filename is the URL slug:
 * content/blog/fix-vercel-redirect-loop.md -> /blog/fix-vercel-redirect-loop
 *
 * Posts with `draft: true` are visible in `next dev` so they can be previewed,
 * and excluded from production builds (no page, no sitemap entry, no RSS item).
 */
const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

const REQUIRED_FIELDS = ["title", "description", "date", "keyword"];

// Google truncates titles around 60 characters and descriptions around 155.
// These are warnings, not errors: a long title still works, it just gets cut.
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

const toIsoDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
};

const readingMinutes = (text) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));

const readPostFile = (filename) => {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(
      `content/blog/${filename} is missing required frontmatter: ${missing.join(", ")}`
    );
  }

  if (data.title.length > TITLE_LIMIT) {
    console.warn(
      `[blog] ${slug}: title is ${data.title.length} chars (>${TITLE_LIMIT}); Google will truncate it.`
    );
  }
  if (data.description.length > DESCRIPTION_LIMIT) {
    console.warn(
      `[blog] ${slug}: description is ${data.description.length} chars (>${DESCRIPTION_LIMIT}); Google will truncate it.`
    );
  }

  const date = toIsoDate(data.date);
  if (!date) throw new Error(`content/blog/${filename} has an invalid date: ${data.date}`);

  return {
    slug,
    title: data.title,
    description: data.description,
    date,
    updated: toIsoDate(data.updated) ?? date,
    keyword: data.keyword,
    tags: Array.isArray(data.tags) ? data.tags : [],
    // Optional slug from constants/services.js; the post links to that service
    // page so its ranking value flows toward pages that bring in work.
    service: data.service ?? null,
    draft: data.draft === true,
    readingMinutes: readingMinutes(content),
    content,
  };
};

let cache = null;

/** All posts visible in this environment, newest first. */
export const getAllPosts = () => {
  if (cache) return cache;

  let files = [];
  try {
    // Files starting with "_" (like _template.md) are never published.
    files = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  } catch {
    files = [];
  }

  cache = files
    .map(readPostFile)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return cache;
};

export const getPost = (slug) => getAllPosts().find((post) => post.slug === slug) ?? null;

/** True when at least one post is visible here (drafts count under `next dev`). */
export const hasPosts = () => getAllPosts().length > 0;

/**
 * Up to `limit` other posts, ranked by how many tags they share with `post`,
 * then by recency. Keeps every post linking into the rest of the blog.
 */
export const getRelatedPosts = (post, limit = 3) =>
  getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      post: other,
      shared: other.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map(({ post: other }) => other);

// Collects h2/h3 headings (after rehype-slug has given them ids) for the
// on-page table of contents.
const collectHeadings = (toc) => () => (tree) => {
  const textOf = (node) =>
    node.type === "text"
      ? node.value
      : (node.children ?? []).map(textOf).join("");

  const visit = (node) => {
    if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
      toc.push({
        id: node.properties?.id,
        text: textOf(node),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    }
    (node.children ?? []).forEach(visit);
  };
  visit(tree);
};

/** Markdown -> HTML string plus a table of contents. Runs at build time only. */
export const renderPost = async (post) => {
  const toc = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(collectHeadings(toc))
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["heading-anchor"] },
    })
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(post.content);

  return { html: String(file), toc };
};
