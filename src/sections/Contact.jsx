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
          Need a new website, an online store, or a web app? Tell me what you
          have in mind and I’ll reply with a plan and a quote.
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
            Taking on new projects
          </span>
          <h3>Let’s build a robust, future-ready website for your business.</h3>
          <p>
            One developer from design to launch: UI, backend, payments, hosting,
            and support after go-live.
          </p>
          <div className="contact-actions">
            <a
              className="solid-button"
              href={
                "mailto:" +
                contactInfo.email +
                "?subject=" +
                encodeURIComponent("Website quote request")
              }
            >
              Get a quote <Arrow />
            </a>
            <a
              className="outline-button"
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <Arrow />
            </a>
          </div>
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
            <span className="eyebrow">Phone / WhatsApp</span>
            <span>
              {contactInfo.phone}
              <Arrow />
            </span>
          </a>
          <div>
            <span className="eyebrow">Location</span>
            <p>{contactInfo.location}</p>
            <p className="contact-note">
              Email or WhatsApp are quickest. I usually reply the same day.
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
    </section>
  );
}
