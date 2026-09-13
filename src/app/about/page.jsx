import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import PageNav from "../../components/PageNav";
import SiteFooter from "../../components/SiteFooter";
import {
  achievements,
  certifications,
  contactInfo,
  educationData,
  experienceData,
  leadership,
  socials,
} from "../../constants";
import { directoryProjects } from "../../constants/directory";
import {
  LOCALITY,
  REGION,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbs,
  buildMetadata,
  personSchema,
} from "../../lib/seo";

const title = `About Ritesh Kumar Giri — Full-Stack Developer in ${LOCALITY}`;
const description = `Ritesh Kumar Giri is a full-stack developer based in Lucknow, Uttar Pradesh. Software engineer at CleanShip (MariBiz.ai) and founder of NextGen Fusion, with ${directoryProjects.length}+ sites in production.`;

export const metadata = buildMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      {
        "@type": "AboutPage",
        "@id": `${absoluteUrl("/about")}#webpage`,
        url: absoluteUrl("/about"),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      buildBreadcrumbs([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
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
                <li className="text-white/60">About</li>
              </ol>
            </nav>

            <div className="grid gap-8 md:grid-cols-[240px_1fr] items-start">
              <img
                src={contactInfo.profileImage}
                alt={`${contactInfo.name}, full-stack developer based in ${LOCALITY}, India`}
                width="480"
                height="600"
                className="w-full rounded-2xl border border-white/10 object-cover object-top"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase leading-tight">
                  {contactInfo.name}
                </h1>
                <p className="mt-3 text-white/50 text-lg">
                  Full-Stack Developer · {LOCALITY}, {REGION}, India
                </p>
                <p className="mt-6 text-white/65 text-lg font-light leading-relaxed">
                  I build full-stack systems that connect a usable interface to a
                  backend that holds up. Day to day that means software
                  engineering at CleanShip on the MariBiz.ai maritime
                  marketplace, and running NextGen Fusion, my own company,
                  through which most of my client work ships.
                </p>
                <p className="mt-4 text-white/65 text-lg font-light leading-relaxed">
                  {directoryProjects.length} sites are live in production —
                  e-commerce storefronts on WooCommerce and Shopify, B2B
                  marketplaces and quoting engines on Next.js, and content-led
                  sites for manufacturers, engineering firms and institutes.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {socials
                    .filter((social) => social.name !== "Email")
                    .map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="me noopener"
                        className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:border-white hover:text-white transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.25em] text-black"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14 border-b border-white/[0.08]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
              Experience
            </h2>
            <div className="mt-8 space-y-5">
              {experienceData.map((experience) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="text-xl text-white font-light">
                      {experience.role}
                    </h3>
                    <p className="text-sm text-white/45">{experience.duration}</p>
                  </div>
                  <p className="mt-1 text-white/60">
                    {experience.company} · {experience.location} (
                    {experience.mode})
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/55 font-light list-disc pl-5">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 py-14">
          <div className="mx-auto max-w-4xl grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-light uppercase tracking-tight">
                Education
              </h2>
              <p className="mt-4 text-white/80">{educationData.degree}</p>
              <p className="mt-2 text-white/55 text-sm">
                {educationData.institute}
              </p>
              <p className="mt-1 text-white/45 text-sm">
                {educationData.location} · {educationData.duration}
              </p>
            </article>

            <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-light uppercase tracking-tight">
                Certifications
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/55 font-light list-disc pl-5">
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-light uppercase tracking-tight">
                Achievements
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/55 font-light list-disc pl-5">
                {achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-light uppercase tracking-tight">
                Leadership
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/55 font-light list-disc pl-5">
                {leadership.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mx-auto max-w-4xl mt-10 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              See the work
            </Link>
            <Link
              href="/hire-web-developer-in-lucknow"
              className="rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
            >
              Hire me in {LOCALITY}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
