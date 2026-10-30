import { contactInfo, socials } from "../constants";
import Arrow from "../components/Arrow";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section-shell section-space"
    >
      <div className="contact-intro">
        <p className="eyebrow">04 / Contact Me</p>
        <p>
          Interested in collaborating, hiring, or building a product? Let’s
          connect and discuss your next engineering challenge.
        </p>
      </div>
      <h2 className="contact-title">
        <a href={"mailto:" + contactInfo.email}>
          Let’s talk
          <span className="circle-link">
            <Arrow />
          </span>
        </a>
      </h2>
      <div className="contact-grid">
        <div>
          <span className="eyebrow availability">
            <span />
            Available for work
          </span>
          <h3>
            Let’s talk about product builds, team support, or freelance work.
          </h3>
          <p>
            If you need a full-stack engineer who can move from UI to backend to
            deployment without losing momentum, reach out directly.
          </p>
          <a className="solid-button" href={"mailto:" + contactInfo.email}>
            Hire Me <Arrow />
          </a>
        </div>
        <div className="contact-addresses">
          <a href={"mailto:" + contactInfo.email}>
            <span className="eyebrow">Email</span>
            <span>
              {contactInfo.email}
              <Arrow />
            </span>
          </a>
          <a href={"tel:" + contactInfo.phone.replace(/[^+\d]/g, "")}>
            <span className="eyebrow">Phone</span>
            <span>
              {contactInfo.phone}
              <Arrow />
            </span>
          </a>
          <div>
            <span className="eyebrow">Location</span>
            <p>{contactInfo.location}</p>
            <p className="contact-note">
              Best way to reach me is email. I usually respond quickly to
              product, freelance, and collaboration inquiries.
            </p>
          </div>
        </div>
      </div>
      <div className="contact-socials">
        <span className="eyebrow">Social Media</span>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target={social.name === "Email" ? undefined : "_blank"}
            rel={social.name === "Email" ? undefined : "noopener noreferrer"}
          >
            {social.name}
            <Arrow />
          </a>
        ))}
      </div>
      <div className="contact-tags eyebrow">
        <span>Let’s Build</span>
        <span>Open for Work</span>
        <span>Freelance & Full-Time</span>
        <span>Let’s Chat</span>
        <span>Get In Touch</span>
      </div>
    </section>
  );
}
