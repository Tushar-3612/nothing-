import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const STEPS = [
  { id: "welcome", label: "Welcome" },
  { id: "stats", label: "Birthday" },
  { id: "wish", label: "Make a Wish" },
  { id: "wishes", label: "Wishes" },
  { id: "gifts", label: "Gifts" },
];

export default function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(p * STEPS.length))
    );
    setActive(idx);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          transformOrigin: "left",
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, var(--accent), var(--lilac))",
          zIndex: 45,
        }}
      />
      <nav
        aria-label="Progress through the birthday experience"
        style={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "clamp(0.6rem, 3vw, 1.4rem)",
          alignItems: "center",
          padding: "0.5rem 0.9rem",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "var(--shadow-soft)",
          zIndex: 45,
          maxWidth: "92vw",
          overflowX: "auto",
        }}
      >
        {STEPS.map((step, i) => {
          const isActive = i === active;
          return (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                whiteSpace: "nowrap",
                color: isActive ? "var(--accent)" : "var(--text-soft)",
                fontWeight: isActive ? 700 : 500,
                opacity: isActive ? 1 : 0.6,
                transition: "color 0.35s ease, opacity 0.35s ease",
                fontSize: "0.82rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="progress-label">— {step.label}</span>
            </div>
          );
        })}
      </nav>
    </>
  );
}
