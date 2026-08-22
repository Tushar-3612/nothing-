import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Candle({ lit, onToggle, offset }) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lit ? "Blow out candle" : "Relight candle"}
      aria-pressed={!lit}
      style={{
        position: "absolute",
        bottom: 196,
        left: `calc(50% + ${offset}px)`,
        transform: "translateX(-50%)",
        width: 34,
        height: 60,
        padding: 0,
        background: "transparent",
        cursor: "pointer",
        border: "none",
      }}
    >
      {/* stick */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 12,
          height: 46,
          borderRadius: 6,
          background:
            "repeating-linear-gradient(45deg, #ffd9e6 0 6px, #fff 6px 12px)",
          boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.06)",
        }}
      />
      {/* glow */}
      <AnimatePresence>
        {lit && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              bottom: 58,
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,196,120,0.85), transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>
      {/* flame */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={
          lit
            ? { scale: reduce ? 1 : [1, 1.14, 0.94, 1.08, 1], opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={
          lit
            ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.25 }
        }
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14,
          height: 22,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background:
            "radial-gradient(circle at 50% 70%, #fff3c4 0%, #ffb347 45%, #ff7a3c 100%)",
          boxShadow: "0 0 12px rgba(255,150,80,0.6)",
        }}
      />
      {/* smoke */}
      <AnimatePresence>
        {!lit && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.45, 0], y: -34, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(180,170,180,0.6)",
              filter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
