import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Menu, X, Youtube } from "lucide-react";
import { BTN_PRIMARY } from "../constants/btnPrimary";
import { useNavigate } from "react-router-dom";

export const NAV_LABELS = ["Orações", "Limpezas", "Defesas", "Oráculo"] as const;

const NAV_ICONS: Record<string, string> = {
  "Orações": "/icons/universo-pray.png",
  "Limpezas": "/icons/universo-incense.png",
  "Defesas": "/icons/defenses-luz.png",
  "Oráculo": "/icons/ayahuasca.png",
};

const NAV_BTN_CLASS =
  "group relative flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 sm:py-2 sm:px-5 sm:text-sm";

/**
 * Barra de navegação global (fixa no topo). Reutilizar em todas as páginas.
 */
export default function SiteNav() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (label: string) => {
    if (label === "Orações") {
      navigate("/prayers");
    } else if (label === "Limpezas") {
      navigate("/cleansing");
    } else if (label === "Defesas") {
      navigate("/defense");
    } else if (label === "Oráculo") {
      navigate("/oracle");
    } else {
      navigate("/");
    }
    setNavOpen(false);
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
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed left-0 right-0 top-0 z-50 bg-transparent"
      role="navigation"
      aria-label="Principal"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
        <a href="/" className="flex shrink-0 items-center gap-2.5 outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95 transition-transform">
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

        <div className="flex items-center gap-3">
          {/* Desktop Nav */}
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
                      label === "Defesas" || label === "Oráculo" ? "invert mix-blend-screen" : "brightness-0 invert"
                    }`}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px -8px rgba(139,92,246,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
              }}
            >
              YouTube
              <Youtube className="h-4 w-4 text-white transition-transform group-hover:scale-110 md:h-4.5 md:w-4.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                Menu
              </span>
              <ArrowRight className="h-3 w-3 animate-pulse text-white" />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ring-1 ring-inset ring-white/40 transition-all hover:brightness-110 active:scale-90"
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
          className={`${navOpen ? "flex" : "hidden"} w-full basis-full flex-col items-end pt-2 sm:hidden`}
        >
          <div className="flex w-fit flex-col gap-2">
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
                      label === "Defesas" || label === "Oráculo" ? "invert mix-blend-screen" : "brightness-0 invert"
                    }`}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px -8px rgba(139,92,246,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
              }}
            >
              YouTube
              <Youtube className="h-4.5 w-4.5 text-white transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
