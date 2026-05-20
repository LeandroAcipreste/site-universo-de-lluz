import { useEffect, useState } from "react";

/**
 * OracleBackground — Universo de Luz
 * ─────────────────────────────────────────
 * Estratégia definitiva:
 *  - UnicornStudio (sajpUiTp7MIKdX6daDCu) fornece a GEOMETRIA PRECISA das cortinas
 *  - Camada de cor com mix-blend-mode:"color" aplica EXATAMENTE a paleta de Prata e Platina
 *    do logotipo (logo.svg) sem distorcer a estrutura do efeito
 *
 * Cores alvos extraídas de logo.svg:
 *   platinaBrilhante = rgb(240, 240, 245) — Platina vibrante (#DDE0E3)
 *   prataMedia = rgb(170, 175, 180)  — Prata escovada (#9BA1A6)
 *   cromoEscuro = rgb(74, 80, 85) — Cromo escuro (#4A5055)
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
        Cores = exatamente a paleta de prata e platina do logotipo
      ──*/}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            /* Centro platina brilhante → extremos cromo escuro → bordas preto */
            "radial-gradient(ellipse 60% 100% at 50% 50%,",
            "  rgb(240,240,245) 0%,",    /* platina brilhante */
            "  rgb(170,175,180) 35%,",   /* prata intermediária */
            "  rgb(74,80,85)    65%,",   /* cromo escuro (#4A5055) */
            "  rgb(5,5,8)       100%)",  /* preto absoluto */
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
