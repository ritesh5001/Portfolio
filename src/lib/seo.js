import { contactInfo, socials } from "../constants";

// Canonical host is www. Vercel's own domain settings already redirect the
// apex (riteshgiri.dev) -> www at the platform level, so this file just has to
// agree with that rather than adding a second, conflicting app-level redirect.
export const SITE_URL = "https://www.riteshgiri.dev";

export const LOCALITY = "Lucknow";
export const REGION = "Uttar Pradesh";

// Crawler-facing images stay JPEG/PNG; WebP og:image is unreliable on
// LinkedIn/WhatsApp. 1200x630 landscape so social cards do not crop.
export const OG_IMAGE = `${SITE_URL}/images/og-card.png`;

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const homeSeo = {
  title: `Ritesh Giri — Freelance Full-Stack & WordPress Developer in ${LOCALITY}`,
  description:
    "Freelance full-stack and WordPress developer based in Lucknow. 50+ live websites, MERN and Next.js products, WooCommerce and Shopify builds for clients across India. Available for project work.",
  canonical: `${SITE_URL}/`,
};

/**
 * Builds a Next.js Metadata object. Every page goes through here so the
 * canonical host, OG card and Twitter card can never drift apart again.
 */
export const buildMetadata = ({
  title,
  description,
  path = "/",
  image = OG_IMAGE,
  imageAlt = "Ritesh Kumar Giri — freelance full-stack developer in Lucknow, India",
  type = "website",
  noIndex = false,
}) => {
  const canonical = absoluteUrl(path);

  return {
    // Absolute: every title below is written in full, so the layout's
    // "%s | Ritesh Giri" template must not append the name a second time.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: "en_IN",
      siteName: "Ritesh Kumar Giri",
      title,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
};

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: contactInfo.name,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  jobTitle: "Freelance Full-Stack Developer",
  email: `mailto:${contactInfo.email}`,
  telephone: contactInfo.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCALITY,
    addressRegion: REGION,
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: LOCALITY },
    { "@type": "State", name: REGION },
    { "@type": "Country", name: "India" },
  ],
  sameAs: socials
    .filter((social) => social.name !== "Email")
    .map((social) => social.href),
  knowsAbout: [
    "Freelance Full-Stack Development",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "WordPress",
    "WooCommerce",
    "Shopify",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Socket.IO",
    "AI Integrations",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],
  worksFor: {
    "@type": "Organization",
    name: "CleanShip (MariBiz.ai)",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Babu Banarasi Das Northern India Institute of Technology",
  },
};

// A ProfessionalService entity is what local queries ("web developer in
// Lucknow") actually match against; Person alone does not carry service intent.
export const serviceSchema = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "Ritesh Kumar Giri — Freelance Web Development",
  url: `${SITE_URL}/hire-web-developer-in-lucknow`,
  image: OG_IMAGE,
  email: `mailto:${contactInfo.email}`,
  telephone: contactInfo.phone,
  priceRange: "$$",
  founder: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCALITY,
    addressRegion: REGION,
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: LOCALITY },
    { "@type": "State", name: REGION },
    { "@type": "Country", name: "India" },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "WordPress & WooCommerce Development",
        areaServed: LOCALITY,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Shopify Development",
        areaServed: LOCALITY,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "MERN & Next.js Product Development",
        areaServed: "India",
      },
    },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${SITE_URL}/`,
  name: "Ritesh Kumar Giri",
  inLanguage: "en-IN",
  publisher: { "@id": personId },
};

export const buildBreadcrumbs = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    serviceSchema,
    websiteSchema,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: homeSeo.title,
      description: homeSeo.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
    },
  ],
};

export const buildProjectSeo = (project) => {
  const path = `/projects/${project.slug}`;
  const image = absoluteUrl(project.ogImage || "/images/og-card.png");
  const title = `${project.name} — ${project.type} Case Study | Ritesh Giri`;
  const description = `${project.tagline}. ${project.description}`;
  const trimmedDescription =
    description.length > 155
      ? `${description.slice(0, 152).trimEnd()}...`
      : description;

  return {
    metadata: buildMetadata({
      title,
      description: trimmedDescription,
      path,
      image,
      imageAlt: `${project.name} — ${project.tagline}, built by Ritesh Kumar Giri`,
      type: "article",
    }),
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          "@id": `${absoluteUrl(path)}#creativework`,
          name: `${project.name} Case Study`,
          headline: title,
          description: project.description,
          url: absoluteUrl(path),
          image,
          inLanguage: "en-IN",
          creator: { "@id": personId },
          about: project.tagline,
          keywords: [
            project.type,
            project.role,
            ...project.tech,
            `Freelance Developer ${LOCALITY}`,
          ],
          // Omitted entirely when the client's domain is no longer live.
          ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
          isPartOf: { "@id": websiteId },
        },
        buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path },
        ]),
      ],
    },
  };
};
