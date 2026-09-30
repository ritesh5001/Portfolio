import Link from "next/link";
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

export const dynamicParams = false;

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
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-24">
        {post.draft && (
          <div className="bg-gold text-black text-center text-xs tracking-[0.2em] uppercase py-2">
            Draft preview — set <code>draft: false</code> to publish
          </div>
        )}

        <header className="px-6 md:px-10 lg:px-16 pt-8 pb-10 border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <nav
                aria-label="Breadcrumb"
                className="text-xs text-white/35 mb-6"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/blog"
                      className="hover:text-white transition-colors"
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
                      className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/30 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-white/60 text-lg font-light leading-relaxed">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/45">
                <Link
                  href="/about"
                  rel="author"
                  className="text-white/75 hover:text-gold transition-colors"
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
            <article
              className="post-body prose prose-invert prose-lg max-w-3xl min-w-0 prose-headings:font-light prose-a:underline-offset-4 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {toc.length > 1 && (
              <aside className="hidden lg:block">
                <nav
                  aria-label="On this page"
                  className="sticky top-28 border-l border-white/10 pl-5"
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-4">
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
                          className="text-white/50 hover:text-white transition-colors leading-snug block"
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
            <div className="max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col sm:flex-row gap-6">
              <img
                src={contactInfo.profileImage}
                alt={contactInfo.name}
                width="96"
                height="96"
                className="size-20 rounded-full object-cover object-top border border-white/10 shrink-0"
              />
              <div>
                <p className="text-lg font-light">
                  Written by{" "}
                  <Link
                    href="/about"
                    rel="author"
                    className="text-gold hover:text-white transition-colors"
                  >
                    {contactInfo.name}
                  </Link>
                </p>
                <p className="mt-2 text-sm text-white/55 leading-relaxed font-light">
                  Freelance full-stack and WordPress developer in {LOCALITY}. I
                  build WooCommerce and Shopify stores, and custom Next.js
                  platforms, for businesses across India.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {service && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-black"
                    >
                      {service.shortName} services
                    </Link>
                  )}
                  <Link
                    href="/hire-web-developer-in-lucknow"
                    className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/5 transition-colors"
                  >
                    Hire me
                  </Link>
                  <Link
                    href="/work"
                    className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/5 transition-colors"
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
                <h2 className="text-xs tracking-[0.35em] uppercase text-white/40 mb-5">
                  Keep reading
                </h2>
                <ul className="grid gap-3">
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/blog/${other.slug}`}
                        className="block rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 hover:border-white/25 transition-colors"
                      >
                        <span className="block text-white font-light">
                          {other.title}
                        </span>
                        <span className="block text-xs text-white/40 mt-1">
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
