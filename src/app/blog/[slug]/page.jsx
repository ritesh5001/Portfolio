import Link from "next/link";
import Image from "next/image";
import { blogPlaceholders } from "../../../generated/blogPlaceholders";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import PageNav from "../../../components/PageNav";
import SiteFooter from "../../../components/SiteFooter";
import { contactInfo } from "../../../constants";
import { servicePages } from "../../../constants/services";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  renderPost,
} from "../../../lib/blog";
import { LOCALITY, buildPostSeo } from "../../../lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Scheduled posts aren't in generateStaticParams yet; when one comes due,
// its page is rendered on first request and then cached.
export const dynamicParams = true;
// Refresh every minute. Pages aren't prebuilt for scheduled posts; when one
// comes due it renders on request and is cached briefly.
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { metadata } = buildPostSeo(post);
  return post.draft
    ? { ...metadata, robots: { index: false, follow: false } }
    : metadata;
}

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html, toc } = await renderPost(post);
  const { jsonLd } = buildPostSeo(post);
  const related = getRelatedPosts(post);
  const service = post.service
    ? servicePages.find((s) => s.slug === post.service)
    : null;

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageNav />
      <main
        id="main-content"
        className="content-page min-h-screen bg-white text-ink"
      >
        {post.scheduled && !post.draft && (
          <div className="bg-black/10 text-ink text-center text-xs tracking-[0.2em] uppercase py-2">
            Scheduled preview — goes live{" "}
            {new Date(post.publishedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "medium",
              timeStyle: "short",
            })}{" "}
            IST
          </div>
        )}
        {post.draft && (
          <div className="bg-ink text-white text-center text-xs tracking-[0.2em] uppercase py-2">
            Draft preview — set <code>draft: false</code> to publish
          </div>
        )}

        <header className="px-6 md:px-10 lg:px-16 pt-8 pb-10 border-b border-black/[0.08]">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-xs text-ink/60 mb-6">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-ink transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/blog"
                      className="hover:text-ink transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                </ol>
              </nav>

              {post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] tracking-[0.25em] uppercase text-ink border border-gold/30 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-ink/60 text-lg font-light leading-relaxed">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/65">
                <Link
                  href="/about"
                  rel="author"
                  className="text-ink/75 hover:text-ink transition-colors"
                >
                  {contactInfo.name}
                </Link>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updated !== post.date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.updated}>
                        {formatDate(post.updated)}
                      </time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10 lg:px-16 py-12">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_240px]">
            <div className="max-w-3xl min-w-0">
              {post.image && (
                <Image
                  data-motion-reveal="image"
                  src={post.image}
                  placeholder={blogPlaceholders[post.image] ? "blur" : "empty"}
                  blurDataURL={blogPlaceholders[post.image]}
                  sizes="(max-width: 1024px) 100vw, 768px"
                  alt={post.imageAlt}
                  width="1280"
                  height="720"
                  className="mb-10 w-full rounded-2xl border border-black/10 object-cover aspect-video"
                />
              )}
              <article
                className="post-body prose prose-lg max-w-none prose-headings:font-light prose-a:underline-offset-4 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {post.sources.length > 0 && (
                <section className="mt-12 border-t border-black/10 pt-6">
                  <h2 className="text-xs tracking-[0.35em] uppercase text-ink/60 mb-4">
                    Sources
                  </h2>
                  <ol className="space-y-2 text-sm list-decimal pl-5 text-ink/70">
                    {post.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener"
                          className="hover:text-ink underline underline-offset-4 decoration-black/20"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>

            {toc.length > 1 && (
              <aside className="hidden lg:block">
                <nav
                  aria-label="On this page"
                  className="sticky top-28 border-l border-black/10 pl-5"
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-ink/60 mb-4">
                    On this page
                  </p>
                  <ol className="space-y-2.5 text-sm">
                    {toc.map((heading) => (
                      <li
                        key={heading.id}
                        className={heading.depth === 3 ? "pl-3" : ""}
                      >
                        <a
                          href={`#${heading.id}`}
                          className="text-ink/65 hover:text-ink transition-colors leading-snug block"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}
          </div>
        </div>

        {/* Author box: connects the post to the Person entity and to the pages
            that bring in work. */}
        <section className="px-6 md:px-10 lg:px-16 pb-14">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl rounded-2xl border border-black/[0.08] bg-black/[0.02] p-6 md:p-8 flex flex-col sm:flex-row gap-6">
              <img
                src={contactInfo.profileImage}
                alt={contactInfo.name}
                width="96"
                height="96"
                className="size-20 rounded-full object-cover object-top border border-black/10 shrink-0"
              />
              <div>
                <p className="text-lg font-light">
                  Written by{" "}
                  <Link
                    href="/about"
                    rel="author"
                    className="text-ink hover:text-ink transition-colors"
                  >
                    {contactInfo.name}
                  </Link>
                </p>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed font-light">
                  Freelance full-stack and WordPress developer in {LOCALITY}. I
                  build WooCommerce and Shopify stores, and custom Next.js
                  platforms, for businesses across India.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {service && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="rounded-full bg-ink px-5 py-2 text-xs uppercase tracking-[0.2em] text-white"
                    >
                      {service.shortName} services
                    </Link>
                  )}
                  <Link
                    href="/hire-web-developer-in-lucknow"
                    className="rounded-full border border-black/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink hover:border-black hover:bg-black/5 transition-colors"
                  >
                    Hire me
                  </Link>
                  <Link
                    href="/work"
                    className="rounded-full border border-black/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink hover:border-black hover:bg-black/5 transition-colors"
                  >
                    See my work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 md:px-10 lg:px-16 pb-20">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <h2 className="text-xs tracking-[0.35em] uppercase text-ink/60 mb-5">
                  Keep reading
                </h2>
                <ul className="grid gap-3">
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/blog/${other.slug}`}
                        className="block rounded-xl border border-black/[0.08] bg-black/[0.02] px-5 py-4 hover:border-black/25 transition-colors"
                      >
                        <span className="block text-ink font-light">
                          {other.title}
                        </span>
                        <span className="block text-xs text-ink/60 mt-1">
                          {other.readingMinutes} min read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
