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
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-1 sm:px-1 md:px-3 lg:px-6 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60 ultra-small-screen">
        <img
          ref={imgRef}
          src="images/pfp.png"
          alt={contactInfo.name}
          className="w-md rounded-3xl"
        />
        <div className="w-full">
          <AnimatedTextLines text={aboutText} className={"w-full"} />
          <div className="mt-6 space-y-2 text-lg md:text-xl lg:text-2xl text-white/80">
            <div className="flex items-center gap-3">
              <Icon icon="lucide:user-circle-2" className="text-white/80" />
              <span>{contactInfo.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:briefcase-business" className="text-white/80" />
              <span>{contactInfo.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:map-pin" className="text-white/80" />
              <span>{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:code" className="text-white/80" />
              <span>Building enterprise-grade platforms with clean, scalable architecture.</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:brain-circuit" className="text-white/80" />
              <span>Shipping AI-integrated products with practical business value.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-14 ultra-small-screen">
        <h3 className="text-3xl md:text-4xl lg:text-5xl text-white mb-8">Experience</h3>
        <div className="space-y-6">
          {experienceData.map((experience) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="border border-white/25 rounded-2xl p-5 md:p-7"
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
        <article className="border border-white/25 rounded-2xl p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Education</h3>
          <p className="text-white text-xl md:text-2xl">{educationData.degree}</p>
          <p className="text-white/80 mt-2 text-lg md:text-xl">{educationData.institute}</p>
          <p className="text-white/70 mt-1 text-base md:text-lg">
            {educationData.location} | {educationData.duration}
          </p>
        </article>

        <article className="border border-white/25 rounded-2xl p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Certifications</h3>
          <ul className="space-y-3 text-white/75 text-base md:text-lg list-disc pl-5">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="border border-white/25 rounded-2xl p-5 md:p-7">
          <h3 className="text-white text-3xl md:text-4xl mb-4">Achievements</h3>
          <ul className="space-y-3 text-white/75 text-base md:text-lg list-disc pl-5">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="border border-white/25 rounded-2xl p-5 md:p-7">
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
