export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  /** "dark" mark for light backgrounds, "light" mark for dark backgrounds. */
  variant?: "dark" | "light";
}) {
  const markColor = variant === "light" ? "#ffffff" : "#1b2447";
  const wordColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className={`inline-flex items-center gap-2.5 font-semibold ${className}`}>
      {/* VE highway monogram: a V and E formed by a road with lane markings. */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* V leg of the road */}
        <path
          d="M8 14 L28 52 L37 52 L20 14 Z"
          fill={markColor}
        />
        {/* E formed from three angled bars sweeping off the road crest */}
        <path d="M30 14 L56 14 L52 22 L33 22 Z" fill={markColor} />
        <path d="M33 29 L52 29 L49 37 L34 37 Z" fill={markColor} />
        <path d="M31 44 L50 44 L46 52 L31 52 Z" fill={markColor} />
        {/* little lane dashes along the E bars — in the "Xpress" deep red */}
        <path
          d="M34 18 H51 M35 33 H48 M33 48 H45"
          stroke="#b3243a"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
      </svg>
      <span className={`text-lg leading-none tracking-tight ${wordColor}`}>
        Voyage<span className="text-accent-600">Xpress</span>
      </span>
    </span>
  );
}
