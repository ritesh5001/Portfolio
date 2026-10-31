const stack = [
  "Full Stack Engineering",
  "Next.js",
  "Node.js",
  "Prisma",
  "Socket.IO",
  "AI Integrations",
  "Cloud & CI/CD",
];

export default function ServiceSummary() {
  return (
    <div className="stack-strip section-shell" aria-label="Engineering stack">
      <div className="stack-track">
        <div className="stack-group">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="stack-group stack-duplicate" aria-hidden="true">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
