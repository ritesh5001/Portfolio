import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import PageNav from "../../../components/PageNav";
import SiteFooter from "../../../components/SiteFooter";
import { servicePages } from "../../../constants/services";
import { clientProjects, contactInfo } from "../../../constants";
import {
  LOCALITY,
  REGION,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
} from "../../../lib/seo";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const related = service.relatedProjects
    .map((projectSlug) => clientProjects.find((p) => p.slug === projectSlug))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#service`,
        name: service.name,
        description: service.description,
        url: absoluteUrl(path),
        serviceType: service.name,
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: [
          { "@type": "City", name: LOCALITY },
          { "@type": "State", name: REGION },
          { "@type": "Country", name: "India" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: service.title,
        description: service.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.shortName, path },
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
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/60">{service.shortName}</li>
              </ol>
            </nav>

            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
              Service · {LOCALITY}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase leading-tight">
              {service.name} in {LOCALITY}
            </h1>
            <p className="mt-6 text-white/65 text-lg md:text-xl font-light leading-relaxed">
              {service.intro}
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl space-y-10">
            {service.sections.map((section) => (
              <article key={section.heading} className="space-y-3">
                <h2 className="text-xl md:text-2xl font-light uppercase tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-white/60 leading-relaxed font-light">
                  {section.body}
                </p>
              </article>
            ))}

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-light uppercase tracking-tight">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs tracking-[0.2em] uppercase bg-white/[0.06] border border-white/10 px-4 py-2 rounded-full text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-xl md:text-2xl font-light uppercase tracking-tight">
                Built with this stack
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {related.map((project) => (
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
                          {project.domain}
                        </span>
                      </span>
                      <span className="text-white/30">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-6 md:px-10 lg:px-16 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
            <h2 className="text-xl md:text-2xl font-light">
              Need {service.shortName} work?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Tell me what the site has to do and I will come back with scope and
              a fixed number.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {contactInfo.email}
              </a>
              <Link
                href="/hire-web-developer-in-lucknow"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white hover:border-white hover:bg-white/5 transition-colors"
              >
                Hire me in {LOCALITY}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
