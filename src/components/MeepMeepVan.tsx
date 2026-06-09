// Meep Meep — a little delivery van whose headlights are its eyes.
// Brand palette: navy body, Xpress-red grille + roof light, white headlight eyes.
export function MeepMeepVan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {/* wheels */}
      <circle cx="15" cy="39" r="3.4" fill="#0f1530" />
      <circle cx="33" cy="39" r="3.4" fill="#0f1530" />
      {/* body */}
      <rect x="7" y="10" width="34" height="28" rx="6" fill="#1b2447" />
      {/* roof light */}
      <rect x="20" y="7.5" width="8" height="3.5" rx="1.5" fill="#b3243a" />
      {/* windscreen */}
      <rect x="12" y="13.5" width="24" height="8.5" rx="3" fill="#8fb6ff" />
      {/* headlight eyes */}
      <circle cx="17" cy="28.5" r="5" fill="#ffffff" />
      <circle cx="31" cy="28.5" r="5" fill="#ffffff" />
      <circle cx="18" cy="29" r="2.3" fill="#1b2447" />
      <circle cx="32" cy="29" r="2.3" fill="#1b2447" />
      {/* eye glints */}
      <circle cx="17.1" cy="28" r="0.8" fill="#ffffff" />
      <circle cx="31.1" cy="28" r="0.8" fill="#ffffff" />
      {/* grille smile */}
      <path
        d="M18.5 34.3 q5.5 3.6 11 0"
        stroke="#b3243a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* front bumper */}
      <rect x="9" y="36.3" width="30" height="3" rx="1.5" fill="#b3243a" />
    </svg>
  );
}
