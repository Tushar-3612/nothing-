import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp.jsx";

export default function StatCard({ label, value, isText = false, index = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        background: "var(--card-bg)",
        borderRadius: "var(--radius-card)",
        padding: "2rem 1.5rem",
        textAlign: "center",
        boxShadow: "var(--card-shadow)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 6vw, 2.8rem)",
          fontWeight: 600,
          background: "linear-gradient(135deg, var(--accent), var(--lilac))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "var(--accent)",
        }}
      >
        {isText ? value : <CountUp value={value} />}
      </div>
      <div
        style={{
          marginTop: "0.5rem",
          fontSize: "0.92rem",
          letterSpacing: "0.04em",
          color: "var(--text-soft)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
