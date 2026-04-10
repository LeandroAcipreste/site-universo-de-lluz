import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  onComplete?: () => void;
}

/*
  Geometria do SVG (viewBox 0 0 500 640):
  ─ Círculo: cx=250 cy=250 r=185, strokeWidth=7
    · Borda interna do traço: r - 3.5 = 181.5 → y_top = 250 - 181.5 = 68.5
  ─ Braço (arm-shape): o arco superior toca a borda interna do anel.
    · Ponto mais alto do arco ≈ (250, 65.09) → distância do centro ≈ 184.91
    · Para gap de 5px: distância alvo = 181.5 - 5 = 176.5
    · Fator de escala = 176.5 / 184.91 ≈ 0.955
  ─ Texto (name.svg 800×200 → encaixado em 500×125 a partir de y=447):
    · Escala horizontal: 500/800 = 0.625
    · Baseline inner y=125 → outer y = 447 + 125×0.625 = 447 + 78.125 ≈ 525 = 435 + 90 ✓
*/

export default function Introduction({ onComplete }: Props) {
  const rootRef        = useRef<HTMLElement>(null);
  const armRef         = useRef<SVGPathElement>(null);   // <path id="arm-shape"> em <defs>
  const shadowGroupRef = useRef<SVGGElement>(null);      // <g> com os <use> das sombras
  const ringRef        = useRef<SVGCircleElement>(null); // <circle id="outer-ring">
  const textRef        = useRef<SVGGElement>(null);      // grupo container do texto
  const textNameRef    = useRef<SVGTextElement>(null);   // <text> — animação de construção

  useGSAP(
    () => {
      const arm  = armRef.current;
      const ring = ringRef.current;
      if (!arm || !ring) return;

      const armLen  = arm.getTotalLength();
      const ringLen = 2 * Math.PI * 185; // ≈ 1162.4

      // ── Estado inicial ─────────────────────────────────────────────
      gsap.set(arm, {
        fillOpacity: 0,
        stroke: "#9BA1A6",
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeDasharray: armLen,
        strokeDashoffset: armLen,
      });
      gsap.set(ring, {
        strokeDasharray: ringLen,
        strokeDashoffset: ringLen,
      });
      gsap.set(shadowGroupRef.current, { opacity: 0 });

      // Texto: fill invisível + traço prontos para construção (igual ao triângulo)
      // strokeDasharray=3000 cobre com folga o perímetro total de todos os glifos
      gsap.set(textRef.current, { y: 10 });
      gsap.set(textNameRef.current, {
        fillOpacity: 0,
        stroke: "#9BA1A6",
        strokeWidth: 1.5,    // em unidades do viewBox 800-wide
        strokeOpacity: 0,
        strokeDasharray: 3000,
        strokeDashoffset: 3000,
      });

      // ── Timeline GSAP ───────────────────────────────────────────────
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete() {
          gsap.delayedCall(0.8, () => { onComplete?.(); });
        },
      });

      // Fase 1 (0 → 2.0 s): anel e braços se desenham mais devagar
      tl.to(ring, { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut" }, 0)
        .to(arm,  { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut" }, 0);

      // Fase 2 (1.7 → 3.3 s): preenchimento metálico + sombras 3D
      tl.to(arm, { fillOpacity: 1,   duration: 1.0, ease: "power2.out" }, 1.7)
        .to(arm, { strokeOpacity: 0, duration: 0.5               }, 1.7)
        .to(shadowGroupRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 2.1);

      // Fase 3 — Texto (3.1 → 5.3 s): mesmo efeito de construção do triângulo
      // 3.1 s: traço aparece e começa a desenhar os contornos das letras
      tl.to(textNameRef.current, { strokeOpacity: 1, duration: 0.2 }, 3.1)
        .to(textNameRef.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 3.1)
        // leve subida simultânea ao desenho
        .to(textRef.current, { y: 0, duration: 1.8, ease: "power3.out" }, 3.1)
        // 4.6 s: preenchimento metálico surge e traço dissolve
        .to(textNameRef.current, { fillOpacity: 1,   duration: 0.8, ease: "power2.out" }, 4.6)
        .to(textNameRef.current, { strokeOpacity: 0, duration: 0.5               }, 4.6);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: [
          "linear-gradient(180deg,rgba(5,7,16,.44) 0%,rgba(6,8,18,.72) 54%,rgba(4,6,14,.88) 100%)",
          "url('/logos/photo-1528722828814-77b9b83aafb2-e1574333496357.jpg')",
        ].join(","),
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Halo luminoso sutil ao centro */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_45%,rgba(255,255,255,0.07),transparent)]" />

      {/*
        viewBox estendido de 500×500 → 500×640 para o texto abaixo.
        Geometria (d="...") intocada. Apenas o <g> dos braços recebe
        transform scale(0.955) para criar gap de 5 px com o anel.
      */}
      <svg
        viewBox="0 0 500 640"
        className="relative w-[210px] sm:w-[270px] md:w-[330px]"
        aria-labelledby="ul-logo-title"
        role="img"
      >
        <title id="ul-logo-title">Universo de Luz</title>

        <defs>
          {/* Gradiente metálico da fita / braço */}
          <linearGradient
            id="arm-grad"
            x1="250" y1="37" x2="410.2" y2="314.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#F8F9FA" />
            <stop offset="20%"  stopColor="#DDE0E3" />
            <stop offset="60%"  stopColor="#9BA1A6" />
            <stop offset="100%" stopColor="#5B6166" />
          </linearGradient>

          {/* Gradiente metálico do anel externo */}
          <linearGradient
            id="ring-grad"
            x1="100" y1="100" x2="400" y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#9BA1A6" />
            <stop offset="25%"  stopColor="#F8F9FA" />
            <stop offset="65%"  stopColor="#888E93" />
            <stop offset="100%" stopColor="#4A5055" />
          </linearGradient>

          {/*
            Forma do braço — d= intocado, milimetricamente perfeito.
            Animar este elemento propaga para todos os <use> clones.
          */}
          <path
            ref={armRef}
            id="arm-shape"
            d="M 250 121.0 L 361.7 314.5 L 410.2 314.5 L 274.2 79.0 A 28 28 0 0 0 225.8 79.0 Z"
            fill="url(#arm-grad)"
          />

          {/* Sombra de profundidade — d= intocado */}
          <path
            id="arm-shadow"
            d="M 225.8 79.0 L 250 121.0 L 244.0 131.4 L 219.8 89.4 Z"
            fill="#000000"
            fillOpacity={0.18}
            style={{ filter: "blur(1px)" }}
          />
        </defs>

        {/*
          Os 3 braços do Triângulo de Penrose.
          scale(0.955) centrado em (250,250) → gap de 5 px com o anel.
          Equivale a: mover o ponto mais alto de dist. 184.9 → 176.5 do centro.
        */}
        <g transform="translate(250,250) scale(0.955) translate(-250,-250)">
          <use href="#arm-shape" />
          <use href="#arm-shape" transform="rotate(120 250 250)" />
          <use href="#arm-shape" transform="rotate(240 250 250)" />
        </g>

        {/* Sombras de profundidade 3D — mesma escala, reveladas na Fase 2 */}
        <g
          ref={shadowGroupRef}
          transform="translate(250,250) scale(0.955) translate(-250,-250)"
        >
          <use href="#arm-shadow" />
          <use href="#arm-shadow" transform="rotate(120 250 250)" />
          <use href="#arm-shadow" transform="rotate(240 250 250)" />
        </g>

        {/* Anel circular externo */}
        <circle
          ref={ringRef}
          id="outer-ring"
          cx="250"
          cy="250"
          r="185"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="7"
        />

        {/*
          Nome "Universo de Luz" — Fase 3.
          name.svg (viewBox 800×200) encaixado em 500×125 a partir de y=447.
          · Escala: 500/800 = 0.625
          · Baseline inner y=125 → outer y = 447 + 125×0.625 = 525 = 435 + 90 ✓
          O gradiente é redefinido dentro do <svg> aninhado (escopo isolado).
        */}
        <g ref={textRef}>
          <svg
            x="0"
            y="447"
            width="500"
            height="125"
            viewBox="0 0 800 200"
            overflow="visible"
          >
            <defs>
              <linearGradient id="nm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#5C6369" />
                <stop offset="25%"  stopColor="#737B82" />
                <stop offset="50%"  stopColor="#464C51" />
                <stop offset="75%"  stopColor="#737B82" />
                <stop offset="100%" stopColor="#5C6369" />
              </linearGradient>
            </defs>
            <text
              ref={textNameRef}
              x="400"
              y="125"
              textAnchor="middle"
              fill="url(#nm-grad)"
              fontSize="82"
              fontWeight="400"
              letterSpacing="-6"
              style={{
                fontFamily: "'Optima', 'Zapf Humanist', 'Tenor Sans', sans-serif",
              }}
            >
              Universo de Luz
            </text>
          </svg>
        </g>
      </svg>
    </section>
  );
}
