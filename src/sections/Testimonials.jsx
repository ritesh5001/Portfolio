import Link from "next/link";
import { testimonials } from "../constants";

// Renders only once real client quotes are added to constants/index.js.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section
      id="testimonials"
      className="testimonials-section section-shell section-space"
      aria-labelledby="testimonials-heading"
    >
      <p className="eyebrow">What clients say</p>
      <h2 id="testimonials-heading" className="sr-only">
        Client testimonials
      </h2>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <figure key={item.name} className="testimonial">
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <span>{item.name}</span>
              {item.project ? (
                <Link href={"/projects/" + item.project}>{item.business}</Link>
              ) : (
                <span>{item.business}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
