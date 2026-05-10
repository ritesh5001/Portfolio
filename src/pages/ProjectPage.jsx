import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clientProjects } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SEO from "../components/SEO";
import { buildProjectSeo } from "../lib/seo";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = clientProjects.find((p) => p.slug === slug);

  const [activeImage, setActiveImage] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(heroRef.current, { opacity: 0, y: 60, duration: 1, ease: "power3.out" });
    tl.from(imageRef.current, { opacity: 0, scale: 0.96, duration: 1, ease: "power2.out" }, "<+0.2");
    tl.from(
      contentRef.current?.querySelectorAll(".reveal-item"),
      { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power2.out" },
      "<+0.3"
    );
  }, [slug]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6">
        <p className="text-2xl tracking-widest uppercase font-light">Project not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm tracking-[0.3em] uppercase border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  const prevImage = () => setActiveImage((i) => (i - 1 + project.images.length) % project.images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % project.images.length);
  const projectSeo = buildProjectSeo(project);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO {...projectSeo} />
      {/* Sticky nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-white/60 hover:text-white transition-colors duration-300 group"
        >
          <Icon
            icon="lucide:arrow-left"
            className="size-4 group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back
        </button>
        <span className="text-xs tracking-[0.45em] uppercase text-white/40 hidden sm:block">
          {project.domain}
        </span>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-white/60 hover:text-white transition-colors duration-300"
          >
            Visit Site
            <Icon icon="lucide:arrow-up-right" className="size-4" />
          </a>
        )}
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section ref={heroRef} className="px-6 md:px-10 lg:px-16 pt-10 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 border border-white/15 px-3 py-1.5 rounded-full">
                  {project.type}
                </span>
                <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 border border-white/15 px-3 py-1.5 rounded-full">
                  {project.role}
                </span>
                {project.featured && (
                  <span className="text-[10px] tracking-[0.5em] uppercase text-black bg-white px-3 py-1.5 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight uppercase">
                {project.name}
              </h1>
              <p className="text-white/50 text-base md:text-lg lg:text-xl font-light max-w-2xl">
                {project.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section ref={imageRef} className="px-6 md:px-10 lg:px-16 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.images[activeImage]}
                  alt={`${project.name} screenshot ${activeImage + 1}`}
                  className="w-full h-full object-cover object-top transition-opacity duration-500"
                  key={activeImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
              </div>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="lucide:chevron-left" className="size-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="lucide:chevron-right" className="size-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === activeImage ? "bg-white w-6" : "bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {project.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-1 aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      i === activeImage ? "border-white" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={img} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover object-top" />
                    {i !== activeImage && (
                      <div className="absolute inset-0 bg-black/50" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content Grid */}
        <section ref={contentRef} className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left column */}
            <div className="space-y-8">
              {/* Overview */}
              <div className="reveal-item rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 space-y-4">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-white/40">Project Overview</h2>
                <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="reveal-item rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 space-y-5">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-white/40">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs tracking-[0.2em] uppercase bg-white/[0.07] border border-white/10 px-4 py-2 rounded-full text-white/80 hover:bg-white/10 transition-colors duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Key Deliverables */}
              <div className="reveal-item rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 space-y-5">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-white/40">Key Deliverables</h2>
                <ul className="space-y-3">
                  {project.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/75 font-light">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Info */}
              <div className="reveal-item rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 space-y-5">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-white/40">Project Info</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/35 mb-1">Domain</p>
                    <p className="text-sm text-white/75">{project.domain}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/35 mb-1">Role</p>
                    <p className="text-sm text-white/75">{project.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/35 mb-1">Category</p>
                    <p className="text-sm text-white/75">{project.type}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="reveal-item flex items-center justify-between w-full rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-5 hover:bg-white hover:text-black text-white transition-all duration-300 group"
                >
                  <span className="text-sm tracking-[0.3em] uppercase font-light">Visit Live Site</span>
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Next / Prev Project Navigation */}
        <ProjectNav current={slug} />
      </main>
    </div>
  );
};

const ProjectNav = ({ current }) => {
  const navigate = useNavigate();
  const currentIndex = clientProjects.findIndex((p) => p.slug === current);
  const prev = clientProjects[currentIndex - 1];
  const next = clientProjects[currentIndex + 1];

  return (
    <footer className="border-t border-white/[0.08] px-6 md:px-10 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        {prev ? (
          <button
            onClick={() => navigate(`/projects/${prev.slug}`)}
            className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 group"
          >
            <Icon icon="lucide:arrow-left" className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <div className="text-left">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30">Previous</p>
              <p className="text-sm">{prev.name}</p>
            </div>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => navigate("/")}
          className="text-xs tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors duration-300 hidden sm:block"
        >
          All Projects
        </button>

        {next ? (
          <button
            onClick={() => navigate(`/projects/${next.slug}`)}
            className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 group text-right"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30">Next</p>
              <p className="text-sm">{next.name}</p>
            </div>
            <Icon icon="lucide:arrow-right" className="size-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </footer>
  );
};

export default ProjectPage;
