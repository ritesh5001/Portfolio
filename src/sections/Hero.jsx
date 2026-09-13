"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { contactInfo } from "../constants";

// The 3D scene pulls in three.js, @react-three/fiber and a 458KB .glb. None of
// that belongs in the critical path: the LCP element is the heading, so the
// canvas is code-split and only mounted once the hero is actually in view.
const PlanetScene = dynamic(() => import("../components/PlanetScene"), {
  ssr: false,
});

const Hero = () => {
  const figureRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShowScene(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const text = `${contactInfo.name} builds React, Next.js, Node.js,
WordPress, WooCommerce, and AI-powered products
for clients in Lucknow and across India.`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={`Based in ${contactInfo.location} · Available for freelance work`}
        titleLead={contactInfo.name}
        title={"Freelance Full-Stack Developer"}
        titleTail={"in Lucknow, India"}
        text={text}
        textColor={"text-black"}
        headingTag="h1"
      />
      <figure
        ref={figureRef}
        className="absolute inset-0 -z-50"
        style={{ width: "100%", height: "100vh" }}
      >
        {showScene && <PlanetScene />}
      </figure>
    </section>
  );
};

export default Hero;
