import type { ProductStatus } from "@/lib/site";

const styleMap: Record<
  ProductStatus,
  { text: string; dot: string; ring?: boolean }
> = {
  LIVE: { text: "#17191E", dot: "var(--accent)" },
  BETA: { text: "#8A6A1E", dot: "#C08A2C" },
  "COMING SOON": { text: "#8A8E96", dot: "#B9B6AC" },
};

export function StatusBadge({
  status,
  size = "sm",
}: {
  status: ProductStatus;
  size?: "sm" | "lg";
}) {
  const s = styleMap[status];
  const dot = size === "lg" ? 7 : 6;
  return (
    <span
      className="inline-flex items-center font-mono uppercase"
      style={{
        gap: size === "lg" ? 7 : 6,
        fontSize: size === "lg" ? 11 : 10,
        letterSpacing: "0.12em",
        color: s.text,
      }}
    >
      <span
        style={{
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: s.dot,
          boxShadow:
            size === "lg" && status === "LIVE"
              ? "0 0 0 3px color-mix(in oklab,var(--accent) 22%,transparent)"
              : undefined,
          animation:
            size === "lg" && status === "LIVE"
              ? "pulseDot 2.4s ease-in-out infinite"
              : undefined,
        }}
      />
      {status}
    </span>
  );
}
