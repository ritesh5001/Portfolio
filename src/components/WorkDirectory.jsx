"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { directoryCategories, directoryProjects } from "../constants/directory";

/**
 * Client-side filtering only hides cards that are already in the HTML, so every
 * project stays crawlable regardless of the selected category.
 */
const WorkDirectory = ({ hasShot }) => {
  const [active, setActive] = useState("All");

  const counts = useMemo(() => {
    const map = { All: directoryProjects.length };
    for (const project of directoryProjects) {
      map[project.category] = (map[project.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const categories = directoryCategories.filter((category) => counts[category]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              type="button"
              key={category}
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`text-[11px] tracking-[0.25em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-white/55 hover:text-white hover:border-white/40"
              }`}
            >
              {category}
              <span className={isActive ? "text-black/50" : "text-white/30"}>
                {" "}
                {counts[category]}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {directoryProjects.map((project) => {
          const visible = active === "All" || project.category === active;
          const shot = hasShot[project.slug]
            ? `/assets/directory/${project.slug}.webp`
            : null;

          return (
            <li key={project.slug} className={visible ? "" : "hidden"}>
              <article className="group h-full overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] hover:border-white/20 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
                  {shot ? (
                    <img
                      src={shot}
                      alt={`${project.name} website homepage — ${project.category} site built by Ritesh Kumar Giri`}
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="750"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/25 text-xs tracking-[0.3em] uppercase px-4 text-center">
                      {project.domain}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[9px] tracking-[0.25em] uppercase text-white/60 bg-black/55 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base text-white font-light leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5 tracking-wide">
                      {project.domain}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    {project.caseStudy && (
                      <Link
                        href={`/projects/${project.caseStudy}`}
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-gold hover:text-white transition-colors"
                      >
                        Case study
                        <Icon icon="lucide:arrow-right" className="size-3" />
                      </Link>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-white/45 hover:text-white transition-colors"
                    >
                      Live site
                      <Icon icon="lucide:arrow-up-right" className="size-3" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WorkDirectory;
