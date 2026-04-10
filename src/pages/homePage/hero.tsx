import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
} from "lucide-react";
/*
  Hero Section — Universo de Luz
  ──────────────────────────────
  Camadas de fundo (de baixo para cima):
    z-0  → UnicornStudio WebGL com hue-rotate(220deg) fogo → galáxia
    z-1  → Stars pattern + glows indigo/fuchsia
    z-10 → Conteúdo (nav, hero grid, app showcase)

  Paleta galáxia (substituição do laranja original):
    orange-400/500  →  cyan-400/500
    orange-600      →  purple-600
    amber-500       →  purple-400
    yellow-200/300  →  cyan-200 / indigo-200
    rgba(249,115,22)→  rgba(6,182,212)  ← cyan-500
    rgba(251,146,60)→  rgba(139,92,246) ← violet-500
*/

// ── TypeScript: extensão do objeto window para UnicornStudio ─────────────────
declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
  }
}

// ── Carrega script UnicornStudio e sinaliza quando o WebGL está pronto ───────
function useUnicornStudio() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fallback: mostra conteúdo mesmo que o WebGL demore muito (4s)
    const fallback = setTimeout(() => setReady(true), 4000);

    if (window.UnicornStudio?.isInitialized) {
      setReady(true);
      clearTimeout(fallback);
      return;
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} };
    const s = document.createElement("script");
    s.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js";
    s.async = true;
    s.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
      // Aguarda 2 frames para o WebGL renderizar o primeiro frame visível
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          clearTimeout(fallback);
          setReady(true);
        })
      );
    };
    document.head.appendChild(s);

    return () => clearTimeout(fallback);
  }, []);

  return ready;
}


// ── Constantes de estilo ──────────────────────────────────────────────────────
// Gradiente do botão principal (cyan → azul → roxo)
const BTN_PRIMARY: React.CSSProperties = {
  background: "linear-gradient(to top, #a5f3fc, #3b82f6, #7c3aed)",
  boxShadow: "0 0 40px -5px rgba(139,92,246,0.6)",
};
// Box-shadow do card elétrico
const CARD_GLOW =
  "0 0 30px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.1)";

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║                             HERO COMPONENT                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
export default function Hero() {
  const bgReady = useUnicornStudio();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION (nav + grid + fundo animado)
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen overflow-hidden text-white selection:bg-cyan-500/30"
        style={{ backgroundColor: "#050505" }}
      >
        {/* ── Camada 0: UnicornStudio WebGL — hue-rotate(220°) ────── */}
        {/* Sempre renderiza; opacidade vai de 0→1 assim que o WebGL inicializa */}
        <div
          className="pointer-events-none absolute inset-0 z-1"
          style={{
            filter: "hue-rotate(220deg) saturate(1.4) brightness(1.05)",
            opacity: bgReady ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <div
            className="absolute left-0 top-0 -z-10 h-full w-full"
            data-us-project="AhqzKk9mZE0EnlENMQDi"
          />
        </div>

        {/* ── Camada 1: Stars + glows de nebulosa ─────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-2">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: [
                "radial-gradient(1px 1px at 20px 30px,#fff,rgba(0,0,0,0))",
                "radial-gradient(1px 1px at 40px 70px,#fff,rgba(0,0,0,0))",
                "radial-gradient(1px 1px at 50px 160px,#fff,rgba(0,0,0,0))",
                "radial-gradient(1.5px 1.5px at 90px 40px,#fff,rgba(0,0,0,0))",
                "radial-gradient(1px 1px at 130px 80px,#fff,rgba(0,0,0,0))",
              ].join(","),
              backgroundSize: "200px 200px",
            }}
          />
          {/* Glow azul/índigo — topo (Via Láctea azul) */}
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-900/20 blur-[120px]" />
          {/* Glow fúcsia/roxo — base direita */}
          <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-fuchsia-900/20 blur-[100px]" />
        </div>

        {/* ── NAV + CONTEÚDO — só aparece após o WebGL estar pronto ── */}
        <motion.nav
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logos/logo.svg"
              aria-hidden="true"
              style={{ height: "32px", width: "32px", flexShrink: 0 }}
            />
            <img
              src="/logos/name.svg"
              alt="Universo de Luz"
              style={{ height: "26px", width: "auto", flexShrink: 0 }}
            />
          </div>

        </motion.nav>

        {/* ── HERO GRID ───────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-20 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">

          {/* Left: 7 colunas */}
          <div className="flex flex-col items-start lg:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-sm"
            >
              <img src="/logos/logo.svg" aria-hidden="true" style={{ height: "14px", width: "14px", flexShrink: 0 }} />
              Consciência · Expansão · Cura
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="mb-6 text-5xl font-light leading-[1.05] tracking-tight text-white lg:text-[76px]"
              style={{ fontFamily: "'Optima','Zapf Humanist','Tenor Sans',sans-serif" }}
            >
              DESPERTE
              <br />
              <span
                className="text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg,#67e8f9 0%,#818cf8 50%,#f0abfc 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                SUA LU
              </span><span style={{ color: "#67e8f9" }}>Z</span>
              <br />
              INTERIOR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="mb-10 max-w-xl text-lg leading-relaxed text-white"
            >
              Vivências transformadoras que expandem a consciência, reconectam com o sagrado e promovem cura profunda do ser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
              className="mb-20 flex flex-wrap items-center gap-4"
            >
              <button
                className="group relative flex items-center justify-center gap-2.5 rounded-full px-8 py-3 text-lg font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                style={BTN_PRIMARY}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px -5px rgba(139,92,246,0.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
              >
                Retiro Cura do Beija-Flor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="group relative flex items-center justify-center gap-2.5 rounded-full px-8 py-3 text-lg font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                style={BTN_PRIMARY}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px -5px rgba(139,92,246,0.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
              >
                Conheça o Universo de Luz
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Right: 5 colunas — Electric Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex justify-center lg:col-span-5 lg:justify-center lg:-translate-x-8"
          >
            <div
              className="relative w-[360px] overflow-hidden rounded-[32px] bg-neutral-900 p-[2px]"
              style={{ boxShadow: CARD_GLOW }}
            >
              {/* Gradient border */}
              <div className="absolute inset-0 z-0 bg-linear-to-b from-cyan-300 via-purple-500 to-transparent opacity-80" />

              {/* Inner */}
              <div className="relative z-10 flex flex-col gap-3 overflow-hidden rounded-[30px] bg-[#0A0A0A] p-6">
                <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-purple-500/10 to-transparent" />
                {["Orações", "Limpezas", "Defesas", "Magias"].map((label) => (
                  <button
                    key={label}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                    style={BTN_PRIMARY}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px -5px rgba(139,92,246,0.8)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
                  >
                    {label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
