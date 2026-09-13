import Link from "next/link";
import { contactInfo, socials } from "../constants";
import { LOCALITY, REGION } from "../lib/seo";

const serviceLinks = [
  { href: "/services/wordpress-woocommerce-development", label: "WordPress & WooCommerce Development" },
  { href: "/services/shopify-development", label: "Shopify Development" },
  { href: "/services/mern-nextjs-development", label: "MERN & Next.js Development" },
];

const siteLinks = [
  { href: "/hire-web-developer-in-lucknow", label: `Hire a Web Developer in ${LOCALITY}` },
  { href: "/work", label: "All Client Work" },
  { href: "/about", label: "About Ritesh" },
];

/**
 * Server-rendered footer. Every link here is a plain <a>/<Link> so the whole
 * site is reachable from any page without running JavaScript.
 */
const SiteFooter = () => (
  <footer className="bg-black text-white border-t border-white/10">
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-14 grid gap-10 md:grid-cols-4">
      <div className="space-y-3">
        <p className="text-lg tracking-wide">{contactInfo.name}</p>
        <p className="text-sm text-white/55 leading-relaxed">
          Freelance full-stack and WordPress developer based in {LOCALITY},{" "}
          {REGION}. Building for clients across India.
        </p>
        <a
          href={`mailto:${contactInfo.email}`}
          className="block text-sm text-white/70 hover:text-gold transition-colors"
        >
          {contactInfo.email}
        </a>
        <a
          href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
          className="block text-sm text-white/70 hover:text-gold transition-colors"
        >
          {contactInfo.phone}
        </a>
      </div>

      <nav className="space-y-3" aria-label="Services">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Services</p>
        <ul className="space-y-2">
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="space-y-3" aria-label="Site">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Explore</p>
        <ul className="space-y-2">
          {siteLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="space-y-3" aria-label="Elsewhere">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Elsewhere</p>
        <ul className="space-y-2">
          {socials
            .filter((social) => social.name !== "Email")
            .map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="me noopener"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {social.name}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>

    <div className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-6">
      <p className="mx-auto max-w-7xl text-xs text-white/40">
        © {new Date().getFullYear()} {contactInfo.name}. Freelance full-stack
        developer in {LOCALITY}, {REGION}, India.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
