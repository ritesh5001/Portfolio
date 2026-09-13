"use client";

import { useEffect, useRef, useState } from "react";
import { contactInfo, socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Every entry is a real href so crawlers can follow it. On the home page the
// in-page ones are intercepted for smooth scrolling; everywhere else they fall
// through to a normal navigation back to "/#section".
const navLinks = [
  { id: "home", label: "home", href: "/" },
  { id: "services", label: "skills", href: "/#services" },
  { id: "about", label: "about", href: "/#about" },
  { id: "work", label: "projects", href: "/#work" },
  { id: "contact", label: "contact", href: "/#contact" },
];

const pageLinks = [
  { label: "hire me in lucknow", href: "/hire-web-developer-in-lucknow" },
  { label: "all client work", href: "/work" },
  { label: "about ritesh", href: "/about" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(
        isOpen || currentScrollY <= lastScrollY || currentScrollY < 10
      );
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const closeMenu = () => {
    tl.current?.reverse();
    iconTl.current?.reverse();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
      return;
    }
    tl.current?.play();
    iconTl.current?.play();
    setIsOpen(true);
  };

  const handleSectionClick = (event, id) => {
    // Only hijack the click when the target section is on the current page.
    const target = document.getElementById(id);
    if (!isHomePage || !target) {
      closeMenu();
      return;
    }
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2 overflow-y-auto"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-7xl">
          {navLinks.map((section, index) => (
            <div key={section.id} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                href={section.href}
                className="transition-all duration-300 cursor-pointer hover:text-white"
                onClick={(event) => handleSectionClick(event, section.id)}
              >
                {section.label}
              </Link>
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-y-3 text-lg md:text-xl">
            {pageLinks.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={closeMenu}
                className="tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-gold"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm tracking-widest lowercase text-pretty hover:text-white"
            >
              {contactInfo.email}
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Phone</p>
            <a
              href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm tracking-widest text-pretty hover:text-white"
            >
              {contactInfo.phone}
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-sm tracking-widest uppercase hover:text-white transition-colors duration-300"
                  target={social.name === "Email" ? undefined : "_blank"}
                  rel={social.name === "Email" ? undefined : "noopener"}
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </button>
    </>
  );
};

export default Navbar;
