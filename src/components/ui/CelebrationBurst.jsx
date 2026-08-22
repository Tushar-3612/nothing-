import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PIECES = ["✨", "🌸", "🎀", "⭐", "💫", "🎉"];
const COUNT = 18;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function CelebrationBurst({ play }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: COUNT }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / COUNT + randomBetween(-0.2, 0.2);
        const distance = randomBetween(120, 260);
        return {
          id: i,
          char: PIECES[i % PIECES.length],
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: randomBetween(14, 26),
          delay: randomBetween(0, 0.15),
        };
      }),
    []
  );

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            pointerEvents: "none",
            display: "grid",
            placeItems: "center",
          }}
        >
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0, 1, 0],
                scale: [0.4, 1, 0.8],
                rotate: randomBetween(-60, 60),
              }}
              transition={{
                duration: 1.1,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                fontSize: p.size,
                filter: "drop-shadow(0 4px 8px rgba(224,123,160,0.3))",
              }}
            >
              {p.char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
