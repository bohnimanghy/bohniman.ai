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
      return (
        <svg width="38" height="38" viewBox="0 0 52 52" fill="none" style={iconTransition}>
          <rect x="9" y="9" width="34" height="34" rx="3" transform="rotate(45 26 26)" stroke="#17191E" strokeWidth="1.6" />
          <rect x="17" y="17" width="18" height="18" rx="2.5" transform="rotate(45 26 26)" stroke="#17191E" strokeWidth="1.6" />
          <rect x="22" y="22" width="8" height="8" rx="1.5" transform="rotate(45 26 26)" fill="var(--accent)" />
        </svg>
      );
    case "zalpan":
      return (
        <svg width="40" height="38" viewBox="0 0 56 52" fill="none" style={iconTransition}>
          <line x1="12" y1="26" x2="28" y2="26" stroke="#17191E" strokeWidth="1.6" />
          <line x1="28" y1="26" x2="44" y2="26" stroke="#17191E" strokeWidth="1.6" />
          <circle cx="12" cy="26" r="5" fill="none" stroke="#17191E" strokeWidth="1.6" />
          <circle cx="28" cy="26" r="5" fill="none" stroke="#17191E" strokeWidth="1.6" />
          <circle cx="44" cy="26" r="5.5" fill="var(--accent)" />
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
