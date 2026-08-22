import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import CelebrationBurst from "../ui/CelebrationBurst.jsx";
import Candle from "../ui/Candle.jsx";
import BirthdayCake3D from "../cake/BirthdayCake3D.jsx";
import WishPopup from "../ui/WishPopup.jsx";
import { wishMessage, journeyWish, giftTransition } from "../../data/content.js";

const CANDLE_OFFSETS = [-62, -31, 0, 31, 62];

// Clean state flow:
// candles -> waiting -> cutting -> wish (popup) -> journey -> (scroll to gifts)
export default function MakeAWish() {
  const [candles, setCandles] = useState(() => [true, true, true, true, true]);
  const candlesRef = useRef([true, true, true, true, true]);
  const [phase, setPhase] = useState("candles");
  const [celebrate, setCelebrate] = useState(false);
  const reduce = useReducedMotion();
  const completeFiredRef = useRef(false);
  const timersRef = useRef([]);

  const handleCandle = (i) => {
    if (phase !== "candles") return; // ignore clicks once the sequence has started
    const next = candlesRef.current.map((v, idx) => (idx === i ? false : v));
    candlesRef.current = next;
    setCandles(next);
    // Use the freshly computed array, never the stale closure value.
    if (next.every((v) => !v)) {
      setPhase("waiting");
    }
  };

  // Drive the timed sequence from a single effect keyed on phase.
  useEffect(() => {
    const timers = [];
    if (phase === "waiting") {
      console.log("[Cake] Waiting before cut...");
      timers.push(setTimeout(() => setPhase("cutting"), 1800));
    } else if (phase === "cutting") {
      timers.push(setTimeout(() => setPhase("wish"), 3000));
    } else if (phase === "journey") {
      if (!completeFiredRef.current) {
        completeFiredRef.current = true;
        setCelebrate(true);
      }
    }
    timersRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const cakeCut = ["cutting", "wish", "journey"].includes(phase);
  const showCandles = ["candles", "waiting"].includes(phase);

  const goToGifts = () => {
    document.getElementById("gifts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="wish"
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
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}
      >
        Make a Wish 🎂
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ marginTop: "0.6rem", color: "var(--text-soft)" }}
      >
        {phase === "candles"
          ? "Tap the candles to blow them out."
          : phase === "waiting"
          ? "One last breath…"
          : phase === "cutting"
          ? "Making a wish come true… ✨"
          : ""}
      </motion.p>

      {/* Cake stage */}
      <div
        style={{
          position: "relative",
          width: "min(340px, 86vw)",
          height: "min(300px, 64vw)",
          margin: "1.4rem auto 0.5rem",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <BirthdayCake3D cut={cakeCut} reduce={reduce} />
        </div>

        {/* Candle overlay */}
        <motion.div
          animate={{ opacity: showCandles ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: showCandles ? "auto" : "none",
          }}
        >
          {CANDLE_OFFSETS.map((offset, i) => (
            <Candle
              key={i}
              offset={offset}
              lit={candles[i]}
              onToggle={() => handleCandle(i)}
            />
          ))}
        </motion.div>
      </div>

      {/* Post-popup journey + gift transition */}
      <AnimatePresence>
        {phase === "journey" && (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: "1.6rem",
              maxWidth: "34rem",
              width: "100%",
            }}
          >
            {/* subtle journey encouragement */}
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--radius-card)",
                boxShadow: "var(--card-shadow)",
                padding: "clamp(1.6rem, 4vw, 2.2rem)",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "var(--accent)",
                  marginBottom: "0.9rem",
                }}
              >
                {journeyWish.heading}
              </h3>
              {journeyWish.lines.map((line, i) =>
                line === "" ? (
                  <div key={i} style={{ height: "0.5rem" }} />
                ) : (
                  <p
                    key={i}
                    style={{
                      color: "var(--text-soft)",
                      fontSize: "1rem",
                      margin: "0.35rem auto",
                      maxWidth: "30rem",
                    }}
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            {/* calm pause + bridge to gifts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ marginTop: "2rem" }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                }}
              >
                {giftTransition.line}
              </p>
              <p
                style={{
                  color: "var(--text-soft)",
                  fontSize: "1.02rem",
                  maxWidth: "32rem",
                  margin: "0 auto 1.6rem",
                }}
              >
                {giftTransition.sub}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PrimaryButton
                  onClick={goToGifts}
                  variant="soft"
                  ariaLabel="Open your gifts"
                >
                  {giftTransition.button}
                </PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wish popup overlay */}
      <AnimatePresence>
        {phase === "wish" && (
          <WishPopup
            message={wishMessage}
            reduce={reduce}
            onContinue={() => setPhase("journey")}
          />
        )}
      </AnimatePresence>

      <CelebrationBurst play={celebrate} />
    </section>
  );
}
