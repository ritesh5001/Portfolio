"use client";

import ReactLenis from "lenis/react";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import ServiceSummary from "../sections/ServiceSummary";
import Services from "../sections/Services";
import About from "../sections/About";
import Works from "../sections/Works";
import ContactSummary from "../sections/ContactSummary";
import Contact from "../sections/Contact";

/**
 * The old build hid the entire page behind a loading overlay until the 3D
 * model reported 100%. That gated the LCP element on a 458KB .glb download, so
 * it is gone: the scene now fades in on its own once it is ready.
 *
 * `footer` arrives as an already-rendered server component. SiteFooter reads
 * the filesystem (to decide whether to link the blog), so importing it here
 * would drag node:fs into the browser bundle.
 */
const HomeClient = ({ showBlog = false, footer = null }) => (
  <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">
    <Navbar showBlog={showBlog} />
    <main>
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <ContactSummary />
      <Contact />
    </main>
    {footer}
  </ReactLenis>
);

export default HomeClient;
