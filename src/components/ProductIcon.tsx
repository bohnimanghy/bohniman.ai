import type { CSSProperties } from "react";

const iconTransition: CSSProperties = {
  transition: "transform .38s cubic-bezier(.2,.7,.2,1)",
  flex: "0 0 auto",
};

// 8 nodes evenly on a ring of radius 26 around centre (36,36)
const RING = [
  [62, 36],
  [54.4, 17.6],
  [36, 10],
  [17.6, 17.6],
  [10, 36],
  [17.6, 54.4],
  [36, 62],
  [54.4, 54.4],
] as const;

/** Flagship Bookmanch mark — nodes on a ring converging to a beating core. */
export function BookmanchHubIcon() {
  return (
    <svg width="58" height="58" viewBox="0 0 72 72" fill="none" style={iconTransition}>
      {/* gathering ring */}
      <circle cx="36" cy="36" r="26" stroke="#C9C6BC" strokeWidth="1" opacity="0.55" />
      {/* converging lines */}
      {RING.map(([x, y], i) => (
        <line key={`l${i}`} x1={x} y1={y} x2="36" y2="36" stroke="#C9C6BC" strokeWidth="1.3" />
      ))}
      {/* outer nodes */}
      {RING.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r="3.1" fill="#17191E" />
      ))}
      {/* glowing core */}
      <circle cx="36" cy="36" r="11" fill="var(--accent)" opacity="0.14" />
      <circle
        cx="36"
        cy="36"
        r="6.8"
        fill="var(--accent)"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "hubBeat 3.2s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

/** Small per-product icons (also used in the nav mega-menu). */
export function ProductIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "bookmanch":
      return (
        <svg width="38" height="38" viewBox="0 0 72 72" fill="none" style={iconTransition}>
          <circle cx="36" cy="36" r="26" stroke="#C9C6BC" strokeWidth="1.1" opacity="0.55" />
          {RING.map(([x, y], i) => (
            <line key={`l${i}`} x1={x} y1={y} x2="36" y2="36" stroke="#C9C6BC" strokeWidth="1.4" />
          ))}
          {RING.map(([x, y], i) => (
            <circle key={`n${i}`} cx={x} cy={y} r="3.2" fill="#17191E" />
          ))}
          <circle cx="36" cy="36" r="6.8" fill="var(--accent)" />
        </svg>
      );
    case "kathan-ai":
      return (
        <svg width="38" height="38" viewBox="0 0 52 52" fill="none" style={iconTransition}>
          <rect x="4" y="18" width="4" height="16" rx="2" fill="#17191E" />
          <rect x="13" y="11" width="4" height="30" rx="2" fill="#17191E" />
          <rect x="22" y="4" width="4" height="44" rx="2" fill="var(--accent)" />
          <rect x="31" y="14" width="4" height="24" rx="2" fill="#17191E" />
          <rect x="40" y="8" width="4" height="36" rx="2" fill="#17191E" />
        </svg>
      );
    case "curioversity":
      // Curioversity brand mark — graduation cap (own colours: indigo board, emerald tassel)
      return (
        <svg width="40" height="40" viewBox="0 0 52 52" fill="none" style={iconTransition}>
          <path d="M26 8 L48 19 L26 30 L4 19 Z" fill="#4338ca" />
          <path d="M12 22.5 V32 c0 3.6 28 3.6 28 0 V22.5 L26 29.5 Z" fill="#3730a3" />
          <path d="M48 19 V33.5" stroke="#10b981" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="48" cy="35" r="2.8" fill="#10b981" />
        </svg>
      );
    case "zalpan":
      // Zalpan brand mark — Z in a two-handled orange plate (own colours, not the site accent)
      return (
        <svg width="42" height="42" viewBox="-33 -26 140 140" fill="none" style={iconTransition}>
          <circle cx="37.1" cy="44" r="57" fill="none" stroke="#f0531c" strokeWidth="4" />
          <circle cx="37.1" cy="44" r="50" fill="none" stroke="#f0531c" strokeWidth="3" />
          <path d="M 73.4 -0.9 C 81.9 -15.6 66.3 -24.6 57.8 -9.9" fill="none" stroke="#f0531c" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 0.8 88.9 C -7.7 103.6 7.9 112.6 16.4 97.9" fill="none" stroke="#f0531c" strokeWidth="4.5" strokeLinecap="round" />
          <path fillRule="evenodd" fill="#1f2a37" d="M 13 17.957 L 13 23.949 28.384 24.225 L 43.767 24.500 27.885 46.500 C 14.116 65.574, 12.003 68.999, 12.002 72.250 L 12 76 37.055 76 L 62.110 76 61.805 71.250 L 61.500 66.500 45.164 66 L 28.828 65.500 44.973 43.280 C 60.502 21.909, 61.106 20.898, 60.809 16.780 L 60.500 12.500 36.750 12.232 L 13 11.964 13 17.957" />
        </svg>
      );
    case "biocrat":
      return (
        <svg width="38" height="38" viewBox="0 0 52 52" fill="none" style={iconTransition}>
          <circle cx="26" cy="26" r="21" fill="none" stroke="#17191E" strokeWidth="1.3" opacity="0.28" />
          <circle cx="26" cy="26" r="13" fill="none" stroke="#17191E" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="5" fill="var(--accent)" />
        </svg>
      );
    default:
      return null;
  }
}
