import { getAllPosts } from "../../../lib/blog";
import { contactInfo } from "../../../constants";
import { SITE_URL, absoluteUrl, blogSeo } from "../../../lib/seo";

// Built once at deploy time, like every other page.
export const dynamic = "force-static";

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const posts = getAllPosts().filter((post) => !post.draft);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(blogSeo.title)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escape(blogSeo.description)}</description>
    <language>en-IN</language>
    <managingEditor>${contactInfo.email} (${escape(contactInfo.name)})</managingEditor>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/icons/icon-192.png</url>
      <title>${escape(blogSeo.title)}</title>
      <link>${absoluteUrl("/blog")}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
