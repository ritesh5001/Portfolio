import Image from "next/image";
import { contactInfo } from "../constants";
import Arrow from "../components/Arrow";

export default function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-topline eyebrow">
        <span>{contactInfo.name}</span>
        <span>Independent developer · Portfolio</span>
      </div>
      <h1 className="hero-title">
        <span className="sr-only">{contactInfo.name} — </span>
        <span className="hero-line hero-line-first">Freelance</span>{" "}
        <span className="hero-line">Full-Stack Developer</span>{" "}
        <span className="hero-location">in Lucknow, India</span>
      </h1>
      <div className="hero-stage">
        <div className="hero-aside hero-aside-left">
          <span className="eyebrow">Based in {contactInfo.location}</span>
          <p className="availability">
            <span />
            Available for freelance work
          </p>
          <a
            href="#about"
            className="circle-link hero-scroll"
            aria-label="Explore about Ritesh"
          >
            <Arrow direction="down" />
          </a>
        </div>
        <figure className="hero-portrait">
          <Image
            src="/images/ritesh-editorial.png"
            alt="Ritesh Kumar Giri, freelance full-stack developer in Lucknow, India"
            width={1024}
            height={1536}
            preload
            sizes="(max-width: 600px) 90vw, 500px"
          />
          <figcaption>
            {contactInfo.name}
            <span>{contactInfo.title}</span>
          </figcaption>
        </figure>
        <div className="hero-aside hero-aside-right">
          <p>
            {contactInfo.name} builds React, Next.js, Node.js, WordPress,
            WooCommerce, and AI-powered products for clients in Lucknow and
            across India.
          </p>
          <div className="hero-disciplines">
            <span>Full-Stack Engineering</span>
            <span>WordPress & WooCommerce</span>
            <span>AI Integrations</span>
            <span>Cloud & CI/CD</span>
          </div>
        </div>
      </div>
      <div className="hero-bottomline eyebrow">
        <a href="#work">
          Explore the work <Arrow direction="down" />
        </a>
        <span>Code with purpose. Built to last.</span>
        <span>
          Lucknow, IN <span className="small-star">✳</span>
        </span>
      </div>
    </section>
  );
}
