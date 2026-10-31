import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import PageNav from "../../components/PageNav";
import SiteFooter from "../../components/SiteFooter";
import { servicePages } from "../../constants/services";
import {
  LOCALITY,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
} from "../../lib/seo";

const title = `Web Development Services in ${LOCALITY} — Ritesh Kumar Giri`;
const description =
  "WordPress and WooCommerce, Shopify, and MERN/Next.js development for businesses in Lucknow and across India. Built and maintained by one engineer, directly.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
});

export default function ServicesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/services")}#webpage`,
        url: absoluteUrl("/services"),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageNav />
      <main
        id="main-content"
        className="content-page min-h-screen bg-white text-ink"
      >
        <section className="px-6 md:px-10 lg:px-16 pb-12 border-b border-black/[0.08]">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs text-ink/60 mb-6">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-ink/60">Services</li>
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase leading-tight">
              Web development services in {LOCALITY}
            </h1>
            <p className="mt-6 text-ink/65 text-lg font-light leading-relaxed">
              Three kinds of work, chosen by what the business actually needs
              rather than what is quickest to build.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14">
          <ul className="mx-auto max-w-4xl grid gap-4 md:grid-cols-3">
            {servicePages.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="interactive-card block h-full rounded-2xl border border-black/[0.08] bg-black/[0.02] p-6 hover:border-black/25 transition-colors space-y-3"
                >
                  <h2 className="text-lg text-ink font-light">
                    {service.shortName}
                  </h2>
                  <p className="text-sm text-ink/70 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-ink">
                    Details →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
