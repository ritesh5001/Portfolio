import Link from "next/link";
import { servicesData } from "../constants";
import SectionHeading from "../components/SectionHeading";
import Arrow from "../components/Arrow";

export default function Services() {
  return (
    <section
      id="services"
      className="skills-section section-shell section-space"
    >
      <SectionHeading
        number="03"
        title="Skills"
        subtitle="Technical Skills"
        description="Technical stack and tools I use to architect, build, deploy, and scale modern digital products."
      />
      <div className="skills-list">
        {servicesData.map((service, index) => (
          <details className="skill-row" key={service.title} open={index === 0}>
            <summary>
              <span className="skill-number">0{index + 1}</span>
              <h3>{service.title}</h3>
              <span className="skill-preview">
                {service.items
                  .slice(0, 3)
                  .map((item) => item.title)
                  .join(" / ")}
              </span>
              <span className="skill-toggle">
                <Arrow direction="down" />
              </span>
            </summary>
            <div className="skill-content">
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      <Link href="/services" className="text-link services-page-link">
        Web development services in Lucknow <Arrow />
      </Link>
    </section>
  );
}
