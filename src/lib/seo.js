import { contactInfo, socials } from "../constants";

export const SITE_URL = "https://riteshgiri.dev";
// Crawler-facing images stay JPEG; WebP og:image is unreliable on LinkedIn/WhatsApp.
export const PROFILE_IMAGE = `${SITE_URL}${contactInfo.profileImageOg}`;

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const homeSeo = {
  title: "Ritesh Kumar Giri | Freelance Full-Stack Developer in India",
  description:
    "Hire Ritesh Kumar Giri, a freelance full-stack developer in India building React, Next.js, Node.js, WordPress, WooCommerce, and AI-powered products for clients worldwide.",
  canonical: `${SITE_URL}/`,
  image: PROFILE_IMAGE,
  imageAlt: "Ritesh Kumar Giri freelance full-stack developer portfolio",
  type: "website",
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: contactInfo.name,
      url: `${SITE_URL}/`,
      image: PROFILE_IMAGE,
      jobTitle: "Freelance Full-Stack Developer",
      email: `mailto:${contactInfo.email}`,
      telephone: contactInfo.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressCountry: "IN",
      },
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
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Ritesh Kumar Giri Portfolio",
      inLanguage: "en-IN",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: homeSeo.title,
      description: homeSeo.description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: PROFILE_IMAGE,
      },
    },
  ],
};

export const buildProjectSeo = (project) => {
  const canonical = `${SITE_URL}/projects/${project.slug}`;
  const image = absoluteUrl(project.ogImage || contactInfo.profileImageOg);
  const title = `${project.name} Case Study | Freelance Full-Stack Developer`;
  const description = `${project.tagline}. ${project.description}`;
  const trimmedDescription =
    description.length > 155
      ? `${description.slice(0, 152).trimEnd()}...`
      : description;

  return {
    title,
    description: trimmedDescription,
    canonical,
    image,
    imageAlt: `${project.name} project screenshot by Ritesh Kumar Giri`,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${canonical}#creativework`,
      name: `${project.name} Case Study`,
      headline: title,
      description: project.description,
      url: canonical,
      image,
      inLanguage: "en-IN",
      creator: {
        "@id": `${SITE_URL}/#person`,
      },
      about: project.tagline,
      keywords: [
        project.type,
        project.role,
        ...project.tech,
        "Freelance Full-Stack Developer",
      ],
      sameAs: project.liveUrl,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
  };
};
