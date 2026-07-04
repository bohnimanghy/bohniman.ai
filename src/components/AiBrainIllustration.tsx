import type { CSSProperties } from "react";

const nodeStyle = (delay: number): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: "center",
  animation: `nodeBeat 2.6s ease-in-out ${delay}s infinite`,
});

/**
 * Hand-crafted AI illustration: a brain that is organic gyri on the left half
 * and a circuit board on the right, wired into an "AI" chip. Crisp SVG linework
 * in the brand accent, with pulsing nodes and signals flowing along the traces.
 */
export function AiBrainIllustration() {
  const accent = "var(--accent)";
  return (
    <svg
      viewBox="0 0 420 320"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block", color: accent }}
      role="img"
      aria-label="AI brain wired into a processor"
    >
      <defs>
        <filter id="brainGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="brainFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* brain fill + glowing outline */}
      <path
        d="M210,54 C248,36 300,40 320,74 C360,70 384,100 372,134 C392,152 388,192 360,204 C366,236 336,262 300,254 C288,282 250,286 226,268 C220,274 200,274 194,268 C170,286 132,282 120,254 C84,262 54,236 60,204 C32,192 28,152 48,134 C36,100 60,70 100,74 C120,40 172,36 210,54 Z"
        fill="url(#brainFill)"
      />
      <path
        d="M210,54 C248,36 300,40 320,74 C360,70 384,100 372,134 C392,152 388,192 360,204 C366,236 336,262 300,254 C288,282 250,286 226,268 C220,274 200,274 194,268 C170,286 132,282 120,254 C84,262 54,236 60,204 C32,192 28,152 48,134 C36,100 60,70 100,74 C120,40 172,36 210,54 Z"
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinejoin="round"
        filter="url(#brainGlow)"
      />

      {/* central sulcus */}
      <path
        d="M210,58 C203,92 217,122 210,152 C203,182 217,214 210,266"
        fill="none"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />

      {/* ---- LEFT hemisphere: organic gyri ---- */}
      <g fill="none" stroke={accent} strokeOpacity="0.42" strokeWidth="1.5" strokeLinecap="round">
        <path d="M120,96 C154,104 152,130 120,140" />
        <path d="M96,138 C138,140 150,168 104,184" />
        <path d="M112,196 C150,198 160,224 126,238" />
        <path d="M150,74 C172,96 158,120 182,134" />
        <path d="M84,168 C112,172 118,196 96,214" />
        <path d="M150,150 C176,156 176,182 150,196" />
      </g>

      {/* ---- RIGHT hemisphere: circuit traces ---- */}
      <g fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round">
        <path id="trace1" d="M322,150 H354 V112" />
        <path id="trace2" d="M300,128 V96 H346" />
        <path id="trace3" d="M300,172 V208 H262" />
        <path d="M278,150 H250" />
        <path d="M338,150 H360" />
        <path d="M330,196 H356 V172" />
      </g>

      {/* flowing signals along two traces */}
      <g stroke={accent} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9">
        <path
          d="M322,150 H354 V112"
          strokeDasharray="10 60"
          style={{ animation: "dashFlow 2.2s linear infinite" }}
        />
        <path
          d="M300,172 V208 H262"
          strokeDasharray="10 70"
          style={{ animation: "dashFlow 2.8s linear infinite" }}
        />
        <path
          d="M300,128 V96 H346"
          strokeDasharray="8 64"
          style={{ animation: "dashFlow 2.5s linear infinite" }}
        />
      </g>

      {/* circuit pads (squares) */}
      <g fill={accent} fillOpacity="0.55">
        <rect x="350" y="108" width="8" height="8" rx="1.5" />
        <rect x="342" y="92" width="8" height="8" rx="1.5" />
        <rect x="258" y="204" width="8" height="8" rx="1.5" />
        <rect x="352" y="168" width="8" height="8" rx="1.5" />
      </g>

      {/* pulsing nodes */}
      <g fill={accent}>
        <circle cx="120" cy="140" r="3.2" style={nodeStyle(0)} />
        <circle cx="104" cy="184" r="3.2" style={nodeStyle(0.5)} />
        <circle cx="126" cy="238" r="3.2" style={nodeStyle(1)} />
        <circle cx="182" cy="134" r="3.2" style={nodeStyle(0.3)} />
        <circle cx="150" cy="196" r="3.2" style={nodeStyle(0.8)} />
        <circle cx="250" cy="150" r="3.2" style={nodeStyle(0.2)} />
        <circle cx="360" cy="150" r="3.2" style={nodeStyle(1.2)} />
        <circle cx="354" cy="112" r="3.2" style={nodeStyle(0.6)} />
        <circle cx="262" cy="208" r="3.2" style={nodeStyle(1.4)} />
        <circle cx="346" cy="96" r="3.2" style={nodeStyle(0.9)} />
      </g>

      {/* ---- central AI chip ---- */}
      <g>
        {/* pins */}
        <g stroke={accent} strokeWidth="1.6" strokeLinecap="round">
          <path d="M290,126 V118 M300,126 V118 M310,126 V118" />
          <path d="M290,174 V182 M300,174 V182 M310,174 V182" />
          <path d="M276,140 H268 M276,150 H268 M276,160 H268" />
          <path d="M324,140 H332 M324,150 H332 M324,160 H332" />
        </g>
        <circle cx="300" cy="150" r="30" fill={accent} fillOpacity="0.1" />
        <rect
          x="278"
          y="128"
          width="44"
          height="44"
          rx="8"
          fill="#17191E"
          stroke={accent}
          strokeWidth="1.8"
        />
        <text
          x="300"
          y="151"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={accent}
          style={{
            font: "700 20px 'Schibsted Grotesk','IBM Plex Sans',sans-serif",
          }}
        >
          AI
        </text>
      </g>
    </svg>
  );
}
