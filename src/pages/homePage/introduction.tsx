import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  onComplete?: () => void;
}

/*
  iOS Safari não propaga animações GSAP de <path> em <defs> para <use> clones.
  Solução: 3 <path> diretos com refs individuais, sem <use href="#arm-shape">.
*/
const ARM_D    = "M 250 121.0 L 361.7 314.5 L 410.2 314.5 L 274.2 79.0 A 28 28 0 0 0 225.8 79.0 Z";
const SHADOW_D = "M 225.8 79.0 L 250 121.0 L 244.0 131.4 L 219.8 89.4 Z";

export default function Introduction({ onComplete }: Props) {
  const rootRef     = useRef<HTMLElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);
  const arm1Ref     = useRef<SVGPathElement>(null);
  const arm2Ref     = useRef<SVGPathElement>(null);
  const arm3Ref     = useRef<SVGPathElement>(null);
  const shadowGRef  = useRef<SVGGElement>(null);
  const ringRef     = useRef<SVGCircleElement>(null);
  const textRef     = useRef<SVGGElement>(null);
  const textNameRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      const ring = ringRef.current;
      const arm1 = arm1Ref.current;
      if (!ring || !arm1) return;

      const armLen  = arm1.getTotalLength();
      const ringLen = 2 * Math.PI * 185; // ≈ 1162.4
      const arms    = [arm1Ref.current, arm2Ref.current, arm3Ref.current];

      // Esconde o SVG enquanto configura os estados iniciais — evita flash no iOS
      gsap.set(svgRef.current, { visibility: "hidden" });

      gsap.set(arms, {
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
      gsap.set(shadowGRef.current, { opacity: 0 });
      gsap.set(textRef.current, { y: 10, autoAlpha: 0 });
      gsap.set(textNameRef.current, {
        fillOpacity: 0,
        stroke: "#9BA1A6",
        strokeWidth: 1.5,
        strokeOpacity: 0,
        strokeDasharray: 3000,
        strokeDashoffset: 3000,
      });

      // Tudo pronto — mostra o SVG
      gsap.set(svgRef.current, { visibility: "visible" });

      const tl = gsap.timeline({
        delay: 0.3,
        onComplete() {
          gsap.delayedCall(0.8, () => { onComplete?.(); });
        },
      });

      // Fase 1 (0 → 2.0 s): anel e braços desenham-se
      tl.to(ring, { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut" }, 0)
        .to(arms, { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut" }, 0);

      // Fase 2 (1.7 → 3.3 s): preenchimento metálico + sombras 3D
      tl.to(arms, { fillOpacity: 1,   duration: 1.0, ease: "power2.out" }, 1.7)
        .to(arms, { strokeOpacity: 0, duration: 0.5 }, 1.7)
        .to(shadowGRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 2.1);

      // Fase 3 (3.1 → 5.3 s): construção do texto
      // autoAlpha: 1 retira o visibility:hidden antes de qualquer frame do texto
      tl.to(textRef.current, { autoAlpha: 1, duration: 0.01 }, 3.1)
        .to(textNameRef.current, { strokeOpacity: 1, duration: 0.2 }, 3.1)
        .to(textNameRef.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 3.1)
        .to(textRef.current, { y: 0, duration: 1.8, ease: "power3.out" }, 3.1)
        .to(textNameRef.current, { fillOpacity: 1,   duration: 0.8, ease: "power2.out" }, 4.6)
        .to(textNameRef.current, { strokeOpacity: 0, duration: 0.5 }, 4.6);
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_45%,rgba(255,255,255,0.07),transparent)]" />

      <svg
        ref={svgRef}
        viewBox="0 0 500 640"
        className="relative w-[273px] sm:w-[270px] md:w-[330px]"
        aria-labelledby="ul-logo-title"
        role="img"
        style={{ visibility: "hidden" }}
      >
        <title id="ul-logo-title">Universo de Luz</title>

        <defs>
          <linearGradient id="arm-grad" x1="250" y1="37" x2="410.2" y2="314.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#F8F9FA" />
            <stop offset="20%"  stopColor="#DDE0E3" />
            <stop offset="60%"  stopColor="#9BA1A6" />
            <stop offset="100%" stopColor="#5B6166" />
          </linearGradient>
          <linearGradient id="ring-grad" x1="100" y1="100" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#9BA1A6" />
            <stop offset="25%"  stopColor="#F8F9FA" />
            <stop offset="65%"  stopColor="#888E93" />
            <stop offset="100%" stopColor="#4A5055" />
          </linearGradient>
          <linearGradient id="nm-grad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#5C6369" />
            <stop offset="25%"  stopColor="#737B82" />
            <stop offset="50%"  stopColor="#464C51" />
            <stop offset="75%"  stopColor="#737B82" />
            <stop offset="100%" stopColor="#5C6369" />
          </linearGradient>
        </defs>

        {/* 3 braços com refs diretos — sem <use>, compatível com iOS Safari */}
        <g transform="translate(250,250) scale(0.955) translate(-250,-250)">
          <path ref={arm1Ref} d={ARM_D} fill="url(#arm-grad)" />
          <path ref={arm2Ref} d={ARM_D} fill="url(#arm-grad)" transform="rotate(120 250 250)" />
          <path ref={arm3Ref} d={ARM_D} fill="url(#arm-grad)" transform="rotate(240 250 250)" />
        </g>

        {/* Sombras de profundidade 3D */}
        <g ref={shadowGRef} transform="translate(250,250) scale(0.955) translate(-250,-250)">
          <path d={SHADOW_D} fill="#000000" fillOpacity={0.18} style={{ filter: "blur(1px)" }} />
          <path d={SHADOW_D} fill="#000000" fillOpacity={0.18} style={{ filter: "blur(1px)" }} transform="rotate(120 250 250)" />
          <path d={SHADOW_D} fill="#000000" fillOpacity={0.18} style={{ filter: "blur(1px)" }} transform="rotate(240 250 250)" />
        </g>

        {/* Anel circular externo */}
        <circle
          ref={ringRef}
          cx="250" cy="250" r="185"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="7"
        />

        {/* Texto "Universo de Luz" — sem SVG aninhado para evitar flash no Safari/iPhone */}
        <g ref={textRef} opacity={0}>
          <text
            ref={textNameRef}
            x="250"
            y="525"
            textAnchor="middle"
            fill="url(#nm-grad)"
            fillOpacity={0}
            stroke="#9BA1A6"
            strokeWidth="0.94"
            strokeOpacity={0}
            strokeDasharray={3000}
            strokeDashoffset={3000}
            fontSize="51.25"
            fontWeight="400"
            letterSpacing="-3.75"
            style={{ fontFamily: "'Optima', 'Zapf Humanist', 'Tenor Sans', sans-serif" }}
          >
            Universo de Luz
          </text>
        </g>
      </svg>
    </section>
  );
}
