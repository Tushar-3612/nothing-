import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  { color: "var(--rose)", size: 480, top: "-14%", left: "-10%", dx: 40, dy: 30 },
  { color: "var(--lilac)", size: 440, top: "6%", left: "64%", dx: -36, dy: 24 },
  { color: "var(--peach)", size: 400, top: "60%", left: "10%", dx: 30, dy: -40 },
  { color: "var(--gold)", size: 320, top: "72%", left: "72%", dx: -30, dy: -24 },
];

export default function AnimatedBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: "var(--bg-gradient)",
      }}
    >
      {/* soft glow behind hero content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg-glow)",
        }}
      />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            reduce
              ? { opacity: 0.4, scale: 1 }
              : {
                  opacity: [0.22, 0.4, 0.22],
                  scale: [1, 1.12, 1],
                  x: [0, orb.dx, 0],
                  y: [0, orb.dy, 0],
                }
          }
          transition={{
            opacity: { duration: 1.6, delay: 0.2 },
            scale: { duration: 1.6, delay: 0.2 },
            ...(reduce
              ? {}
              : {
                  x: { duration: 26 + i * 3, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 30 + i * 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: {
                    duration: 16 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 18 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }),
          }}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: orb.color,
            filter: "blur(85px)",
            opacity: 0.35,
            mixBlendMode: "multiply",
          }}
        />
      ))}

      {/* faint editorial curved lines */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, opacity: 0.5 }}
      >
        <path
          d="M-40 240 C 320 120 520 360 900 220 S 1380 160 1520 300"
          fill="none"
          stroke="rgba(221,123,161,0.10)"
          strokeWidth="1.2"
        />
        <path
          d="M-40 700 C 360 620 560 820 960 700 S 1360 660 1520 760"
          fill="none"
          stroke="rgba(203,178,236,0.12)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
