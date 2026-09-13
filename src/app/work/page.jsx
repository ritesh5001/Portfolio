import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../components/SiteFooter";
import WorkDirectory from "../../components/WorkDirectory";
import PageNav from "../../components/PageNav";
import { directoryProjects } from "../../constants/directory";
import { clientProjects } from "../../constants";
import {
  LOCALITY,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
} from "../../lib/seo";

const title = `Client Work — ${directoryProjects.length} Live Websites Built by Ritesh Giri`;
const description = `Every site delivered to date: WooCommerce and Shopify storefronts, B2B marketplaces and custom Next.js builds for clients in Lucknow and across India.`;

export const metadata = buildMetadata({
  title,
  description,
  path: "/work",
});

/**
 * Screenshots are captured from the live sites and committed to the repo. A
 * card without one falls back to a text tile rather than borrowing an unrelated
 * stock image.
 */
const readAvailableShots = () => {
  const dir = path.join(process.cwd(), "public", "assets", "directory");
  const available = {};
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return available;
  }
  for (const file of files) {
    if (file.endsWith(".webp")) available[file.replace(/\.webp$/, "")] = true;
  }
  return available;
};

export default function WorkPage() {
  const hasShot = readAvailableShots();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/work")}#webpage`,
        url: absoluteUrl("/work"),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/work")}#itemlist`,
        name: "Websites built by Ritesh Kumar Giri",
        numberOfItems: directoryProjects.length,
        itemListElement: directoryProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          url: project.caseStudy
            ? absoluteUrl(`/projects/${project.caseStudy}`)
            : project.url,
        })),
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageNav />
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-24">
        <section className="px-6 md:px-10 lg:px-16 pb-10 border-b border-white/[0.08]">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="text-xs text-white/35 mb-6">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/60">Work</li>
              </ol>
            </nav>

            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
              Client Work
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase leading-tight max-w-4xl">
              {directoryProjects.length} live websites, built and shipped
            </h1>
            <p className="mt-6 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-3xl">
              Everything below is live in production. The work splits three ways:
              storefronts on WooCommerce and Shopify where catalogue, checkout
              and speed on a mid-range phone decide the outcome; custom builds on
              Next.js where the business model is unusual enough that a platform
              gets in the way — multi-vendor marketplaces, B2B quoting engines,
              maritime procurement; and content-led sites for firms whose
              customers research before they enquire.
            </p>
            <p className="mt-4 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-3xl">
              {clientProjects.length} of them have a written case study covering
              the brief, the build and the stack. The rest link straight through
              to the live site — click any of them and judge the work directly.
            </p>
            <p className="mt-6 text-white/50 text-sm">
              Looking for a specific capability?{" "}
              <Link
                href="/hire-web-developer-in-lucknow"
                className="text-gold hover:text-white transition-colors underline underline-offset-4"
              >
                Hire a web developer in {LOCALITY}
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-12">
          <div className="mx-auto max-w-7xl">
            <WorkDirectory hasShot={hasShot} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
