import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/ui/Loader.jsx";
import AnimatedBackground from "./components/ui/AnimatedBackground.jsx";
import FloatingElements from "./components/ui/FloatingElements.jsx";
import CelebrationBurst from "./components/ui/CelebrationBurst.jsx";
import BirthdayIntro from "./components/sections/BirthdayIntro.jsx";
import Journey from "./components/sections/Journey.jsx";
import ProgressIndicator from "./components/ui/ProgressIndicator.jsx";
import { config } from "./data/config.js";

function buildThemeVars(c) {
  return {
    "--accent": c.accent,
    "--accent-soft": c.accentSoft,
    "--lilac": c.lilac,
    "--peach": c.peach,
    "--gold": c.gold,
    "--plum": c.text,
    "--plum-soft": c.textSoft,
    "--white": c.white,
    "--cream": c.bgTop,
    "--blush": c.bgMid,
    "--bg-gradient": `radial-gradient(1200px 800px at 15% -10%, ${c.bgMid} 0%, transparent 55%), radial-gradient(1000px 700px at 110% 10%, ${c.lilac}33 0%, transparent 50%), linear-gradient(160deg, ${c.bgTop} 0%, ${c.bgMid} 60%, ${c.bgBottom} 100%)`,
  };
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  return (
    <div style={buildThemeVars(config.colors)}>
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatedBackground />
      <FloatingElements />

      <CelebrationBurst play={opened} />

      {opened && <ProgressIndicator />}

      <main>
        <AnimatePresence mode="wait">
          {!opened ? (
            <BirthdayIntro
              key="intro"
              config={config}
              onOpen={() => setOpened(true)}
            />
          ) : (
            <Journey key="journey" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
