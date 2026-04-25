import { useEffect, useState } from "react";
import "./heroBackground.css";

/*
  Hero Background — Universo de Luz
  ────────────────────────────────
  Estratégia anti-tela-preta em 3 camadas:

  Camada -1: .hero-bg__placeholder — gradiente CSS puro que imita a galáxia.
             Visível IMEDIATAMENTE, sem nenhum JS, zero latência.

  Camada 0: .hero-bg__unicorn — WebGL do UnicornStudio.
             Começa com opacity:0, sobe para 1 quando pronto.
             O placeholder some ao mesmo tempo (cross-fade perfeito).

  Camada 2: Estrelas + glows — sempre visíveis, independentes do WebGL.
*/

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
  }
}

interface Props {
  onReady?: () => void;
}

export default function HeroBackground({ onReady }: Props = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fallback: força "ready" após 4s se o script não responder
    const fallback = setTimeout(() => setReady(true), 4000);

    if (window.UnicornStudio?.isInitialized) {
      setReady(true);
      clearTimeout(fallback);
      return;
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} };
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js";
    // async: não bloqueia o render principal da página
    s.async = true;
    s.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
      // Duplo rAF: garante que o WebGL pintou pelo menos 1 frame real
      // antes de fazer o cross-fade do placeholder → WebGL
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

  // Chama o callback quando estiver pronto
  useEffect(() => {
    if (ready) {
      onReady?.();
    }
  }, [ready, onReady]);

  return (
    <div className="hero-bg">
      {/* ── Camada -1: Placeholder estático (CSS puro, zero latência) ──
          Imita a galáxia congelada enquanto o WebGL não está pronto.
          Quando ready=true, faz cross-fade com o WebGL real. */}
      <div
        className={`hero-bg__placeholder ${ready ? "hero-bg__placeholder--hidden" : ""}`}
        aria-hidden="true"
      />

      {/* ── Camada 0: UnicornStudio WebGL (Galáxia animada) ── */}
      <div
        className={`hero-bg__unicorn ${ready ? "hero-bg__unicorn--ready" : ""}`}
      >
        <div
          className="hero-bg__unicorn-canvas"
          data-us-project="AhqzKk9mZE0EnlENMQDi"
        />
      </div>

      {/* ── Camada 2: Stars + Glows — sempre visíveis ── */}
      <div className="hero-bg__stars-layer" aria-hidden="true">
        <div className="hero-bg__stars" />
        <div className="hero-bg__glow-top" />
        <div className="hero-bg__glow-bottom" />
      </div>
    </div>
  );
}
