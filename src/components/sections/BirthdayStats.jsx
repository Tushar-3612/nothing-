import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import { config } from "../../data/config.js";
import {
  formatBirthday,
  getTimeAlive,
  getDaysUntilNextBirthday,
  isBirthdayToday,
} from "../../utils/birthday.js";

const pad = (n, len = 2) => String(n).padStart(len, "0");

function LifeCounter() {
  const birth = useMemo(() => new Date(config.birthDate), []);
  const [time, setTime] = useState(() => getTimeAlive(birth));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeAlive(birth));
    }, 1000);
    return () => clearInterval(id);
  }, [birth]);

  const units = [
    { label: "Years", value: time.years },
    { label: "Days", value: time.days },
    { label: "Hours", value: pad(time.hours) },
    { label: "Minutes", value: pad(time.minutes) },
    { label: "Seconds", value: pad(time.seconds) },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: "clamp(0.5rem, 1.6vw, 1.1rem)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      {units.map((u) => (
        <div
          key={u.label}
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--card-shadow)",
            padding: "clamp(1rem, 2.4vw, 1.7rem) 0.4rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1.9rem, 6vw, 3.2rem)",
              lineHeight: 1,
              background: "linear-gradient(135deg, var(--accent), var(--lilac))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {u.value}
          </div>
          <div
            style={{
              marginTop: "0.65rem",
              fontSize: "clamp(0.62rem, 1.6vw, 0.78rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-soft)",
            }}
          >
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoCard({ label, children, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: "1 1 240px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--card-shadow)",
        padding: "1.8rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-soft)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "0.7rem",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          color: accent || "var(--accent)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function BirthdayStats() {
  const birth = new Date(config.birthDate);
  const now = new Date();
  const todayIsBirthday = isBirthdayToday(birth, now);
  const daysUntil = getDaysUntilNextBirthday(birth, now);
  const reduce = useReducedMotion();

  const handleContinue = () => {
    document.getElementById("wish")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="stats"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(4rem, 12vh, 8rem) 0",
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            marginBottom: "0.6rem",
          }}
        >
          A few numbers worth celebrating
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            textAlign: "center",
            color: "var(--text-soft)",
            marginBottom: "0.5rem",
          }}
        >
          Look how much life you've already lived. 🎉
        </motion.p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2.4rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-soft)",
            }}
          >
            <motion.span
              aria-hidden="true"
              animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
        since you were born
          </span>
        </div>

        <LifeCounter />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.2rem",
            marginTop: "2.6rem",
            justifyContent: "center",
          }}
        >
          <InfoCard label="Birthday">{formatBirthday(birth)}</InfoCard>
          <InfoCard
            label="Next Birthday"
            accent={todayIsBirthday ? "var(--gold)" : "var(--accent)"}
          >
            {todayIsBirthday ? "Today is the day ✨" : `${daysUntil} days`}
          </InfoCard>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", marginTop: "2.6rem" }}
        >
          <PrimaryButton onClick={handleContinue} variant="soft" ariaLabel="Continue">
            Continue →
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
