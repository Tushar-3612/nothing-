import { motion, useReducedMotion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import { resolveGreeting } from "../../data/config.js";

export default function BirthdayIntro({ config, onOpen }) {
  const reduce = useReducedMotion();
  const greeting = resolveGreeting(config.intro.greeting, config.name);

  const reveal = (delay) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            delay,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <motion.section
      id="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(2rem, 8vh, 4rem) clamp(1.1rem, 5vw, 2.5rem)",
      }}
    >
      <motion.h1
        {...reveal(0.3)}
        style={{
          fontSize: "clamp(2.4rem, 8vw, 4.6rem)",
          maxWidth: "18ch",
          marginInline: "auto",
        }}
      >
        {greeting}
      </motion.h1>

      <motion.p
        {...reveal(0.7)}
        style={{
          marginTop: "1.4rem",
          maxWidth: "40ch",
          fontSize: "clamp(1.05rem, 3.8vw, 1.3rem)",
          color: "var(--text-soft)",
          fontWeight: 500,
        }}
      >
        {config.intro.line}
      </motion.p>

      <motion.div
        {...reveal(1.1)}
        style={{ marginTop: "2.6rem" }}
      >
        <PrimaryButton onClick={onOpen} ariaLabel={config.intro.cta}>
          {config.intro.cta}
        </PrimaryButton>
      </motion.div>

      <motion.span
        {...reveal(1.4)}
        style={{
          position: "absolute",
          bottom: "1.8rem",
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-soft)",
          opacity: 0.7,
        }}
      >
        {config.birthday}
      </motion.span>
    </motion.section>
  );
}
