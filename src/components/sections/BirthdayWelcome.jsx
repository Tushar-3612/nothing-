import { motion, useReducedMotion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import { config } from "../../data/config.js";

function GiftBox() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      animate={reduce ? {} : { y: [0, -14, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: 150, height: 150 }}
    >
      {/* box */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 96,
          borderRadius: 18,
          background:
            "linear-gradient(160deg, var(--accent-soft), var(--accent))",
          boxShadow: "var(--shadow-float)",
        }}
      />
      {/* vertical ribbon */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 18,
          height: 96,
          background: "var(--white)",
          opacity: 0.85,
          borderRadius: 4,
        }}
      />
      {/* horizontal ribbon */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 16,
          background: "var(--white)",
          opacity: 0.85,
          borderRadius: 4,
        }}
      />
      {/* bow */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 34,
          borderRadius: "50%",
          border: "10px solid var(--white)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--white)",
        }}
      />
    </motion.div>
  );
}

function Sparkle({ char, top, left, delay, size = 22 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={reduce ? { opacity: 0.7 } : { opacity: [0.2, 0.9, 0.2], y: [0, -10, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ position: "absolute", top, left, fontSize: size }}
    >
      {char}
    </motion.span>
  );
}

export default function BirthdayWelcome() {
  const handleContinue = () => {
    document
      .getElementById("stats")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="welcome"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(3rem, 10vh, 6rem) clamp(1.1rem, 5vw, 2.5rem)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", marginBottom: "2rem" }}
      >
        <GiftBox />
        <Sparkle char="✨" top={-10} left={6} delay={0} />
        <Sparkle char="🌸" top={20} left={-22} delay={0.6} size={20} />
        <Sparkle char="⭐" top={30} left={140} delay={1.1} size={18} />
        <Sparkle char="💫" top={-26} left={120} delay={1.6} size={18} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)" }}
      >
        Happy Birthday, {config.name} 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{
          marginTop: "1.3rem",
          maxWidth: "38ch",
          fontSize: "clamp(1.02rem, 3.6vw, 1.2rem)",
          color: "var(--text-soft)",
          fontWeight: 500,
        }}
      >
       Some days deserve a little more magic. And today happens to be one of them. ✨
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ marginTop: "2.4rem" }}
      >
        <PrimaryButton onClick={handleContinue} ariaLabel="Continue">
          Continue
        </PrimaryButton>
      </motion.div>
    </section>
  );
}
