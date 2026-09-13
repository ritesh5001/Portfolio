import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import PageNav from "../../components/PageNav";
import SiteFooter from "../../components/SiteFooter";
import { clientProjects, contactInfo } from "../../constants";
import { directoryProjects } from "../../constants/directory";
import {
  LOCALITY,
  REGION,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
  serviceSchema,
} from "../../lib/seo";

const path = "/hire-web-developer-in-lucknow";
const title = `Hire a Web Developer in ${LOCALITY} — Ritesh Kumar Giri`;
const description = `Freelance web developer in Lucknow building WordPress, WooCommerce, Shopify and Next.js websites. ${directoryProjects.length}+ sites live in production. Direct contact, no agency markup.`;

export const metadata = buildMetadata({ title, description, path });

const services = [
  {
    name: "WordPress & WooCommerce",
    href: "/services/wordpress-woocommerce-development",
    body: "Catalogue, checkout, payment gateways and the speed work that makes a store usable on a mid-range Android phone. The bulk of my delivered work sits here.",
  },
  {
    name: "Shopify",
    href: "/services/shopify-development",
    body: "Theme development and storefront customisation for brands that would rather pay a platform fee than maintain their own infrastructure.",
  },
  {
    name: "MERN & Next.js",
    href: "/services/mern-nextjs-development",
    body: "For business models a platform gets in the way of: multi-vendor marketplaces, B2B quoting engines, role-based dashboards, real-time messaging.",
  },
];

const faqs = [
  {
    q: `Do you work with businesses based in ${LOCALITY}?`,
    a: `Yes. I am based in ${LOCALITY}, ${REGION}, and work with local businesses directly — in person where it helps, remotely where it does not. I also take on clients across India and overseas.`,
  },
  {
    q: "What does a typical project involve?",
    a: "A short scoping conversation about what the site has to do, then design, build, content loading, payment and shipping configuration, deployment, and handover with access to everything. I stay available for maintenance afterwards.",
  },
  {
    q: "Do you work through an agency or directly?",
    a: "Both. You can hire me directly as a freelancer, or through NextGen Fusion, my own company, when a project needs a larger team around it. Either way I am the person doing the engineering.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on scope — a brochure site for a service business and a multi-vendor marketplace are different orders of work. Tell me what you need and I will give you a fixed number before anything starts.",
  },
];

export default function HirePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: `Hire a Web Developer in ${LOCALITY}`, path },
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
                <li className="text-white/60">Hire a web developer in {LOCALITY}</li>
              </ol>
            </nav>

            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
              {LOCALITY}, {REGION}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase leading-tight">
              Hire a freelance web developer in {LOCALITY}
            </h1>
            <p className="mt-6 text-white/65 text-lg md:text-xl font-light leading-relaxed">
              I am {contactInfo.name}, a full-stack and WordPress developer based
              in {LOCALITY}. I have put {directoryProjects.length} sites into
              production — e-commerce storefronts, B2B marketplaces, and
              content-led sites for service businesses — and I do the
              engineering myself rather than passing it down a chain.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a project
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
              What I build
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.href}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-3"
                >
                  <h3 className="text-lg text-white font-light">{service.name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed font-light">
                    {service.body}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-block text-[10px] tracking-[0.3em] uppercase text-gold hover:text-white transition-colors"
                  >
                    Details →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
              Why work with me directly
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-light">Local, and reachable</h3>
                <p className="text-sm text-white/55 leading-relaxed font-light">
                  Based in {LOCALITY}. You get my phone number, not a ticket
                  queue, and you talk to the person writing the code.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">Production track record</h3>
                <p className="text-sm text-white/55 leading-relaxed font-light">
                  {directoryProjects.length} live sites across fashion, jewellery,
                  beauty, food, manufacturing and engineering.{" "}
                  <Link href="/work" className="text-gold hover:text-white underline underline-offset-4">
                    See all of them
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">Full stack, end to end</h3>
                <p className="text-sm text-white/55 leading-relaxed font-light">
                  UI, backend APIs, database design, payment integration, hosting
                  and CI/CD. One person accountable for the whole thing.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">Built to be found</h3>
                <p className="text-sm text-white/55 leading-relaxed font-light">
                  Server-rendered markup, structured data, fast loads on mid-range
                  phones. A site that a crawler cannot read cannot rank.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
              Recent case studies
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {clientProjects.slice(0, 6).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 hover:border-white/25 transition-colors"
                  >
                    <span>
                      <span className="block text-white font-light">
                        {project.name}
                      </span>
                      <span className="block text-xs text-white/40 mt-0.5">
                        {project.type}
                      </span>
                    </span>
                    <span className="text-white/30">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
              Questions
            </h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <dt className="text-lg font-light text-white">{faq.q}</dt>
                  <dd className="mt-2 text-sm text-white/55 leading-relaxed font-light">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
              <h2 className="text-xl md:text-2xl font-light">
                Tell me what you need built
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Email gets the fastest reply. Include a sentence on what the site
                has to do and I will come back with scope and a number.
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
