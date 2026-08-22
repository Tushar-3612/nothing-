import { motion } from "framer-motion";
import { wishes } from "../../data/content.js";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const card = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BirthdayWishes() {
  return (
    <section
      id="wishes"
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
          A few wishes, just for you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            textAlign: "center",
            color: "var(--text-soft)",
            marginBottom: "2.8rem",
          }}
        >
          One at a time, the way good things should arrive. 💌
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.4rem",
            maxWidth: 920,
            marginInline: "auto",
          }}
        >
          {wishes.map((w) => (
            <motion.article
              key={w.id}
              variants={card}
              whileHover={{ y: -6 }}
              style={{
                background: "var(--card-bg)",
                borderRadius: "var(--radius-card)",
                padding: "2.4rem 1.9rem",
                textAlign: "center",
                boxShadow: "var(--card-shadow)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>
                {w.emoji}
              </div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "0.6rem",
                  color: "var(--accent)",
                }}
              >
                {w.title}
              </h3>
              <p style={{ color: "var(--text-soft)", fontSize: "1rem" }}>
                {w.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
