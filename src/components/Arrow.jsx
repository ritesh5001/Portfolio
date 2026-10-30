export default function Arrow({
  direction = "up-right",
  className = "",
  ...props
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={"arrow-icon " + className}
      aria-hidden="true"
      {...props}
    >
      {direction === "down" ? (
        <path d="M12 3v18m-7-7 7 7 7-7" />
      ) : direction === "right" ? (
        <path d="M3 12h18m-7-7 7 7-7 7" />
      ) : (
        <path d="M5 19 19 5M5 5h14v14" />
      )}
    </svg>
  );
}
