"use client";

import { useEffect, useState } from "react";

/** Floating "back to top" button — appears after scrolling down. */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 200,
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: "var(--accent)",
        color: "#fff",
        boxShadow: "0 12px 26px -10px rgba(37,99,235,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        pointerEvents: show ? "auto" : "none",
        transition: "opacity .3s, transform .3s",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
