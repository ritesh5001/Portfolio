import { useEffect } from "react";

const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const ensureMeta = (attribute, key) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  return element;
};

const setMeta = (attribute, key, content) => {
  if (!content) return;
  ensureMeta(attribute, key).setAttribute("content", content);
};

const setCanonical = (href) => {
  if (!href) return;

  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const setStructuredData = (jsonLd) => {
  if (!jsonLd) return;

  let element = document.head.querySelector("#seo-json-ld");

  if (!element) {
    element = document.createElement("script");
    element.id = "seo-json-ld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(jsonLd);
};

const SEO = ({
  title,
  description,
  canonical,
  image,
  imageAlt,
  type = "website",
  robots = DEFAULT_ROBOTS,
  jsonLd,
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }

    setMeta("name", "description", description);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:description", description);
    setMeta("name", "robots", robots);
    setMeta("name", "googlebot", "index, follow");
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", imageAlt);
    setCanonical(canonical);
    setStructuredData(jsonLd);
  }, [canonical, description, image, imageAlt, jsonLd, robots, title, type]);

  return null;
};

export default SEO;
