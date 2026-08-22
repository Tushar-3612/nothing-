import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { config } from "../../data/config.js";

export default function Finale() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  const lines = [
    "I hope this little surprise made your birthday a little more special.",
    "Keep smiling, keep learning, keep growing, and keep being you.",
    `Happy Birthday, ${config.recipientName}. 🎂`,
  ];

  return (
    <section
      id="finale"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(4rem, 12vh, 8rem) clamp(1.1rem, 5vw, 2.5rem)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)" }}
      >
        That's all... for now. ✨
      </motion.h2>

      <div style={{ marginTop: "1.6rem", maxWidth: "40rem" }}>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: show ? 0.2 + i * 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: i === lines.length - 1 ? "clamp(1.3rem, 4vw, 1.8rem)" : "clamp(1.05rem, 3.6vw, 1.25rem)",
              fontWeight: i === lines.length - 1 ? 600 : 500,
              color: i === lines.length - 1 ? "var(--accent)" : "var(--text)",
              margin: "0.8rem auto",
              lineHeight: 1.55,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 0.7 } : {}}
        transition={{ duration: 1, delay: 0.2 + lines.length * 0.5 }}
        style={{
          marginTop: "2.4rem",
          fontSize: "0.85rem",
          letterSpacing: "0.04em",
          color: "var(--text-soft)",
        }}
      >
        Made with a little too much effort. 😄
      </motion.p>
    </section>
  );
}
