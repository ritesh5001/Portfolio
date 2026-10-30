import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import ServiceSummary from "../sections/ServiceSummary";
import Services from "../sections/Services";
import About from "../sections/About";
import Works from "../sections/Works";
import ContactSummary from "../sections/ContactSummary";
import Contact from "../sections/Contact";

export default function HomeClient({ showBlog = false, footer = null }) {
  return (
    <>
      <Navbar showBlog={showBlog} />
      <main id="main-content" className="portfolio-home">
        <Hero />
        <About />
        <Works />
        <Services />
        <ServiceSummary />
        <ContactSummary />
        <Contact />
      </main>
      {footer}
    </>
  );
}
