import Link from "next/link";
import { contactInfo } from "../constants";

const links = [
  { href: "/work", label: "Work" },
  { href: "/hire-web-developer-in-lucknow", label: "Hire me" },
  { href: "/about", label: "About" },
];

/**
 * Server-rendered header for the standalone content pages. Deliberately plain
 * anchors — the home page's animated drawer nav is a client component and is
 * not needed here.
 */
const PageNav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]">
    <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-5">
      <Link
        href="/"
        className="text-xs tracking-[0.35em] uppercase text-white/80 hover:text-white transition-colors"
      >
        {contactInfo.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-5 md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/55 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default PageNav;
