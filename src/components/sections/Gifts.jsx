import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import { config } from "../../data/config.js";
import { gifts } from "../../data/content.js";

const STATUS = ["One down. ✨", "Two down.", "That's all the gifts."];

function GiftCard({ gift, index, isLast, opened, onOpen, onNext, onContinue }) {
  const title = gift.title ?? config[gift.titleKey] ?? gift.fallbackTitle;
  const lines = gift.lines ?? [config[gift.descKey] ?? gift.fallbackDescription];
  const url = config[gift.urlKey];
  const links = gift.links ?? (url ? [{ label: gift.button, url }] : null);
  const hasLinks = Boolean(links && links.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -22, scale: 0.94 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "min(440px, 92vw)",
        margin: "0 auto",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--card-shadow)",
        padding: "clamp(1.8rem, 4vw, 2.6rem)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "80%",
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(243,201,139,0.22), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          fontSize: "0.78rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 700,
        }}
      >
        {gift.label}
      </div>

      {!opened ? (
        <div style={{ marginTop: "1rem" }}>
          <div
            aria-hidden="true"
            style={{
              fontSize: "3.2rem",
              margin: "1rem 0 0.4rem",
              filter: "drop-shadow(0 6px 12px rgba(221,123,161,0.25))",
            }}
          >
            🎁
          </div>
          <h3
            style={{
              fontSize: "1.4rem",
              color: "var(--accent)",
              margin: "0.4rem 0 1.2rem",
            }}
          >
            {title}
          </h3>
          <PrimaryButton onClick={onOpen} variant="soft" ariaLabel={`Open ${title}`}>
            Open Gift
          </PrimaryButton>
        </div>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <div aria-hidden="true" style={{ fontSize: "2.4rem", margin: "0.4rem 0" }}>
            ✨
          </div>
          <h3
            style={{
              fontSize: "1.4rem",
              color: "var(--accent)",
              marginBottom: "0.9rem",
            }}
          >
            {title}
          </h3>
          {lines.map((line, i) => (
            <p
              key={i}
              style={{
                color: "var(--text-soft)",
                fontSize: "1.02rem",
                margin: "0.4rem auto",
                maxWidth: "32rem",
              }}
            >
              {line}
            </p>
          ))}

          {gift.code && (
            <div
              style={{
                marginTop: "1.1rem",
                display: "inline-block",
                padding: "0.7rem 1.3rem",
                borderRadius: "var(--radius-card)",
                border: "1px dashed var(--accent-soft)",
                background: "var(--card-bg)",
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.02em",
              }}
            >
              {gift.code}
            </div>
          )}

          {gift.note && (
            <p
              style={{
                marginTop: "1rem",
                color: "var(--text-soft)",
                fontSize: "0.88rem",
                fontStyle: "italic",
                opacity: 0.85,
                maxWidth: "32rem",
                marginInline: "auto",
              }}
            >
              {gift.note}
            </p>
          )}

          {gift.delay && (
            <p
              style={{
                marginTop: "0.9rem",
                color: "var(--gold)",
                fontSize: "0.92rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                opacity: 0.9,
              }}
            >
              {gift.delay}
            </p>
          )}

          <div
            style={{
              marginTop: "1.4rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.8rem",
            }}
          >
            {hasLinks ? (
              links.map((link, li) => (
                <motion.a
                  key={li}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.95rem 2rem",
                    borderRadius: "999px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    color: "var(--white)",
                    background: "linear-gradient(135deg, var(--accent), var(--lilac))",
                    boxShadow: "0 18px 44px -22px rgba(221,123,161,0.55)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))
            ) : (
              <PrimaryButton
                variant="ghost"
                ariaLabel={gift.placeholderButton}
                style={{ opacity: 0.6, cursor: "not-allowed" }}
                onClick={(e) => e.preventDefault()}
              >
                {gift.placeholderButton}
              </PrimaryButton>
            )}
          </div>

          <p
            style={{
              marginTop: "1.1rem",
              color: "var(--gold)",
              fontWeight: 600,
              fontSize: "0.98rem",
            }}
          >
            {STATUS[index]}
          </p>

          <div style={{ marginTop: "0.6rem" }}>
            {!isLast ? (
              <PrimaryButton onClick={onNext} variant="soft" ariaLabel="Next gift">
                Next Gift →
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onClick={onContinue}
                variant="soft"
                ariaLabel="Continue to your message"
              >
                Continue →
              </PrimaryButton>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Gifts() {
  const [current, setCurrent] = useState(0);
  const [opened, setOpened] = useState([false, false, false]);

  const openGift = (i) => {
    setOpened((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  };

  const nextGift = () => {
    setCurrent((c) => Math.min(c + 1, gifts.length - 1));
  };

  const goToFinale = () => {
    document.getElementById("finale")?.scrollIntoView({ behavior: "smooth" });
  };

  const gift = gifts[current];

  return (
    <section
      id="gifts"
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
          style={{ textAlign: "center", fontSize: "clamp(1.9rem, 5vw, 2.9rem)" }}
        >
          Your Gifts 🎁
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            textAlign: "center",
            color: "var(--text-soft)",
            margin: "0.6rem auto 2.6rem",
            maxWidth: "34rem",
          }}
        >
          Three little things I thought you might like.
        </motion.p>

        {/* Fixed-height responsive stage — transitions happen in place */}
        <div
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "clamp(460px, 64svh, 600px)",
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            <GiftCard
              key={gift.id}
              gift={gift}
              index={current}
              isLast={current === gifts.length - 1}
              opened={opened[current]}
              onOpen={() => openGift(current)}
              onNext={nextGift}
              onContinue={goToFinale}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
