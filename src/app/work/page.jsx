import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { projectPlaceholders } from "../../generated/projectPlaceholders";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../components/SiteFooter";
import WorkDirectory from "../../components/WorkDirectory";
import PageNav from "../../components/PageNav";
import { directoryProjects, liveProjects } from "../../constants/directory";
import { clientProjects } from "../../constants";
import {
  LOCALITY,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
} from "../../lib/seo";

const title = `Client Work — ${liveProjects.length} Live Websites Built by Ritesh Giri`;
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
        // Only live sites: an ItemList entry should point somewhere real.
        numberOfItems: liveProjects.length,
        itemListElement: liveProjects.map((project, index) => ({
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
      <main
        id="main-content"
        className="content-page work-archive min-h-screen bg-white text-ink"
      >
        <section className="archive-intro section-shell">
          <nav aria-label="Breadcrumb" className="project-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Work</span>
          </nav>
          <div className="archive-hero" data-motion-reveal="rise">
            <div>
              <p className="project-eyebrow">
                <span className="project-status-dot" /> Client Work / Selected &
                shipped
              </p>
              <h1>
                <span>{liveProjects.length} live websites,</span>
                <br />
                built and <em>shipped.</em>
              </h1>
            </div>
            <div className="archive-hero-aside">
              <span className="archive-hero-arrow" aria-hidden="true">
                ↙
              </span>
              <p>
                Storefronts, marketplaces and custom builds. Explore the work,
                then see how it came together.
              </p>
              <a href="#project-directory" className="project-text-link">
                Explore all projects <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
          <dl className="archive-ledger">
            {[
              [directoryProjects.length, "Total projects"],
              [liveProjects.length, "Live websites"],
              [clientProjects.length, "Case studies"],
              [
                directoryProjects.length - liveProjects.length,
                "Archived projects",
              ],
            ].map(([value, label]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {String(value).padStart(2, "0")}
                  <span aria-hidden="true">↗</span>
                </dd>
              </div>
            ))}
          </dl>
          <details className="archive-story">
            <summary>
              Behind the work{" "}
              <span className="accordion-symbol" aria-hidden="true" />
            </summary>
            <div className="archive-story-copy">
              <p className="mt-6 text-ink/60 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                Everything below was built and shipped to production. The work
                splits three ways: storefronts on WooCommerce and Shopify where
                catalogue, checkout and speed on a mid-range phone decide the
                outcome; custom builds on Next.js where the business model is
                unusual enough that a platform gets in the way — multi-vendor
                marketplaces, B2B quoting engines, maritime procurement; and
                content-led sites for firms whose customers research before they
                enquire.
              </p>
              <p className="mt-4 text-ink/60 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                {clientProjects.length} of them have a written case study
                covering the brief, the build and the stack. The rest link
                straight through to the live site — click any of them and judge
                the work directly.
                {directoryProjects.length > liveProjects.length && (
                  <>
                    {" "}
                    {directoryProjects.length - liveProjects.length} older
                    projects whose domains have since lapsed are marked offline
                    and kept here as a record of the work.
                  </>
                )}
              </p>
              <p className="mt-6 text-ink/65 text-sm">
                Looking for a specific capability?{" "}
                <Link
                  href="/hire-web-developer-in-lucknow"
                  className="text-ink hover:text-ink transition-colors underline underline-offset-4"
                >
                  Hire a web developer in {LOCALITY}
                </Link>
                .
              </p>
            </div>
          </details>
        </section>

        <section
          className="archive-selected section-shell"
          aria-labelledby="selected-work-heading"
        >
          <div className="project-section-heading">
            <p className="project-eyebrow">01 / In focus</p>
            <h2 id="selected-work-heading">A closer look.</h2>
            <span className="project-section-note">
              The brief. The build. The details.
            </span>
          </div>
          <div className="archive-feature-grid">
            {clientProjects
              .filter((project) => project.featured)
              .slice(0, 2)
              .map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`archive-feature archive-feature-${index + 1}`}
                  data-motion-reveal="image"
                >
                  <div className="archive-feature-art">
                    <span className="archive-feature-index">
                      Selected project / 0{index + 1}
                    </span>
                    <div className="archive-feature-screen">
                      <ViewTransition
                        name={`project-${project.slug}`}
                        share="morph"
                        default="none"
                      >
                        <Image
                          src={project.images[0]}
                          alt={`${project.name} — ${project.tagline}`}
                          fill
                          sizes="(max-width: 760px) 90vw, 550px"
                          placeholder={
                            projectPlaceholders[project.images[0]]
                              ? "blur"
                              : "empty"
                          }
                          blurDataURL={projectPlaceholders[project.images[0]]}
                          className="object-cover object-top"
                        />
                      </ViewTransition>
                    </div>
                    <span className="archive-feature-open" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="archive-feature-caption">
                    <div>
                      <p className="project-eyebrow">{project.type}</p>
                      <h3>{project.name}</h3>
                      <p>{project.tagline}</p>
                    </div>
                    <span className="project-text-link">
                      View case study <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section
          id="project-directory"
          className="archive-directory section-shell"
          aria-labelledby="archive-heading"
        >
          <div className="project-section-heading">
            <p className="project-eyebrow">02 / The full collection</p>
            <h2 id="archive-heading">Explore the archive.</h2>
            <span className="project-section-note">
              Find your kind of project.
            </span>
          </div>
          <WorkDirectory hasShot={hasShot} />
        </section>
        <section
          className="archive-invitation section-shell"
          data-motion-reveal="rise"
        >
          <p className="project-eyebrow">Your project could be next</p>
          <Link href="/hire-web-developer-in-lucknow">
            Let’s build something
            <br />
            <em>worth exploring.</em>
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
