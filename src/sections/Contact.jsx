import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { contactInfo, socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Interested in collaborating, hiring, or building a product?
    Let's connect and discuss your next engineering challenge.`;
  const items = [
    "Let's Build",
    "Open for Work",
    "Freelance & Full-Time",
    "Let's Chat",
    "Get In Touch",
  ];
  const linkedIn = socials.find((social) => social.name === "LinkedIn");
  const gitHub = socials.find((social) => social.name === "GitHub");

  useGSAP(() => {
    gsap.from(".contact-panel", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".contact-panel",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Contact Me"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-12 ultra-small-screen">
          <div className="contact-panel grid gap-8 lg:grid-cols-[1.1fr_0.9fr] rounded-3xl border border-white/20 bg-white/[0.03] p-6 md:p-8 lg:p-10 text-white">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs md:text-sm uppercase tracking-[0.45em] text-white/55">Available for work</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Let’s talk about product builds, team support, or freelance work.
                </h2>
                <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  If you need a full-stack engineer who can move from UI to backend to deployment without losing momentum, reach out directly.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="rounded-2xl border border-white/15 bg-black/20 p-4 md:p-5 transition-colors duration-300 hover:border-gold hover:bg-white/5"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Email</p>
                  <p className="mt-2 text-lg md:text-xl lowercase break-all">{contactInfo.email}</p>
                </a>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="rounded-2xl border border-white/15 bg-black/20 p-4 md:p-5 transition-colors duration-300 hover:border-gold hover:bg-white/5"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Phone</p>
                  <p className="mt-2 text-lg md:text-xl">{contactInfo.phone}</p>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="rounded-full bg-gold px-5 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Hire Me
                </a>
                {linkedIn && (
                  <a
                    href={linkedIn.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
                  >
                    LinkedIn
                  </a>
                )}
                {gitHub && (
                  <a
                    href={gitHub.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-black/20 p-5 md:p-6">
                <h3 className="text-xs uppercase tracking-[0.45em] text-white/55">Social Media</h3>
                <div className="mt-4 flex flex-col gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.name === "Email" ? undefined : "_blank"}
                      rel={social.name === "Email" ? undefined : "noreferrer"}
                      className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm md:text-base uppercase tracking-[0.25em] text-white/75 transition-colors duration-300 hover:border-white/30 hover:text-white"
                    >
                      <span>{social.name}</span>
                      <span className="text-white/40">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-transparent p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.45em] text-white/55">Location</p>
                <p className="mt-2 text-xl md:text-2xl">{contactInfo.location}</p>
                <p className="mt-3 text-white/65 text-sm md:text-base leading-relaxed">
                  Best way to reach me is email. I usually respond quickly to product, freelance, and collaboration inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
