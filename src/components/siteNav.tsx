import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X, Youtube } from "lucide-react";
import { BTN_PRIMARY } from "../constants/btnPrimary";

export const NAV_LABELS = ["Orações", "Limpezas", "Defesas", "Oráculo"] as const;

const NAV_ICONS: Record<string, string> = {
  "Orações": "/icons/universo-pray.png",
  "Limpezas": "/icons/universo-incense.png",
  "Defesas": "/icons/defenses-luz.png",
  "Oráculo": "/icons/ayahuasca.png",
};

const NAV_BTN_CLASS =
  "group relative flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 sm:py-2 sm:px-5 sm:text-sm";

export default function SiteNav() {
  const [navOpen, setNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80 || navOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const isDesktop = window.matchMedia("(hover: hover)").matches;
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [navOpen]);

  // ─── O SEGREDO: Roteamento nativo limpa o lixo de memória do GSAP/Lenis
  const handleNavClick = (label: string) => {
    setNavOpen(false);

    let path = "/";
    if (label === "Orações") path = "/prayers";
    else if (label === "Limpezas") path = "/cleansing";
    else if (label === "Defesas") path = "/defense";
    else if (label === "Oráculo") path = "/oracle";
    else if (label === "YouTube") path = "/youtube";
    else if (label === "Página Inicial") path = "/";

    window.location.href = path;
  };

  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  return (
    <>
      {/* Backdrop de fundo escuro com blur para dar foco e contraste nos botões do menu mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/75 backdrop-blur-[3px] transition-all duration-300 md:hidden ${
          navOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNavOpen(false)}
      />

      <motion.nav
        initial={{ opacity: 0, y: -80 }}
      animate={{
        opacity: isVisible || navOpen ? 1 : 0,
        y: isVisible || navOpen ? 0 : -80
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 bg-transparent md:bg-gradient-to-b md:from-black/80 md:to-transparent md:backdrop-blur-[2px]"
      style={{
        // O wrapper ocupa toda a largura mas NÃO deve capturar eventos
        // Somente o div filho com conteúdo real recebe pointer-events
        pointerEvents: "none"
      }}
      role="navigation"
      aria-label="Principal"
    >
      <div
        className="mx-auto relative flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5"
        style={{ pointerEvents: "none" }}
      >
        <a
          href="/"
          className="hidden md:flex shrink-0 items-center gap-2.5 outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95 transition-transform"
          style={{ pointerEvents: "auto" }}
        >
          <img
            src="/logos/logo.svg"
            aria-hidden={true}
            className="h-8 w-8 md:h-9 md:w-9 shrink-0"
          />
          <img
            src="/logos/name.svg"
            alt="Universo de Luz"
            className="h-6 w-auto md:h-7 shrink-0"
          />
        </a>

        <div className="flex ml-auto md:ml-0 items-center gap-3" style={{ pointerEvents: "auto" }}>
          <div className="hidden flex-wrap items-center justify-end gap-2 md:flex lg:gap-3">
            {NAV_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                className={`${NAV_BTN_CLASS} shrink-0`}
                style={BTN_PRIMARY}
                onClick={() => handleNavClick(label)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 40px -8px rgba(139,92,246,0.75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
                }}
              >
                {label}
                {NAV_ICONS[label] ? (
                  <img
                    src={`${NAV_ICONS[label]}?v=4`}
                    className={`h-4 w-4 object-contain transition-transform group-hover:scale-110 md:h-4.5 md:w-4.5 ${
                      label === "Defesas" ? "mix-blend-multiply" : ""
                    }`}
                    style={label === "Defesas" ? {} : { filter: "brightness(0) sepia(1) saturate(5) hue-rotate(245deg) brightness(0.2)" }}
                    alt=""
                  />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            ))}
            <button
              type="button"
              className={`${NAV_BTN_CLASS} shrink-0 bg-red-600/10`}
              style={BTN_PRIMARY}
              onClick={() => handleNavClick("YouTube")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px -8px rgba(139,92,246,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
              }}
            >
              YouTube
              <Youtube className="h-4 w-4 transition-transform group-hover:scale-110 md:h-4.5 md:w-4.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <div className="flex shrink-0 items-center gap-1.5 opacity-60">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                Menu
              </span>
              <ArrowRight className="h-3 w-3 animate-pulse text-white" />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-white/40 transition-all hover:brightness-110 active:scale-90"
              style={BTN_PRIMARY}
              aria-expanded={navOpen}
              aria-controls="site-nav-mobile"
              aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setNavOpen((o) => !o)}
            >
              {navOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>

        <div
          id="site-nav-mobile"
          className={`${navOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col items-end px-4 pt-2 pb-4 sm:hidden`}
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex w-fit flex-col gap-2">
            <button
              type="button"
              className={`${NAV_BTN_CLASS} w-full`}
              style={BTN_PRIMARY}
              onClick={() => handleNavClick("Página Inicial")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px -8px rgba(139,92,246,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
              }}
            >
              Página Inicial
              <img src="/logos/logo.svg" className="h-4 w-4 object-contain" alt="" />
            </button>
            {NAV_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                className={`${NAV_BTN_CLASS} w-full`}
                style={BTN_PRIMARY}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 40px -8px rgba(139,92,246,0.75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
                }}
                onClick={() => handleNavClick(label)}
              >
                {label}
                {NAV_ICONS[label] ? (
                  <img
                    src={`${NAV_ICONS[label]}?v=4`}
                    className={`h-4 w-4 object-contain transition-transform group-hover:scale-110 sm:h-4.5 sm:w-4.5 ${
                      label === "Defesas" ? "mix-blend-multiply" : ""
                    }`}
                    style={label === "Defesas" ? {} : { filter: "brightness(0) sepia(1) saturate(5) hue-rotate(245deg) brightness(0.2)" }}
                    alt=""
                  />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            ))}
            <button
              type="button"
              className={`${NAV_BTN_CLASS} w-full`}
              style={BTN_PRIMARY}
              onClick={() => handleNavClick("YouTube")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px -8px rgba(139,92,246,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
              }}
            >
              YouTube
              <Youtube className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>

    {/* Hint (Dica) visual apenas para a Home Page, pedindo para o usuário aproximar o mouse do topo */}
    <AnimatePresence>
      {isHomePage && !isVisible && !navOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.8, delay: 2.5 }} // Aparece suavemente após a home carregar
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[40] hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
        >
          {/* Triângulo apontando para cima (Chevron) */}
          <div className="w-3 h-3 border-t-[2px] border-l-[2px] border-white/60 rotate-45 animate-bounce" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 drop-shadow-md text-center">
            Aproxime para o menu
          </span>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}