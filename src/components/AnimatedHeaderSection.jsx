"use client";

import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * `titleLead` / `titleTail` render inside the heading element at a smaller size.
 * They exist so a heading can carry the full keyword phrase ("Ritesh Kumar Giri
 * ... in Lucknow, India") without forcing the whole string through the giant
 * banner type scale.
 */
const AnimatedHeaderSection = ({
  subTitle,
  title,
  titleLead,
  titleTail,
  text,
  textColor,
  withScrollTrigger = false,
  headingTag = "h2",
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const HeadingTag = headingTag;
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen">
            <HeadingTag className={`uppercase ${textColor}`}>
              {titleLead && (
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-2 md:mb-4">
                  {titleLead}
                </span>
              )}
              <span className="flex flex-col gap-12 banner-text-responsive sm:gap-16 md:block">
                {titleParts.map((part, index) => (
                  <span key={index}>{part} </span>
                ))}
              </span>
              {titleTail && (
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mt-4 md:mt-6">
                  {titleTail}
                </span>
              )}
            </HeadingTag>
          </div>
        </div>
      </div>
      <div
        className={`relative px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen ${textColor}`}
      >
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
