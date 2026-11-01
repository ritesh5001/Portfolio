"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import Image from "next/image";
import { projectPlaceholders } from "../generated/projectPlaceholders";
import { clientProjects, projects } from "../constants";
import { liveProjects } from "../constants/directory";
import SectionHeading from "../components/SectionHeading";
import Arrow from "../components/Arrow";
import styles from "./Works.module.css";

// The homepage shows a short selection; /work has every project. Projects
// already featured in the section above are not repeated here.
const featuredSlugs = new Set(projects.map((p) => p.caseStudy).filter(Boolean));
const homeClientProjects = clientProjects
  .filter((project) => !featuredSlugs.has(project.slug))
  .slice(0, 6);
// The personal Tat Vivah capture is an old 503 screen; reuse its saved case-study image.
const previewOverrides = {
  "/assets/projects/personal/tatvivah.webp":
    "/assets/projects/tatvivahtrends/1.webp",
};
const projectCards = projects.map((project) => ({
  ...project,
  image: previewOverrides[project.image] ?? project.image,
}));

export default function Works() {
  return (
    <section
      id="work"
      className={`${styles.mobileCards} work-section section-shell section-space`}
    >
      <SectionHeading
        number="02"
        title="Projects"
        subtitle="Production Projects"
        description="Selected products built for scale, reliability, and measurable user impact across real deployments."
      />
      <div className="project-grid">
        {projectCards.map((project, index) => (
          <article key={project.id} className="project-card">
            <a
              href={
                project.caseStudy
                  ? "/projects/" + project.caseStudy
                  : project.liveUrl
              }
              {...(project.caseStudy
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className={"project-image project-image-" + index}
              aria-label={
                project.caseStudy
                  ? "Read the " + project.name + " case study"
                  : "View " + project.name + " live"
              }
            >
              <div className="project-browser-bar">
                <span />
                <span />
                <span />
                <span className="browser-address">
                  {new URL(project.liveUrl).hostname}
                </span>
                <Arrow />
              </div>
              <Image
                src={project.image}
                placeholder={
                  projectPlaceholders[project.image] ? "blur" : "empty"
                }
                blurDataURL={projectPlaceholders[project.image]}
                alt={project.imageAlt}
                width={1200}
                height={750}
                sizes="(max-width: 700px) 100vw, 50vw"
                loading="lazy"
              />
              <span className="project-open circle-link">
                <Arrow />
              </span>
            </a>
            <div className="project-caption">
              <span className="eyebrow">
                0{index + 1} / Full-Stack Engineering
              </span>
              <div className="project-title-row">
                <h3>{project.name}</h3>
                <div className="project-links">
                  {project.caseStudy && (
                    <Link href={"/projects/" + project.caseStudy}>
                      Case study <Arrow />
                    </Link>
                  )}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live <Arrow />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code <Arrow />
                  </a>
                </div>
              </div>
              <p>{project.description}</p>
              <ul className="project-tech">
                {project.frameworks.map((framework) => (
                  <li key={framework.id}>{framework.name}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="client-section-heading">
        <div>
          <p className="eyebrow">Freelance & Client Work</p>
          <h2>Client Projects</h2>
        </div>
        <p>
          Production websites and platforms built for real businesses —
          e-commerce, B2B marketplaces, service platforms, and more.
        </p>
      </div>
      <div className="client-grid">
        {homeClientProjects.map((project) => (
          <article
            key={project.id}
            className={
              "client-project " + (project.featured ? "client-featured " : "")
            }
          >
            <Link
              href={"/projects/" + project.slug}
              className="client-project-image"
              aria-label={"Read the " + project.name + " case study"}
            >
              <ViewTransition
                name={"project-" + project.slug}
                share="morph"
                default="none"
              >
                <Image
                  src={project.images[0]}
                  placeholder={
                    projectPlaceholders[project.images[0]] ? "blur" : "empty"
                  }
                  blurDataURL={projectPlaceholders[project.images[0]]}
                  alt={project.name + " — " + project.tagline}
                  width={1200}
                  height={750}
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  loading="lazy"
                />
              </ViewTransition>
              <span className="client-type">{project.type}</span>
            </Link>
            <div className="client-project-title">
              <Link href={"/projects/" + project.slug}>
                <h3>{project.name}</h3>
              </Link>
              <Link
                href={"/projects/" + project.slug}
                className="circle-link"
                aria-label={"Read " + project.name + " case study"}
              >
                <Arrow />
              </Link>
            </div>
            <p className="client-tagline">{project.tagline}</p>
            {project.featured && (
              <>
                <span className="eyebrow featured-label">Featured</span>
                <details className="client-description-details">
                  <summary>
                    Project details{" "}
                    <span className="accordion-symbol" aria-hidden="true" />
                  </summary>
                  <p className="client-description">{project.description}</p>
                </details>
              </>
            )}
            <ul className="project-tech">
              {project.tech.slice(0, project.featured ? 4 : 3).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="client-project-bottom">
              <span>{project.domain}</span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site <Arrow />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <Link href="/work" className="all-work-link">
        <div>
          <span>See all {liveProjects.length} live sites</span>
          <p>
            {clientProjects.length} case studies plus every e-commerce, service
            and custom build delivered to date
          </p>
        </div>
        <span className="circle-link">
          <Arrow direction="right" />
        </span>
      </Link>
    </section>
  );
}
