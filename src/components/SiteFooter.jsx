import Link from "next/link";
import { MotionToggle } from "./SiteMotion";
import { contactInfo, socials } from "../constants";
import { LOCALITY, REGION } from "../lib/seo";
import { getPost, hasPosts } from "../lib/blog";

const serviceLinks = [
  {
    href: "/services/wordpress-woocommerce-development",
    label: "WordPress & WooCommerce Development",
  },
  { href: "/services/shopify-development", label: "Shopify Development" },
  {
    href: "/services/mern-nextjs-development",
    label: "MERN & Next.js Development",
  },
];

const siteLinks = [
  {
    href: "/hire-web-developer-in-lucknow",
    label: `Hire a Web Developer in ${LOCALITY}`,
  },
  { href: "/work", label: "All Client Work" },
  { href: "/about", label: "About Ritesh" },
];

/**
 * Server-rendered footer. Every link here is a plain <a>/<Link> so the whole
 * site is reachable from any page without running JavaScript.
 */
const SiteFooter = () => {
  // The India guide is the hub for the city guides; linking it sitewide puts
  // every city page two clicks from anywhere on the site.
  const exploreLinks = [
    ...siteLinks,
    ...(hasPosts() ? [{ href: "/blog", label: "Blog" }] : []),
    ...(getPost("website-development-in-india")
      ? [
          {
            href: "/blog/website-development-in-india",
            label: "Web Development in India",
          },
        ]
      : []),
  ];

  return (
    <footer className="site-footer text-ink">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg tracking-wide">{contactInfo.name}</p>
          <p className="text-sm text-ink/70 leading-relaxed">
            Freelance full-stack and WordPress developer based in {LOCALITY},{" "}
            {REGION}. Building for clients across India.
          </p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="block text-sm text-ink/70 hover:text-ink transition-colors"
          >
            {contactInfo.email}
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
            className="block text-sm text-ink/70 hover:text-ink transition-colors"
          >
            {contactInfo.phone}
          </a>
        </div>

        <nav className="space-y-3" aria-label="Services">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">
            Services
          </p>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="space-y-3" aria-label="Site">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">
            Explore
          </p>
          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="space-y-3" aria-label="Elsewhere">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">
            Elsewhere
          </p>
          <ul className="space-y-2">
            {socials
              .filter((social) => social.name !== "Email")
              .map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="me noopener"
                    className="text-sm text-ink/70 hover:text-ink transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <div className="footer-signature" aria-hidden="true">
        Ritesh Giri
      </div>
      <div className="footer-bottom">
        <p className="mx-auto max-w-7xl text-xs text-ink/60">
          © {new Date().getFullYear()} {contactInfo.name}. Freelance full-stack
          developer in {LOCALITY}, {REGION}, India.
        </p>
        <div className="footer-controls">
          <MotionToggle />
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
