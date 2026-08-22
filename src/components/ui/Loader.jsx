import { motion, useReducedMotion } from "framer-motion";

export default function Loader({ onDone }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.4rem",
        background: "var(--bg-gradient)",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ fontSize: "3.2rem" }}
        animate={reduce ? {} : { y: [0, -12, 0], rotate: [0, 8, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎂
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          color: "var(--plum-soft)",
        }}
      >
        Wrapping your surprise…
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onDone}
        style={{
          width: "min(220px, 60vw)",
          height: 4,
          borderRadius: 999,
          background: "linear-gradient(90deg, var(--rose), var(--lilac))",
          transformOrigin: "left",
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          display: "flex",
          gap: "0.6rem",
          fontSize: "1.1rem",
          opacity: 0.7,
        }}
      >
        {["✨", "🌸", "🎀"].map((c, i) => (
          <motion.span
            key={c}
            animate={reduce ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
