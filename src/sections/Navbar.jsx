"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo, socials } from "../constants";
import Arrow from "../components/Arrow";

export default function Navbar({ showBlog = false }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);
  const isHome = pathname === "/";
  const links = [
    { label: "Home", href: "/", active: isHome },
    {
      label: "About",
      href: isHome ? "/#about" : "/about",
      active: pathname === "/about",
    },
    {
      label: "Services",
      href: isHome ? "/#services" : "/services",
      active: pathname.startsWith("/services"),
    },
    {
      label: "Projects",
      href: isHome ? "/#work" : "/work",
      active: pathname.startsWith("/work") || pathname.startsWith("/projects"),
    },
    ...(showBlog
      ? [{ label: "Blog", href: "/blog", active: pathname.startsWith("/blog") }]
      : []),
  ];

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={contactInfo.name + " — Home"}
        >
          RITESH GIRI<span className="wordmark-dot">®</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={"nav-pill " + (link.active ? "is-active" : "")}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="nav-social"
            href={socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            className="nav-contact"
            href={isHome ? "/#contact" : "/hire-web-developer-in-lucknow"}
          >
            Let’s talk <Arrow />
          </a>
          <button
            ref={menuButton}
            type="button"
            className={"menu-toggle " + (isOpen ? "is-open" : "")}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="expanded-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {isOpen && (
        <nav
          id="expanded-navigation"
          className="expanded-nav"
          aria-label="More navigation"
        >
          <div className="expanded-main-links">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <Arrow />
              </Link>
            ))}
          </div>
          <div className="expanded-extra-links">
            <Link
              href="/hire-web-developer-in-lucknow"
              onClick={() => setIsOpen(false)}
            >
              Hire me in Lucknow <Arrow />
            </Link>
            <Link href="/work" onClick={() => setIsOpen(false)}>
              All client work <Arrow />
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About Ritesh <Arrow />
            </Link>
            <a href={"mailto:" + contactInfo.email}>
              {contactInfo.email} <Arrow />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
