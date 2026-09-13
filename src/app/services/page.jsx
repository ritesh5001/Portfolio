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

export const metadata = buildMetadata({ title, description, path: "/services" });

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
                <li className="text-white/60">Services</li>
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase leading-tight">
              Web development services in {LOCALITY}
            </h1>
            <p className="mt-6 text-white/65 text-lg font-light leading-relaxed">
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
                  className="block h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-white/25 transition-colors space-y-3"
                >
                  <h2 className="text-lg text-white font-light">
                    {service.shortName}
                  </h2>
                  <p className="text-sm text-white/55 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-gold">
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
