import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  achievements,
  certifications,
  contactInfo,
  educationData,
  experienceData,
  leadership,
} from "../constants";

const About = () => {
  const text = `Software engineer focused on high-impact product delivery,
    modern architecture, and measurable business outcomes.`;
  const aboutText = `I build full-stack systems that connect strong UX with robust backend engineering.
  My focus areas include scalable architecture, real-time communication, and AI-powered product experiences.`;
  const highlights = [
    { value: "50+", label: "live websites" },
    { value: "10+", label: "MERN applications" },
    { value: "4", label: "flagship projects" },
  ];
  const focusAreas = [
    "Product-minded full-stack development",
    "Enterprise workflows and clean system design",
    "AI features, real-time chat, and scalable APIs",
  ];

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Professional Experience, Education & Achievements"}
        title={"About Me"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-16 ultra-small-screen">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-4 md:p-6 shadow-2xl shadow-black/20">
            <img
              ref={imgRef}
              src={contactInfo.profileImage}
              alt={contactInfo.name}
              className="w-full rounded-2xl object-cover"
            />
            <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm uppercase tracking-[0.35em] text-white/60">
              <span className="rounded-full border border-white/15 px-3 py-2">Software Engineer</span>
              <span className="rounded-full border border-white/15 px-3 py-2">Full Stack</span>
              <span className="rounded-full border border-white/15 px-3 py-2">AI Systems</span>
            </div>
          </article>

          <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7 lg:p-8 text-white">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-white/70 text-sm uppercase tracking-[0.4em]">
                  <Icon icon="lucide:user-circle-2" className="text-gold" />
                  <span>{contactInfo.name}</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                  Building products that ship cleanly and scale confidently.
                </h3>
              </div>
              <AnimatedTextLines text={aboutText} className={"w-full text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed"} />
              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/15 bg-black/20 p-4">
                    <div className="text-3xl md:text-4xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm uppercase tracking-[0.25em] text-white/55">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2 pt-2">
                <div className="space-y-2 rounded-2xl border border-white/15 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-white/90">
                    <Icon icon="lucide:briefcase-business" className="text-gold" />
                    <span className="uppercase tracking-[0.25em] text-sm">Current Focus</span>
                  </div>
                  <ul className="space-y-2 text-white/70 text-sm md:text-base leading-relaxed">
                    {focusAreas.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 rounded-2xl border border-white/15 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-white/90">
                    <Icon icon="lucide:map-pin" className="text-gold" />
                    <span className="uppercase tracking-[0.25em] text-sm">Based In</span>
                  </div>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {contactInfo.location}
                  </p>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    Open to full-time, freelance, and contract product work.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-14 ultra-small-screen">
        <h3 className="text-3xl md:text-4xl lg:text-5xl text-white mb-8">Experience</h3>
        <div className="space-y-6">
          {experienceData.map((experience) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h4 className="text-white text-2xl md:text-3xl">{experience.role}</h4>
                <p className="text-white/70 text-base md:text-lg">{experience.duration}</p>
              </div>
              <p className="text-white/80 mt-2 text-lg md:text-xl">
                {experience.company} | {experience.location} ({experience.mode})
              </p>
              <ul className="mt-4 space-y-2 text-white/70 text-base md:text-lg list-disc pl-5">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6 ultra-small-screen">
        <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Education</h3>
          <p className="text-white text-xl md:text-2xl">{educationData.degree}</p>
          <p className="text-white/80 mt-2 text-lg md:text-xl">{educationData.institute}</p>
          <p className="text-white/70 mt-1 text-base md:text-lg">
            {educationData.location} | {educationData.duration}
          </p>
        </article>

        <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Certifications</h3>
          <ul className="space-y-3 text-white/75 text-base md:text-lg list-disc pl-5">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Achievements</h3>
          <ul className="space-y-3 text-white/75 text-base md:text-lg list-disc pl-5">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Leadership</h3>
          <ul className="space-y-3 text-white/75 text-base md:text-lg list-disc pl-5">
            {leadership.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default About;
