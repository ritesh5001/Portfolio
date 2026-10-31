import Link from "next/link";
import Image from "next/image";
import { projectPlaceholders } from "../generated/projectPlaceholders";
import ProjectGallery from "./ProjectGallery";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function ProjectDetail({ project, previous, next }) {
  const adjacent = [
    { project: previous, label: "Previous project" },
    { project: next, label: "Next project" },
  ].filter((item) => item.project);
  return (
    <div className="case-study project-editorial">
      <main id="main-content" className="content-page">
        <section className="case-hero section-shell">
          <nav aria-label="Breadcrumb" className="project-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span>{project.name}</span>
          </nav>
          <div className="case-hero-label">
            <p className="project-eyebrow">
              Client work /{" "}
              {project.featured ? "Featured case study" : "Case study"}
            </p>
            <span className="case-project-status">
              <i
                className={
                  project.liveUrl
                    ? "project-status-dot"
                    : "project-status-dot is-archived"
                }
              />
              {project.liveUrl ? "Live project" : "Archived project"}
            </span>
          </div>
          <h1 data-motion-reveal="headline">{project.name}</h1>
          <div className="case-hero-description">
            <p>{project.tagline}</p>
            <div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="project-pill-link"
                >
                  Visit Live Site <Arrow />
                </a>
              )}
              <a href="#project-overview" className="project-text-link">
                Explore the project <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <dl className="case-hero-facts">
            <div>
              <dt>Expertise</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{project.domain}</dd>
            </div>
          </dl>
        </section>

        <section
          className="case-visual section-shell"
          aria-label="Project gallery"
          data-motion-reveal="image"
        >
          <ProjectGallery key={project.slug} project={project} />
        </section>

        <section id="project-overview" className="case-story section-shell">
          <aside className="case-story-aside">
            <div className="case-project-info">
              <p className="project-eyebrow">The project at a glance</p>
              <h2>Project Info</h2>
              <dl>
                <div>
                  <dt>Domain</dt>
                  <dd>{project.domain}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{project.type}</dd>
                </div>
              </dl>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="project-text-link"
                >
                  Visit Site <Arrow />
                </a>
              )}
              {!project.liveUrl && (
                <p className="case-archive-note">
                  Archived work. The original domain is no longer linked.
                </p>
              )}
            </div>
            <Link
              href="/hire-web-developer-in-lucknow"
              className="case-hire-link"
            >
              <span>
                Have a project in mind?<strong>Need something similar?</strong>
              </span>
              <Arrow />
            </Link>
          </aside>
          <div className="case-story-main">
            <section className="case-story-section" data-motion-reveal="rise">
              <span className="case-section-number">01 / The brief</span>
              <h2>Project Overview</h2>
              <p className="case-overview-copy">{project.description}</p>
            </section>
            <section className="case-story-section" data-motion-reveal="rise">
              <span className="case-section-number">
                02 / What went into it
              </span>
              <h2>Key Deliverables</h2>
              <ol className="case-deliverables">
                {project.deliverables.map((deliverable, index) => (
                  <li key={deliverable}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{deliverable}</p>
                    <Arrow />
                  </li>
                ))}
              </ol>
            </section>
            <section className="case-story-section" data-motion-reveal="rise">
              <span className="case-section-number">03 / Under the hood</span>
              <h2>Tech Stack</h2>
              <div className="case-tech-stack">
                {project.tech.map((tech, index) => (
                  <span key={tech}>
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>
        <nav className="case-more section-shell" aria-label="More case studies">
          <div className="project-section-heading">
            <p className="project-eyebrow">Keep exploring</p>
            <h2>More good work.</h2>
            <Link href="/work" className="project-text-link">
              All Projects <Arrow />
            </Link>
          </div>
          <div
            className={
              "case-more-grid " + (adjacent.length === 1 ? "has-one" : "")
            }
          >
            {adjacent.map(({ project: item, label }) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="case-related"
                data-motion-reveal="image"
              >
                <div className="case-related-visual">
                  <Image
                    src={item.images[0]}
                    fill
                    sizes="(max-width: 760px) 90vw, 560px"
                    alt={`${item.name} — ${item.tagline}`}
                    placeholder={
                      projectPlaceholders[item.images[0]] ? "blur" : "empty"
                    }
                    blurDataURL={projectPlaceholders[item.images[0]]}
                    className="object-cover object-top"
                  />
                  <span className="case-related-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="case-related-caption">
                  <div>
                    <p className="project-eyebrow">{label}</p>
                    <h3>{item.name}</h3>
                  </div>
                  <span>{item.type}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
}
