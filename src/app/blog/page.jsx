import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import PageNav from "../../components/PageNav";
import SiteFooter from "../../components/SiteFooter";
import { getAllPosts } from "../../lib/blog";
import {
  SITE_URL,
  absoluteUrl,
  blogSeo,
  buildBreadcrumbs,
  buildMetadata,
} from "../../lib/seo";

// Re-check for newly due scheduled posts every 10 minutes
// (literal required by Next.js; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 600;

export const metadata = {
  ...buildMetadata(blogSeo),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
  },
};

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // An empty blog index is a thin page. Until the first post is published it
  // does not exist, and nothing links to it (see hasPosts()).
  if (posts.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${absoluteUrl("/blog")}#blog`,
        url: absoluteUrl("/blog"),
        name: blogSeo.title,
        description: blogSeo.description,
        inLanguage: "en-IN",
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.publishedAt,
          dateModified: post.updated,
        })),
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageNav />
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-24">
        <section className="px-6 md:px-10 lg:px-16 pb-12 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs text-white/35 mb-6">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/60">Blog</li>
              </ol>
            </nav>
            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
              Notes from the work
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase leading-tight">
              Blog
            </h1>
            <p className="mt-6 text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              Write-ups from real builds — Next.js, WooCommerce, Shopify, and the
              problems that come up shipping websites for businesses in Lucknow
              and across India.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-12">
          <ol className="mx-auto max-w-4xl divide-y divide-white/[0.08]">
            {posts.map((post) => (
              <li key={post.slug} className="py-8 first:pt-0">
                <article className="group sm:flex sm:gap-6 sm:items-start">
                  {post.image && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block shrink-0 mb-4 sm:mb-0 sm:w-48 overflow-hidden rounded-xl border border-white/10"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        width="384"
                        height="216"
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min read</span>
                    {post.draft && (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-gold">
                        Draft — not published
                      </span>
                    )}
                    {post.scheduled && !post.draft && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">
                        Scheduled
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-xl md:text-2xl font-light leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-gold transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-white/55 font-light leading-relaxed">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[10px] tracking-[0.2em] uppercase text-white/45 bg-white/[0.05] px-3 py-1 rounded-full"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
