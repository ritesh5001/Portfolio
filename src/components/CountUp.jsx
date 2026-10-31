"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./SiteMotion";

export default function CountUp({ value }) {
  const target = useRef(null);
  const played = useRef(false);
  const { ready, reduced } = useMotionPreference();

  useEffect(() => {
    const element = target.current;
    if (
      !element ||
      !ready ||
      reduced ||
      played.current ||
      !("IntersectionObserver" in window)
    )
      return;
    let frame = 0;
    const total = Number.parseInt(value, 10);
    const suffix = value.replace(/^\d+/, "");
    const text = element.firstChild;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        played.current = true;
        observer.disconnect();
        const start = performance.now();
        const update = (now) => {
          const progress = Math.min((now - start) / 700, 1);
          // A text-node update avoids React renders and layout-observer churn.
          text.nodeValue =
            Math.round(total * (1 - Math.pow(1 - progress, 3))) + suffix;
          if (progress < 1) frame = requestAnimationFrame(update);
          else element.dataset.counted = "true";
        };
        frame = requestAnimationFrame(update);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.nodeValue = value;
    };
  }, [ready, reduced, value]);

  return (
    <span className="stat-value">
      <span className="sr-only">{value}</span>
      <span ref={target} aria-hidden="true" data-count-up>
        {value}
      </span>
    </span>
  );
}
