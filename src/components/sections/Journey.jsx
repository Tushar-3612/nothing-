import { motion } from "framer-motion";
import BirthdayWelcome from "./BirthdayWelcome.jsx";
import BirthdayStats from "./BirthdayStats.jsx";
import MakeAWish from "./MakeAWish.jsx";
import Gifts from "./Gifts.jsx";
import Finale from "./Finale.jsx";

export default function Journey() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <BirthdayWelcome />
      <BirthdayStats />
      <MakeAWish />
      <Gifts />
      <Finale />
    </motion.div>
  );
}
