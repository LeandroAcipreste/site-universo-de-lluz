import { useEffect, useState } from "react";

/*
  Hero Background — Universo de Luz
  ────────────────────────────────
  Camada de fundo extraída de hero.tsx para carregamento assíncrono.
  Contém:
    - UnicornStudio WebGL (Galáxia)
    - Padrão de Estrelas (Stars)
    - Glows de nebulosa (Indigo/Fuchsia)
*/

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
  }
}

export default function HeroBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fallback para garantir visibilidade se o script falhar
    const fallback = setTimeout(() => setReady(true), 4000);

    if (window.UnicornStudio?.isInitialized) {
      setReady(true);
      clearTimeout(fallback);
      return;
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} };
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js";
    s.async = true;
    s.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
      // Aguarda o frame de renderização
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ── Camada 0: UnicornStudio WebGL (Galáxia) ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          filter: "hue-rotate(220deg) saturate(1.4) brightness(1.05)",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <div
          className="absolute inset-0"
          data-us-project="AhqzKk9mZE0EnlENMQDi"
        />
      </div>

      {/* ── Camada 1: Stars + glows de nebulosa ── */}
      <div className="absolute inset-0 z-1">
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
        {/* Glows */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-fuchsia-900/20 blur-[100px]" />
      </div>
    </div>
  );
}
