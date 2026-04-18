import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

import flowerImage from "../imagens/margarida-com-galho.png";

import foto1 from "../imagens/imagens-redondas/mãe-foto-redonda.png";
import foto2 from "../imagens/imagens-redondas/Group 13.png";
import foto3 from "../imagens/imagens-redondas/cantor-foto- redonda.png";
import foto4 from "../imagens/imagens-redondas/Group 10.png";
import foto5 from "../imagens/imagens-redondas/Group 9.png";
import foto6 from "../imagens/imagens-redondas/Group 8.png";
import foto7 from "../imagens/imagens-redondas/Group 7.png";

import FlowerGarlandMobile from "./fowerGarlandMobile";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const DESKTOP_SVG_PATH = `M0.00610352 0.499939L1103.39 13.9738C1151.05 49.8544 1172.59 76.4801 1181.01 161.687C1170.52 284.15 1144.73 327.22 1084.11 385.254H102.481C35.8684 434.84 18.0522 477.535 19.2836 578.878C23.9459 665.133 35.7442 709.659 135.963 756.034L1072.95 756.034C1141.22 774.182 1164.28 808.933 1181.01 898.258C1170.08 961.313 1148.28 990.242 1084.11 1031.5L32.9808 1031.5`;
const DESKTOP_VIEWBOX_W = 1200;
const DESKTOP_VIEWBOX_H = 1050;
const DESKTOP_FLOWER_COUNT = 75;

export const garlandStyles = {
  textOverlay: {
    position: "absolute",
    right: "3%",
    width: "65%",
    zIndex: 10,
    pointerEvents: "auto",
  } as React.CSSProperties,
  contentText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(0.85rem, 4vw, 1.2rem)",
    fontWeight: 500,
    lineHeight: 1.4,
  } as React.CSSProperties,
  contentTextSpaced: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(0.85rem, 4vw, 1.2rem)",
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: "1rem",
  } as React.CSSProperties,
};

interface Point {
  x: number;
  y: number;
  angle: number;
  index: number;
}

const posicoesDasFotosDesktop = [
  { florNumero: 20, imagem: foto1 }, { florNumero: 24, imagem: foto2 },
  { florNumero: 29, imagem: foto3 }, { florNumero: 34, imagem: foto4 },
  { florNumero: 42, imagem: foto5 }, { florNumero: 47, imagem: foto6 },
  { florNumero: 52, imagem: foto7 },
];

export function calcularPontos(path: SVGPathElement, count: number): Point[] {
  try {
    const pathLength = path.getTotalLength();
    if (!pathLength || pathLength === 0) return [];

    return Array.from({ length: count }, (_, i) => {
      const distance = (i / (count - 1)) * pathLength;
      const point = path.getPointAtLength(distance);
      const nextPoint = path.getPointAtLength(Math.min(distance + 1, pathLength));
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      return { x: point.x, y: point.y, angle, index: i };
    });
  } catch (error) {
    return [];
  }
}

export default function FlowerGarland() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 600);
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return isMobile ? <FlowerGarlandMobile key="mobile" /> : <FlowerGarlandDesktop key="desktop" />;
}

function FlowerGarlandDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useLayoutEffect(() => {
    let rAF: number;
    const tentarCalcular = () => {
      if (!pathRef.current) return;
      const pts = calcularPontos(pathRef.current, DESKTOP_FLOWER_COUNT);

      if (pts.length === 0) {
        rAF = requestAnimationFrame(tentarCalcular);
        return;
      }
      setPoints(pts);
    };

    tentarCalcular();
    return () => cancelAnimationFrame(rAF);
  }, []);

  useGSAP(() => {
    if (points.length === 0) return;
    const items = gsap.utils.toArray<Element>(".garland-item", containerRef.current);
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, scale: 0 });
    gsap.set("#desktop-jornada-text", { opacity: 0, y: 40 });

    gsap.to(items, {
      opacity: 1,
      scale: 1,
      stagger: 0.05,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    // Texto da jornada — aparece junto com as primeiras flores
    gsap.to("#desktop-jornada-text", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "top 20%",
        scrub: 1,
      },
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, { scope: containerRef, dependencies: [points] });

  return (
    <section id="flower-garland-desktop" ref={containerRef} className="relative w-full h-full overflow-visible pointer-events-none min-h-[1000px]">
      <svg aria-hidden="true" viewBox={`0 0 ${DESKTOP_VIEWBOX_W} ${DESKTOP_VIEWBOX_H}`} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <path ref={pathRef} d={DESKTOP_SVG_PATH} fill="none" />
      </svg>

      {/* Bloco de texto da Jornada - Desktop */}
      <div id="desktop-jornada-text" className="absolute pointer-events-auto z-40" style={{ left: "8%", top: "8%", width: "35%", minWidth: "360px" }}>
        <h3 className="text-brand-green uppercase tracking-[0.10em] leading-[1.1] mb-5 text-[1.4rem] lg:text-[1.8rem] pr-10">
          O que você vai viver nessa jornada
        </h3>
        <div className="flex flex-col text-brand-blue space-y-2 lg:space-y-3" style={{...garlandStyles.contentText, fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)"}}>
          <span>02 Comunhões com Ayahuasca</span>
          <span className="text-[0.85rem] lg:text-[1rem] italic font-normal text-brand-blue/80 !mt-0 !mb-3 leading-tight">
            *mediante aprovação em consulta prévia<br className="hidden lg:block"/> com Olyvia
          </span>
          <span>Respiração Somática Integrada (BREATHWORK)</span>
          <span>Limpezas energéticas</span>
          <span>Cerimônia do Cacau</span>
          <span>Meditação Ativa</span>
          <span>Reiki coletivo</span>
          <span>Rodas de Rapé</span>
        </div>
        <p className="text-brand-blue font-bold mt-6 text-[1.2rem] lg:text-[1.6rem] uppercase tracking-wider block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          E muito mais!
        </p>
      </div>

      {points.map((pt) => {
        const percentX = (pt.x / DESKTOP_VIEWBOX_W) * 100;
        const percentY = (pt.y / DESKTOP_VIEWBOX_H) * 100;
        const fotoConfig = posicoesDasFotosDesktop.find((f) => f.florNumero === pt.index);
        const photoSrc = fotoConfig?.imagem ?? null;

        const isRightSide = percentX > 85;
        const isLeftSide = percentX < 15;
        const offsetX = isRightSide ? -65 : isLeftSide ? -35 : -50;
        const offsetY = isRightSide || isLeftSide ? -45 : -50;

        return (
          <div
            key={pt.index}
            className="garland-item absolute"
            style={{
              left: `${percentX}%`,
              top: `${percentY}%`,
              opacity: 0,
              transform: `translate(${offsetX}%, ${offsetY}%) scale(0)`,
              zIndex: photoSrc ? 1000 : pt.index,
              width: "1px",
              height: "1px",
            }}
          >
            <img src={flowerImage} alt="Margarida" className="absolute top-1/2 left-1/2 max-w-none w-[50px] md:w-[250px] object-contain pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${pt.angle}deg)` }} />
            {photoSrc && (
              <img src={photoSrc} alt="Foto circular do retiro" className="absolute top-1/2 left-1/2 max-w-none w-[100px] md:w-[150px] pointer-events-auto" style={{ transform: "translate(-50%, -50%)" }} />
            )}
          </div>
        );
      })}
    </section>
  );
}