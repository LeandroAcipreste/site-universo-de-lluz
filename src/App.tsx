import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import HomePage from "./pages/homePage/homePage";
import Introduction from "./pages/homePage/introduction";

export default function App() {
  const [phase, setPhase] = useState<"intro" | "home">("intro");

  const handleIntroComplete = useCallback(() => setPhase("home"), []);

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <Introduction onComplete={handleIntroComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <HomePage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
