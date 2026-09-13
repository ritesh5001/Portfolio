import { clientProjects } from "../constants";
import { servicePages } from "../constants/services";
import { SITE_URL } from "../lib/seo";

/**
 * Generated from the same data that generates the routes, so a sitemap entry
 * can no longer point at a page that does not exist. The previous static
 * sitemap.xml advertised 13 URLs that all returned 404.
 */
export default function sitemap() {
  const lastModified = new Date();

  // Paths are slash-free so each entry matches the canonical tag Next emits
  // (it normalises "https://riteshgiri.dev/" to "https://riteshgiri.dev").
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/hire-web-developer-in-lucknow", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/services", priority: 0.7 },
    { path: "/about", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: route.priority,
    })),
    ...servicePages.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...clientProjects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
