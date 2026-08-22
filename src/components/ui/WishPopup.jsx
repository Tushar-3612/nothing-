import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PARTICLES = ["✨", "🌸", "⭐", "🕊️", "🦋"];

function useTypewriter(fullText, reduce, onDone) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const delays = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= fullText.length; i++) {
      const ch = fullText[i - 1];
      let d = ch === "\n" ? 12 : 26;
      // pause a beat between stanzas (after a blank line)
      if (i >= 2 && fullText[i - 1] === "\n" && fullText[i - 2] === "\n") {
        d += 620;
      }
      arr.push(d);
    }
    return arr;
  }, [fullText]);

  useEffect(() => {
    if (reduce) {
      setCount(fullText.length);
      setDone(true);
      onDoneRef.current?.();
      return;
    }
    let i = 0;
    let cancelled = false;
    let timer;
    const step = () => {
      if (cancelled) return;
      i += 1;
      if (i > fullText.length) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      setCount(i);
      timer = setTimeout(step, delays[i - 1] ?? 26);
    };
    timer = setTimeout(step, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fullText, reduce, delays]);

  return { count, done };
}

export default function WishPopup({ message, onContinue, reduce }) {
  const fullText = useMemo(() => message.join("\n\n"), [message]);
  const [showContinue, setShowContinue] = useState(false);
  const { count, done } = useTypewriter(fullText, reduce, () =>
    setShowContinue(true)
  );
  const displayed = fullText.slice(0, count);

  return (
    <motion.div
      key="wish-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="A birthday wish"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem, 4vw, 2.5rem)",
        background: "rgba(46, 38, 46, 0.5)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
      }}
    >
      {/* extremely subtle floating particles */}
      {!reduce &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.4, 0.15],
              y: [0, -22, 0],
              x: [0, i % 2 ? 14 : -14, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${18 + ((i * 17) % 64)}%`,
              left: `${8 + ((i * 23) % 80)}%`,
              fontSize: "1.1rem",
              filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.3))",
              pointerEvents: "none",
            }}
          >
            {p}
          </motion.span>
        ))}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "min(540px, 94vw)",
          maxHeight: "86vh",
          overflowY: "auto",
          background:
            "linear-gradient(165deg, #fffdf8 0%, #fdf2f6 55%, #f6eefb 100%)",
          border: "1px solid rgba(221,123,161,0.30)",
          borderRadius: "26px",
          boxShadow: "0 40px 90px -40px rgba(70,58,68,0.55)",
          padding: "clamp(1.8rem, 5vw, 3rem)",
          textAlign: "center",
        }}
      >
        {/* subtle paper texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "26px",
            pointerEvents: "none",
            opacity: 0.5,
            background:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          }}
        />

        {/* delicate inner border */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "18px",
            border: "1px solid rgba(203,178,236,0.35)",
            pointerEvents: "none",
          }}
        />

        {/* small corner decorations */}
        {[
          { top: 14, left: 16, d: 0.5 },
          { top: 14, right: 16, d: 0.7 },
          { bottom: 14, left: 16, d: 0.9 },
          { bottom: 14, right: 16, d: 1.1 },
        ].map((c, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: c.d, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              fontSize: "0.95rem",
              filter: "drop-shadow(0 2px 4px rgba(221,123,161,0.3))",
              ...(c.top !== undefined ? { top: c.top } : { bottom: c.bottom }),
              ...(c.left !== undefined ? { left: c.left } : { right: c.right }),
            }}
          >
            🌸
          </motion.span>
        ))}

        {/* gold accent line */}
        <div
          aria-hidden="true"
          style={{
            width: 54,
            height: 2,
            margin: "0 auto 1.1rem",
            background:
              "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2rem, 6vw, 2.9rem)",
            color: "var(--accent)",
            marginBottom: "1.2rem",
            letterSpacing: "0.01em",
            textShadow: "0 2px 10px rgba(221,123,161,0.18)",
          }}
        >
          Wish Made ✨
        </motion.h3>

        <p
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "left",
            color: "var(--text)",
            fontSize: "clamp(1.18rem, 3.9vw, 1.5rem)",
            lineHeight: 1.7,
            fontFamily: "var(--font-hand)",
            fontWeight: 500,
            minHeight: "8rem",
            margin: "0 auto",
            maxWidth: "34rem",
          }}
        >
          {displayed}
          {!done && (
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-block",
                marginLeft: 2,
                color: "var(--accent)",
                fontWeight: 700,
              }}
            >
              ▍
            </motion.span>
          )}
        </p>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: "1.8rem", display: "flex", justifyContent: "center" }}
            >
              <motion.button
                type="button"
                onClick={onContinue}
                aria-label="Continue"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 2.1rem",
                  borderRadius: "999px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.03em",
                  color: "var(--white)",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--lilac))",
                  boxShadow: "0 18px 44px -22px rgba(221,123,161,0.55)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Continue ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
