import { motion } from "framer-motion";

const variants = {
  primary: {
    background: "linear-gradient(135deg, var(--accent), var(--lilac))",
    color: "var(--white)",
    boxShadow: "0 18px 44px -22px rgba(221,123,161,0.55)",
  },
  soft: {
    background: "var(--card)",
    color: "var(--accent)",
    boxShadow: "var(--shadow-soft)",
  },
  ghost: {
    background: "transparent",
    color: "var(--accent)",
    border: "1.5px solid rgba(221,123,161,0.4)",
  },
};

export default function PrimaryButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  ariaLabel,
  style,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
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
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}
