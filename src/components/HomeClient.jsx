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
import SiteFooter from "./SiteFooter";

/**
 * The old build hid the entire page behind a loading overlay until the 3D
 * model reported 100%. That gated the LCP element on a 458KB .glb download, so
 * it is gone: the scene now fades in on its own once it is ready.
 */
const HomeClient = () => (
  <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <ContactSummary />
      <Contact />
    </main>
    <SiteFooter />
  </ReactLenis>
);

export default HomeClient;
