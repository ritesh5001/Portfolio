import Arrow from "./Arrow";

export default function SectionHeading({
  number,
  title,
  subtitle,
  description,
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {subtitle}
        </p>
        <h2 className="display-heading">
          {title}
          <span className="heading-arrow">
            <Arrow />
          </span>
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
