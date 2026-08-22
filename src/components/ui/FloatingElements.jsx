import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STARS = ["✦", "✧"];
const BLOOMS = ["🌸", "🦋"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingElements({ count = 11 }) {
  const reduce = useReducedMotion();

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const kind = i % 4; // 0,1 stars | 2 mote | 3 bloom/wing
      let char = null;
      let size = randomBetween(10, 18);
      let opacity = 0.5;
      let color = "var(--gold)";

      if (kind === 0 || kind === 1) {
        char = STARS[i % STARS.length];
        size = randomBetween(9, 15);
        opacity = randomBetween(0.3, 0.6);
        color = i % 2 ? "var(--gold)" : "rgba(255,255,255,0.9)";
      } else if (kind === 2) {
        char = null; // soft mote
        size = randomBetween(5, 9);
        opacity = randomBetween(0.25, 0.5);
      } else {
        char = BLOOMS[i % BLOOMS.length];
        size = randomBetween(16, 22);
        opacity = randomBetween(0.35, 0.55);
      }

      return {
        id: i,
        char,
        color,
        size,
        opacity,
        left: randomBetween(3, 95),
        top: randomBetween(-8, 92),
        duration: randomBetween(22, 34),
        delay: randomBetween(0, 10),
        drift: randomBetween(-26, 26),
        rise: randomBetween(28, 60),
      };
    });
  }, [count]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: item.size,
            opacity: item.opacity,
            color: item.color,
            filter: item.char
              ? "drop-shadow(0 4px 8px rgba(221,123,161,0.18))"
              : "blur(1px)",
            background: item.char ? "transparent" : item.color,
            width: item.char ? "auto" : item.size,
            height: item.char ? "auto" : item.size,
            borderRadius: item.char ? "0" : "50%",
          }}
          animate={{
            y: [0, -item.rise, 0],
            x: [0, item.drift, 0],
            opacity: [
              item.opacity * 0.5,
              item.opacity,
              item.opacity * 0.5,
            ],
            scale: item.char ? [1, 1.08, 1] : [1, 1.15, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.char}
        </motion.span>
      ))}
    </div>
  );
}
