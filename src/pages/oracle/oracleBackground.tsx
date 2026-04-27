import { useEffect, useState } from "react";

/**
 * OracleBackground — Universo de Luz
 * ─────────────────────────────────────────
 * Estratégia definitiva:
 *  - UnicornStudio (sajpUiTp7MIKdX6daDCu) fornece a GEOMETRIA PRECISA das cortinas
 *  - Camada de cor com mix-blend-mode:"color" aplica EXATAMENTE a paleta Lilás/Índigo
 *    do backgroundSpiral.tsx sem distorcer a estrutura do efeito
 *
 * Cores alvos extraídas de backgroundSpiral.tsx:
 *   coreColor = vec3(0.85, 0.60, 1.0) → rgb(217, 153, 255) — Lilás vibrante
 *   edgeColor = vec3(0.25, 0.05, 0.55) → rgb(64, 13, 140)  — Índigo profundo
 *   glowColor = vec3(0.90, 0.85, 1.0) → rgb(230, 217, 255) — Brilho central
 */
export default function OracleBackground({ onReady }: { onReady?: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fallback = setTimeout(() => {
      setReady(true);
      if (onReady) onReady();
    }, 3500);
    const scriptId = "unicorn-studio-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const init = () => {
      if ((window as any).UnicornStudio) {
        (window as any).UnicornStudio.init();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setReady(true);
            if (onReady) onReady();
            clearTimeout(fallback);
          })
        );
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js";
      script.onload = init;
      document.head.appendChild(script);
    } else {
      init();
    }

    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">

      {/* ── CAMADA 0: Unicorn Studio — fornece a geometria exata das cortinas ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      >
        <div
          className="absolute inset-0"
          data-us-project="sajpUiTp7MIKdX6daDCu"
          data-us-dpi="2"
          data-us-production="true"
        />
      </div>

      {/*
        ── CAMADA 1: Máscara de cor — substitui APENAS o hue/saturation.
        mix-blend-mode:"color" aplica a cor desta camada mas preserva a
        luminosidade da camada de baixo (= a geometria das cortinas).
        Resultado: mesmas cortinas precisas, noutra paleta de cor.
        Cores = exatamente o gradiente do backgroundSpiral.tsx
      ──*/}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            /* Centro lilás vibrante → extremos índigo → bordas preto */
            "radial-gradient(ellipse 60% 100% at 50% 50%,",
            "  rgb(217,153,255) 0%,",   /* coreColor do Spiral */
            "  rgb(130,40,200)  35%,",  /* transição suave     */
            "  rgb(64,13,140)   65%,",  /* edgeColor do Spiral */
            "  rgb(10,0,30)     100%)", /* borda preta profunda */
          ].join(""),
          mixBlendMode: "color" as React.CSSProperties["mixBlendMode"],
        }}
      />

      {/* ── CAMADA 2: Estrelas finas (consistência com BackgroundSpiral) ── */}
      <div
        className="absolute inset-0 z-20 opacity-20"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 20px 30px,#fff,transparent)",
            "radial-gradient(1px 1px at 80px 70px,#fff,transparent)",
            "radial-gradient(1.5px 1.5px at 140px 40px,#fff,transparent)",
            "radial-gradient(1px 1px at 220px 130px,#fff,transparent)",
          ].join(","),
          backgroundSize: "300px 300px",
        }}
      />

      {/* ── CAMADA 3: Vinheta radial nas bordas — foco no centro ── */}
      <div
        className="absolute inset-0 z-30"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
