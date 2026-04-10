import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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

/** Card da oração — alinhado ao electric card do design-system.html */
const ORACAO_CARD_SHADOW =
  "0 0 30px rgba(139,92,246,0.35), inset 0 0 24px rgba(139,92,246,0.12)";

const ORACAO_TIPO = {
  fontFamily: "'Exo 2', system-ui, sans-serif",
} as const;

const ORACAO = {
  titulo: "Divino Criador,",
  estrofes: [
    "Dai-me o vislumbre da tua presença,",
    "Dai-me o silêncio para escutar a música das estrelas,",
    "Dai-me a força da fé para atravessar as tempestades,",
    "Dai-me luz para manter-me em um bom caminho,",
    "Dai-me amor para testemunhar a sua criação.",
  ],
  fecho: "Que assim seja para hoje sempre e eternamente",
  amens: ["Amém!", "Axé!", "Saravá!", "A-ho!"] as const,
};

const GRAD_TITULO_ORACAO: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#ffffff 0%,#c4b5fd 45%,#e879f9 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
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
          className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6"
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
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

          {/* Orações · Limpezas · Defesas · Magias — nav */}
          <div className="flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-2.5">
            {["Orações", "Limpezas", "Defesas", "Magias"].map((label) => (
              <button
                key={label}
                type="button"
                className="group relative flex shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 sm:px-5 sm:text-sm"
                style={BTN_PRIMARY}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px -8px rgba(139,92,246,0.75)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
              >
                {label}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </button>
            ))}
          </div>
        </motion.nav>

        {/* ── HERO GRID ───────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 pb-20 pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16">

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

          {/* Oração — electric card + Exo 2 (mesma vibe do lead da hero) */}
          <motion.aside
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={bgReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex justify-center lg:sticky lg:top-24 lg:col-span-5 lg:justify-end"
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-neutral-900 p-[2px]"
              style={{ boxShadow: ORACAO_CARD_SHADOW }}
            >
              <div className="absolute inset-0 z-0 rounded-[32px] bg-linear-to-b from-indigo-300 via-violet-500 to-transparent opacity-80" />
              <div
                className="relative z-10 overflow-hidden rounded-[30px] px-8 pb-10 pt-9 antialiased sm:px-10 sm:pb-12 sm:pt-10"
                style={{ backgroundColor: "#090b18", ...ORACAO_TIPO }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-violet-500/12 to-transparent" />

                <div className="relative space-y-7">
                  <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-900/55 px-5 py-2 backdrop-blur-md sm:gap-3.5 sm:px-6">
                    <img
                      src="/logos/logo.svg"
                      alt=""
                      aria-hidden
                      className="h-4 w-4 shrink-0 opacity-95 sm:h-[18px] sm:w-[18px]"
                    />
                    <span className="text-center text-xs font-bold uppercase leading-tight tracking-[0.08em] text-slate-200 sm:text-sm sm:tracking-[0.12em]">
                      Oração do Universo de Luz
                    </span>
                    <img
                      src="/logos/logo.svg"
                      alt=""
                      aria-hidden
                      className="h-4 w-4 shrink-0 opacity-95 sm:h-[18px] sm:w-[18px]"
                    />
                  </div>

                  <h2
                    className="text-[1.85rem] font-semibold leading-snug tracking-wide sm:text-4xl md:text-[2.35rem]"
                    style={GRAD_TITULO_ORACAO}
                  >
                    {ORACAO.titulo}
                  </h2>

                  <div className="space-y-4 border-l border-violet-500/25 pl-5 sm:pl-6">
                    {ORACAO.estrofes.map((linha) => (
                      <p
                        key={linha}
                        className="text-lg font-medium leading-relaxed tracking-wide text-white sm:text-xl"
                      >
                        {linha}
                      </p>
                    ))}
                  </div>

                  <p className="text-center text-lg font-medium italic leading-relaxed tracking-wide text-white/90 sm:text-xl">
                    {ORACAO.fecho}
                  </p>

                  <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2">
                    {ORACAO.amens.map((a) => (
                      <span
                        key={a}
                        className="text-sm font-semibold tracking-wide text-transparent sm:text-base"
                        style={{
                          backgroundImage: "linear-gradient(90deg,#e9d5ff,#a78bfa,#f0abfc)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="relative flex h-px w-full items-center justify-center bg-linear-to-r from-transparent via-violet-500/45 to-transparent">
                    <span
                      className="px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400"
                      style={{ backgroundColor: "#090b18" }}
                    >
                      Universo de Luz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

    </>
  );
}
