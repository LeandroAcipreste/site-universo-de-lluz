import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BTN_PRIMARY } from "../../constants/btnPrimary";
import HeroBackground from "./heroBackground";

/*
  Hero Section — Universo de Luz
  ──────────────────────────────
  Camadas de fundo movidas para HeroBackground para carregamento assíncrono.
*/

// ── Constantes de estilo ──────────────────────────────────────────────────────
const ORACAO_CARD_SHADOW =
  "0 0 30px rgba(139,92,246,0.35), inset 0 0 24px rgba(139,92,246,0.12)";

const ORACAO_TIPO = {
  fontFamily: "'Exo 2', system-ui, sans-serif",
} as const;

const ORACAO = {
  titulo: "Divino Criador,",
  estrofes: [
    "Dai-me o vislumbre da Tua presença,",
    "Dai-me o silêncio para escutar a música das estrelas,",
    "Dai-me a força da fé para atravessar as tempestades,",
    "Dai-me a sabedoria de aceitar a tudo e a todos como são,",
    "Dai-me luz para manter-me em um bom caminho,",
    "Dai-me amor para testemunhar a Tua criação.",
  ],
  fecho: "Que assim seja hoje, sempre e eternamente",
  amens: ["Amém!", "Axé!", "Saravá!", "A-ho!"] as const,
};

const GRAD_TITULO_ORACAO: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#ffffff 0%,#c4b5fd 45%,#e879f9 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function Hero() {
  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden text-white selection:bg-cyan-500/30"
        style={{ backgroundColor: "#050505" }}
      >
        <HeroBackground />

        {/* ── Conteúdo (Anima independente do fundo) ── */}
        <div className="relative z-10 pt-20 sm:pt-[4.75rem]">
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 pb-20 pt-12 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:pt-16">

            <div className="flex min-h-0 flex-col items-start lg:col-span-7 lg:h-full">
              <motion.div
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-sm"
              >
                <img src="/logos/logo.svg" aria-hidden="true" style={{ height: "14px", width: "14px", flexShrink: 0 }} />
                Consciência · Expansão · Cura
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-6 font-light leading-[1.05] tracking-tight text-white"
                style={{ 
                  fontFamily: "'Optima','Zapf Humanist','Tenor Sans',sans-serif",
                  fontSize: 'clamp(2.5rem, 8vw + 0.5rem, 4.75rem)'
                }}
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
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-10 max-w-xl text-base md:text-lg leading-relaxed text-white/80"
              >
                Vivências transformadoras que expandem a consciência, reconectam com o sagrado e promovem cura profunda do ser.
              </motion.p>

              <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />

              <motion.div
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-12 md:mb-20 flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start lg:mb-0"
              >
                <button
                  className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-base md:text-lg font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                  style={BTN_PRIMARY}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px -5px rgba(139,92,246,0.8)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
                >
                  Retiro Cura do Beija-Flor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-base md:text-lg font-medium text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                  style={BTN_PRIMARY}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px -5px rgba(139,92,246,0.8)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = BTN_PRIMARY.boxShadow as string; }}
                >
                  Conheça o Universo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex justify-center lg:sticky lg:top-24 lg:col-span-5 lg:h-[calc(100vh-140px)] lg:flex-col lg:items-end lg:justify-center"
            >
              <div
                className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-neutral-900 p-[2px] transition-all duration-700"
                style={{ boxShadow: ORACAO_CARD_SHADOW }}
              >
                <div className="absolute inset-0 z-0 rounded-[32px] bg-linear-to-b from-indigo-300 via-violet-500 to-transparent opacity-80" />
                <div
                  className="relative z-10 overflow-hidden rounded-[30px] px-8 pb-10 pt-9 antialiased sm:px-10 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-10 lg:pt-9"
                  style={{ backgroundColor: "#090b18", ...ORACAO_TIPO }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-violet-500/12 to-transparent lg:h-32" />

                  <div className="relative space-y-7 lg:space-y-4">
                    <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-900/55 px-5 py-2 backdrop-blur-md sm:gap-3.5 sm:px-6 lg:gap-2.5 lg:px-4 lg:py-1.5">
                      <img src="/logos/logo.svg" alt="" aria-hidden className="h-4 w-4 shrink-0 opacity-95 sm:h-[18px] sm:w-[18px] lg:h-3.5 lg:w-3.5" />
                      <span className="text-center text-xs font-bold uppercase leading-tight tracking-[0.08em] text-slate-200 sm:text-sm sm:tracking-[0.12em] lg:text-[0.65rem] lg:tracking-[0.1em]">
                        Oração do Universo de Luz
                      </span>
                      <img src="/logos/logo.svg" alt="" aria-hidden className="h-4 w-4 shrink-0 opacity-95 sm:h-[18px] sm:w-[18px] lg:h-3.5 lg:w-3.5" />
                    </div>

                    <h2
                      className="text-[1.85rem] font-semibold leading-snug tracking-wide sm:text-4xl md:text-[2.35rem] lg:text-[1.65rem] lg:leading-tight"
                      style={GRAD_TITULO_ORACAO}
                    >
                      {ORACAO.titulo}
                    </h2>

                    <div className="space-y-4 border-l border-violet-500/25 pl-5 sm:pl-6 lg:space-y-2 lg:pl-4">
                      {ORACAO.estrofes.map((linha) => (
                        <p key={linha} className="text-lg font-medium leading-relaxed tracking-wide text-white sm:text-xl lg:text-[0.9375rem] lg:leading-snug">
                          {linha}
                        </p>
                      ))}
                    </div>

                    <p className="text-center text-lg font-medium italic leading-relaxed tracking-wide text-white/90 sm:text-xl lg:text-base lg:leading-snug">
                      {ORACAO.fecho}
                    </p>

                    <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2 lg:gap-x-5 lg:pt-0">
                      {ORACAO.amens.map((a) => (
                        <span key={a} className="text-sm font-semibold tracking-wide text-transparent sm:text-base lg:text-xs" style={{ backgroundImage: "linear-gradient(90deg,#e9d5ff,#a78bfa,#f0abfc)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="relative flex h-px w-full items-center justify-center bg-linear-to-r from-transparent via-violet-500/45 to-transparent">
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400" style={{ backgroundColor: "#090b18" }}>
                        Universo de Luz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
