import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { clientProjects, projects } from "../constants";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const Works = () => {
  const overlayRefs = useRef([]);
  const navigate = useNavigate();

  const featuredProjects = clientProjects.filter((p) => p.featured);
  const otherProjects = clientProjects.filter((p) => !p.featured);

  const text = `Selected products built for scale, reliability,
    and measurable user impact across real deployments.`;

  useGSAP(() => {
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
    gsap.from(".featured-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".featured-card" },
    });
    gsap.from(".client-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".client-card" },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 0.15, ease: "power2.out" }
    );
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Production Projects"}
        title={"Projects"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      {/* Personal engineering projects list */}
      <div className="relative flex flex-col font-light">
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div
              ref={(el) => { overlayRefs.current[index] = el; }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />
            <div className="flex justify-between px-1 sm:px-1 md:px-3 lg:px-6 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white ultra-small-screen">
              <h2 className="lg:text-[32px] text-[26px] leading-none">{project.name}</h2>
              <div className="flex items-center gap-4 text-sm uppercase md:text-base">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors duration-300">
                    Live
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors duration-300">
                    Code
                  </a>
                )}
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>
            </div>
            <div className="w-full h-0.5 bg-black/80" />
            <div className="flex px-1 sm:px-1 md:px-3 lg:px-6 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12 ultra-small-screen">
              {project.frameworks.map((framework) => (
                <p key={framework.id} className="text-black transition-colors duration-500 md:group-hover:text-white">
                  {framework.name}
                </p>
              ))}
            </div>
            <div className="px-1 sm:px-1 md:px-3 lg:px-6 md:group-hover:px-12 transition-all duration-500 ultra-small-screen">
              <p className="text-sm md:text-base lg:text-lg text-black/70 md:group-hover:text-white/80 max-w-5xl">
                {project.description}
              </p>
            </div>
            <div className="relative flex items-center justify-center px-1 sm:px-1 md:px-3 lg:px-6 md:hidden h-[400px] ultra-small-screen">
              <img src={project.bgImage} alt={`${project.name}-bg-image`} className="object-cover w-full h-full rounded-md brightness-50" />
              <img src={project.image} alt={`${project.name}-image`} className="absolute bg-center px-14 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Client Work Section */}
      <div className="bg-[#0f0f0f] mt-12">
        {/* Section header */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 pt-16 pb-10 border-b border-white/[0.08]">
          <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-3">Freelance & Client Work</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white font-light leading-tight">
            Client Projects
          </h2>
          <p className="mt-4 text-white/50 text-sm md:text-base font-light max-w-2xl leading-relaxed">
            Production websites and platforms built for real businesses — e-commerce, B2B marketplaces, service platforms, and more.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 pt-12 pb-8">
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">Featured</p>
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="featured-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] cursor-pointer hover:border-white/20 transition-all duration-500"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[9px] tracking-[0.45em] uppercase text-black bg-white px-2.5 py-1 rounded-full font-medium">
                          Featured
                        </span>
                        <span className="text-[9px] tracking-[0.45em] uppercase text-white/40 border border-white/15 px-2.5 py-1 rounded-full">
                          {project.type}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl text-white font-light leading-tight">{project.name}</h3>
                      <p className="text-white/50 text-sm mt-1">{project.tagline}</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                      <Icon icon="lucide:arrow-up-right" className="size-4 text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed font-light line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] tracking-[0.2em] uppercase text-white/50 bg-white/[0.05] px-3 py-1.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
                    <span className="text-xs text-white/35 tracking-wider">{project.domain}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank");
                      }}
                      className="text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-300"
                    >
                      Visit Site ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Client Projects Grid */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 pt-4 pb-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">All Client Work</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="client-card group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] cursor-pointer hover:border-white/15 transition-all duration-400"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-white/60 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base text-white font-light leading-tight">{project.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5 tracking-wide">{project.domain}</p>
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                      <Icon icon="lucide:arrow-up-right" className="size-3.5 text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed font-light line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] tracking-[0.15em] uppercase text-white/40 bg-white/[0.04] px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
