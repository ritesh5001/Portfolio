export default function ContactSummary() {
  return (
    <section className="contact-summary section-shell">
      <div className="eyebrow contact-values">
        {[
          "Scalable Products",
          "Real-Time Systems",
          "AI Integrations",
          "Clean Architecture",
          "Business Impact",
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <p>
        Let’s build <span>robust</span> & <em>future-ready</em>
        <br /> digital products together.
      </p>
      <span className="eyebrow">Open for opportunities</span>
    </section>
  );
}
