"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projectPlaceholders } from "../generated/projectPlaceholders";

export default function ProjectGallery({ project }) {
  const [activeImage, setActiveImage] = useState(0);
  const gesture = useRef(null);
  const prevImage = () =>
    setActiveImage(
      (i) => (i - 1 + project.images.length) % project.images.length,
    );
  const nextImage = () =>
    setActiveImage((i) => (i + 1) % project.images.length);

  const onPointerDown = (event) => {
    if (
      project.images.length < 2 ||
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return;
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      id: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerUp = (event) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (
      Math.abs(dx) < 48 ||
      Math.abs(dx) < Math.abs(dy) * 1.2 ||
      performance.now() - start.time > 2000
    )
      return;
    if (dx < 0) nextImage();
    else prevImage();
  };

  return (
    <div className="case-gallery">
      <div className="case-gallery-toolbar">
        <span>
          <i aria-hidden="true" /> Project preview{" "}
          <span className="case-gallery-domain">/ {project.domain}</span>
        </span>
        <span className="case-gallery-pagination">
          <span role="status" aria-live="polite" aria-atomic="true">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(project.images.length).padStart(2, "0")}
          </span>
          {project.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={prevImage}
              >
                <Icon icon="lucide:arrow-left" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={nextImage}
              >
                <Icon icon="lucide:arrow-right" />
              </button>
            </>
          )}
        </span>
      </div>
      <div className="case-gallery-canvas">
        <div
          className={
            "gallery-stage " + (project.images.length > 1 ? "can-swipe" : "")
          }
          role="region"
          aria-label={
            project.name +
            " screenshots" +
            (project.images.length > 1
              ? ". Swipe or use left and right arrow keys to browse."
              : "")
          }
          tabIndex={project.images.length > 1 ? 0 : undefined}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            gesture.current = null;
          }}
          onKeyDown={(event) => {
            if (project.images.length < 2) return;
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              prevImage();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              nextImage();
            }
          }}
        >
          {project.images.map((src, index) => (
            <span
              key={src}
              className={
                "gallery-layer " + (index === activeImage ? "is-active" : "")
              }
              aria-hidden={index !== activeImage}
            >
              <Image
                data-gallery-image={index === activeImage ? "true" : undefined}
                src={src}
                alt={
                  index === activeImage
                    ? `${project.name} — ${project.tagline}, screen ${index + 1} of ${project.images.length}`
                    : ""
                }
                fill
                sizes="(max-width: 760px) 90vw, (max-width: 1400px) 85vw, 1160px"
                loading={index === 0 ? "eager" : "lazy"}
                placeholder={projectPlaceholders[src] ? "blur" : "empty"}
                blurDataURL={projectPlaceholders[src]}
                draggable={false}
                className="object-contain object-top"
              />
            </span>
          ))}
        </div>
      </div>
      <div className="case-gallery-bottom">
        <p>
          <span className="project-eyebrow">The finished experience</span>
          <span>
            {project.images.length > 1
              ? "A few views of the build. Swipe to explore."
              : "A closer look at the finished website."}
          </span>
        </p>
        {project.images.length > 1 && (
          <div
            className="case-gallery-thumbnails"
            role="group"
            aria-label="Choose a screenshot"
          >
            {project.images.map((src, index) => (
              <button
                type="button"
                key={src}
                aria-label={`Show screenshot ${index + 1}`}
                aria-pressed={activeImage === index}
                onClick={() => setActiveImage(index)}
                className="gallery-thumbnail"
              >
                <Image
                  src={src}
                  fill
                  sizes="110px"
                  placeholder={projectPlaceholders[src] ? "blur" : "empty"}
                  blurDataURL={projectPlaceholders[src]}
                  alt=""
                  aria-hidden="true"
                  className="object-cover object-top"
                />
                <span aria-hidden="true">0{index + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
