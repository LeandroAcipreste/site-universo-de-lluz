import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import SiteNav from "./components/siteNav";
import Introduction from "./pages/homePage/introduction";
import { AppRoutes } from "./routes/router";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [phase, setPhase] = useState<"intro" | "home">(
    window.location.pathname !== "/" ? "home" : "intro"
  );
  const location = useLocation();

  const handleIntroComplete = useCallback(() => setPhase("home"), []);

  return (
    <>
      {/* Fora do motion.div da home: opacidade animada no pai deixava a nav fixa invisível */}
      {phase === "home" ? <SiteNav /> : null}
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
            key={location.pathname} // CHAVE DINÂMICA: Essencial para transições entre rotas
            // Na Home, remover a opacidade do pai é essencial. A Home já tem as animações próprias do Hero.
            // Opacidade global + WebGL + Filtros de Blur causava um "composite thrashing" no navegador, gerando os travamentos.
            initial={{ opacity: location.pathname === "/" ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <AppRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
