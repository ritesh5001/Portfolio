import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import Arrow from "../components/Arrow";
import CountUp from "../components/CountUp";
import { directoryProjects, liveProjects } from "../constants/directory";
import {
  achievements,
  certifications,
  contactInfo,
  educationData,
  experienceData,
  leadership,
} from "../constants";

// Rounded down to the nearest 5 so it never overstates the directory count.
const liveRounded = Math.floor(liveProjects.length / 5) * 5 + "+";
const highlights = [
  { value: liveRounded, label: "live client websites" },
  { value: "10+", label: "MERN applications" },
  { value: "4", label: "flagship projects" },
];

export default function About() {
  return (
    <section id="about" className="about-section section-shell section-space">
      <SectionHeading
        number="01"
        title="About"
        subtitle="Who you'd be working with"
        description="Freelance developer for businesses that need a website or web app built properly, launched, and looked after."
      />
      <div className="about-intro">
        <div className="about-name">
          <span className="eyebrow">Professional Summary</span>
          <p>
            {contactInfo.name}
            <br />
            <span>{contactInfo.title}</span>
          </p>
          <Link href="/about" className="text-link">
            About Ritesh <Arrow />
          </Link>
        </div>
        <div>
          <h3 className="about-statement">
            Websites and web apps that work for your business, built by one
            developer from design to launch.
          </h3>
          <p className="body-copy">
            I take a project from first call to live site: UI, backend,
            payments, hosting and the fixes after launch. Day to day I also
            build MaribiZ, a B2B maritime SaaS, so client work gets the same
            engineering standards as a production product.
          </p>
        </div>
      </div>
      <div className="stats-grid">
        {highlights.map((item) => (
          <div key={item.label}>
            <CountUp value={item.value} />
            <span className="eyebrow">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="stats-context">
        Counted from the project directory: {liveProjects.length} sites live
        today, plus {directoryProjects.length - liveProjects.length} earlier
        projects that are no longer online.
      </p>
      <div className="about-focus">
        <div>
          <h3 className="eyebrow">What I build</h3>
          <ul>
            <li>WordPress, WooCommerce and Shopify stores</li>
            <li>Custom Next.js and MERN web apps</li>
            <li>AI features, real-time chat, and APIs</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">Based In</h3>
          <p>{contactInfo.location}</p>
          <p>
            Taking on freelance projects for businesses in Lucknow and across
            India.
          </p>
        </div>
      </div>
      <div className="experience-layout">
        <h3 className="eyebrow">Experience</h3>
        <div className="experience-list">
          {/* Freelance work first: the homepage speaks to clients. */}
          {[...experienceData]
            .sort((a, b) => (b.mode === "Freelance") - (a.mode === "Freelance"))
            .map((experience) => (
              <article key={experience.company} className="experience-row">
                <div className="experience-top">
                  <div>
                    <h4>{experience.role}</h4>
                    <p>
                      {experience.company} | {experience.location} (
                      {experience.mode})
                    </p>
                  </div>
                  <span className="eyebrow">{experience.duration}</span>
                </div>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      </div>
      <div className="background-grid">
        <details open>
          <summary>
            Education <span className="accordion-symbol" aria-hidden="true" />
          </summary>
          <div>
            <p>{educationData.degree}</p>
            <p>{educationData.institute}</p>
            <p>
              {educationData.location} | {educationData.duration}
            </p>
          </div>
        </details>
        {[
          { title: "Certifications", items: certifications },
          { title: "Achievements", items: achievements },
          { title: "Leadership", items: leadership },
        ].map((group) => (
          <details key={group.title} open={group.title === "Certifications"}>
            <summary>
              {group.title}
              <span className="accordion-symbol" aria-hidden="true" />
            </summary>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
