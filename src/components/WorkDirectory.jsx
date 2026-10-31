"use client";

import { useMemo } from "react";
import useAnimatedFilter from "./useAnimatedFilter";
import Link from "next/link";
import Image from "next/image";
import { directoryPlaceholders } from "../generated/directoryPlaceholders";
import { Icon } from "@iconify/react/dist/iconify.js";
import { directoryCategories, directoryProjects, liveProjects } from "../constants/directory";

// Filter the existing HTML rather than removing work from the crawlable archive.
export default function WorkDirectory({ hasShot }) {
  const { active, select, gridRef } = useAnimatedFilter({ category: "All", status: "all", query: "" });
  const counts = useMemo(() => {
    const map = { All: directoryProjects.length };
    directoryProjects.forEach((project) => { map[project.category] = (map[project.category] ?? 0) + 1; });
    return map;
  }, []);
  const matches = (project) => {
    const query = active.query.trim().toLowerCase();
    return (active.category === "All" || project.category === active.category)
      && (active.status === "all" || (active.status === "archived" ? project.offline : !project.offline))
      && (!query || `${project.name} ${project.domain} ${project.category}`.toLowerCase().includes(query));
  };
  const visibleCount = directoryProjects.filter(matches).length;
  const isFiltered = active.category !== "All" || active.status !== "all" || !!active.query;

  return (
    <>
      <div className="archive-tools">
        <div className="archive-status-filters" role="group" aria-label="Project status">
          {[["all", "All work", directoryProjects.length], ["live", "Live", liveProjects.length], ["archived", "Archived", directoryProjects.length - liveProjects.length]].map(([value, label, count]) => (
            <button key={value} type="button" aria-pressed={active.status === value} onClick={() => select({ ...active, status: value })}>{label} <span>{count}</span></button>
          ))}
        </div>
        <label className="archive-search">
          <Icon icon="lucide:search" aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input type="search" value={active.query} onChange={(event) => select({ ...active, query: event.target.value })} placeholder="Search a project or industry…" />
        </label>
      </div>
      <div className="archive-category-filters" role="group" aria-label="Project category">
        {directoryCategories.filter((category) => counts[category]).map((category) => (
          <button type="button" key={category} onClick={() => select({ ...active, category })} aria-pressed={category === active.category} className="directory-filter">
            {category}<span>{counts[category]}</span>
          </button>
        ))}
      </div>
      <div className="archive-results-bar">
        <p role="status" aria-live="polite" aria-atomic="true">Showing <strong>{String(visibleCount).padStart(2, "0")}</strong> of {directoryProjects.length} projects</p>
        {isFiltered ? <button type="button" onClick={() => select({ category: "All", status: "all", query: "" })}>Clear filters <span aria-hidden="true">×</span></button> : <span>Independent work. Real websites.</span>}
      </div>
      <ul ref={gridRef} data-filter-grid className="directory-grid">
        {directoryProjects.map((project, index) => {
          const shot = hasShot[project.slug] ? `/assets/directory/${project.slug}.webp` : null;
          const href = project.caseStudy ? `/projects/${project.caseStudy}` : project.offline ? null : project.url;
          const Preview = href ? (project.caseStudy ? Link : "a") : "div";
          return (
            <li key={project.slug} className={matches(project) ? "" : "hidden"}>
              <article className="directory-card">
                <Preview className="directory-preview" {...(href ? { href, ...(project.caseStudy ? {} : { target: "_blank", rel: "noopener" }) } : {})}>
                  <div className="directory-preview-top"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span className={project.offline ? "directory-status is-archived" : "directory-status"}><i />{project.offline ? "Archived" : "Live"}</span></div>
                  <div className="directory-screen">
                    {shot ? <Image src={shot} placeholder={directoryPlaceholders[shot] ? "blur" : "empty"} blurDataURL={directoryPlaceholders[shot]} sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 400px" alt={`${project.name} website homepage — ${project.category} site built by Ritesh Kumar Giri${project.offline ? " (archived screenshot)" : ""}`} fill loading="lazy" className="object-cover object-top" /> : <div className="directory-fallback"><span aria-hidden="true">{project.name.charAt(0)}</span><p>{project.domain}</p></div>}
                  </div>
                  {href && <span className="directory-preview-arrow" aria-hidden="true">↗</span>}
                </Preview>
                <div className="directory-card-info">
                  <div><h3>{project.name}</h3><p>{project.domain}</p></div>
                  <div className="directory-card-links">
                    {project.caseStudy && <Link href={`/projects/${project.caseStudy}`}>Case study <Icon icon="lucide:arrow-right" /></Link>}
                    {project.offline ? <span className="directory-offline">Offline <Icon icon="lucide:circle-off" /></span> : <a href={project.url} target="_blank" rel="noopener">Live site <Icon icon="lucide:arrow-up-right" /></a>}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {visibleCount === 0 && <div className="archive-empty"><span aria-hidden="true">↳</span><h3>No matching projects.</h3><p>Try a different name, category or status.</p><button type="button" onClick={() => select({ category: "All", status: "all", query: "" })} className="project-text-link">View all projects <span aria-hidden="true">↗</span></button></div>}
    </>
  );
}
