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

const highlights = [
  { value: "50+", label: "live websites" },
  { value: "10+", label: "MERN applications" },
  { value: "4", label: "flagship projects" },
];

export default function About() {
  return (
    <section id="about" className="about-section section-shell section-space">
      <SectionHeading
        number="01"
        title="About"
        subtitle="Professional Experience, Education & Achievements"
        description="Software engineer focused on high-impact product delivery, modern architecture, and measurable business outcomes."
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
            Building reliable products with strong engineering fundamentals.
          </h3>
          <p className="body-copy">
            I build full-stack systems that connect strong UX with robust
            backend engineering. My focus areas include scalable architecture,
            real-time communication, and AI-powered product experiences.
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
        50+ refers to WordPress websites maintained. The full directory tracks{" "}
        {liveProjects.length} currently live sites and{" "}
        {directoryProjects.length - liveProjects.length} archived projects (
        {directoryProjects.length} entries).
      </p>
      <div className="about-focus">
        <div>
          <h3 className="eyebrow">Current Focus</h3>
          <ul>
            <li>Product-minded full-stack development</li>
            <li>Enterprise workflows and clean system design</li>
            <li>AI features, real-time chat, and scalable APIs</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">Based In</h3>
          <p>{contactInfo.location}</p>
          <p>Open to full-time, freelance, and contract product work.</p>
        </div>
      </div>
      <div className="experience-layout">
        <h3 className="eyebrow">Experience</h3>
        <div className="experience-list">
          {experienceData.map((experience) => (
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
        <details>
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
          <details key={group.title}>
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
