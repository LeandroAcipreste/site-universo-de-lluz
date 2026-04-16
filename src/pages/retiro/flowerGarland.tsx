import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef, useState, useEffect } from "react";

import flowerImage from "./imagens/margarida-com-galho.png";

import foto1 from "./imagens/imagens-redondas/mãe-foto-redonda.png";
import foto2 from "./imagens/imagens-redondas/Group 13.png";
import foto3 from "./imagens/imagens-redondas/cantor-foto- redonda.png";
import foto4 from "./imagens/imagens-redondas/Group 10.png";
import foto5 from "./imagens/imagens-redondas/Group 9.png";
import foto6 from "./imagens/imagens-redondas/Group 8.png";
import foto7 from "./imagens/imagens-redondas/Group 7.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── Path SVG Desktop ────────────────────────────────────────────────────────
const DESKTOP_SVG_PATH = `M0.00610352 0.499939L1103.39 13.9738C1151.05 49.8544 1172.59 76.4801 1181.01 161.687C1170.52 284.15 1144.73 327.22 1084.11 385.254H102.481C35.8684 434.84 18.0522 477.535 19.2836 578.878C23.9459 665.133 35.7442 709.659 135.963 756.034L1072.95 756.034C1141.22 774.182 1164.28 808.933 1181.01 898.258C1170.08 961.313 1148.28 990.242 1084.11 1031.5L32.9808 1031.5`;
const DESKTOP_VIEWBOX_W = 1200;
const DESKTOP_VIEWBOX_H = 1050;
const DESKTOP_FLOWER_COUNT = 75;

// ─── Path SVG Mobile ─────────────────────────────────────────────────────────
// Curva S ajustada para afastar das bordas e evitar cortes em flores/fotos.
const MOBILE_SVG_PATH =
  "M461.0 0.457" +
  "C131.3 197.6 60.0 240.8 79.5 348.4" +
  "C99.0 456.1 434.4 467.4 434.4 605.4" +
  "C434.4 743.4 231.5 780.3 79.5 819.4";
const MOBILE_VIEWBOX_W = 521;
const MOBILE_VIEWBOX_H = 820;
const MOBILE_FLOWER_COUNT = 80;

// ─── Estilos locais da guirlanda ────────────────────────────────────────────
// Declarados fora das funções para evitar recriação a cada render (padrão React)
const garlandStyles = {
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

// ─── Tipagem ─────────────────────────────────────────────────────────────────
interface Point {
  x: number;
  y: number;
  angle: number;
  index: number;
}

// ─── Posições das fotos circulares ───────────────────────────────────────────
const posicoesDasFotosDesktop = [
  { florNumero: 20, imagem: foto1 },
  { florNumero: 24, imagem: foto2 },
  { florNumero: 29, imagem: foto3 },
  { florNumero: 34, imagem: foto4 },
  { florNumero: 42, imagem: foto5 },
  { florNumero: 47, imagem: foto6 },
  { florNumero: 52, imagem: foto7 },
];

const posicoesDasFotosMobile = [
  { florNumero: 20, imagem: foto1 },
  { florNumero: 30, imagem: foto2 },
  { florNumero: 39, imagem: foto3 },
  { florNumero: 47, imagem: foto4 },
  { florNumero: 55, imagem: foto5 },
  { florNumero: 62, imagem: foto6 },
  { florNumero: 70, imagem: foto7 },
];

// ─── Funções utilitárias ──────────────────────────────────────────────────────
function calcularPontos(path: SVGPathElement, count: number): Point[] {
  const pathLength = path.getTotalLength();
  return Array.from({ length: count }, (_, i) => {
    const distance = (i / (count - 1)) * pathLength;
    const point = path.getPointAtLength(distance);
    const nextPoint = path.getPointAtLength(Math.min(distance + 1, pathLength));
    const angle =
      Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
      (180 / Math.PI);
    return { x: point.x, y: point.y, angle, index: i };
  });
}

// ─── Componente raiz (seleciona Desktop ou Mobile) ───────────────────────────
export default function FlowerGarland() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 600);
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return isMobile ? <FlowerGarlandMobile /> : <FlowerGarlandDesktop />;
}

// ─── Desktop ─────────────────────────────────────────────────────────────────
function FlowerGarlandDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!pathRef.current) return;
    setPoints(calcularPontos(pathRef.current, DESKTOP_FLOWER_COUNT));
  }, []);

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll(".garland-item");
    if (!items || items.length === 0) return;

    gsap.to(items, {
      opacity: 1,
      scale: 1,
      stagger: 0.01,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
      },
    });
  }, { scope: containerRef, dependencies: [points] });

  return (
    <section
      id="flower-garland-desktop"
      ref={containerRef}
      className="relative w-full h-full overflow-visible pointer-events-none min-h-[1000px]"
    >
      {/* SVG invisível — usado apenas para calcular pontos do path */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${DESKTOP_VIEWBOX_W} ${DESKTOP_VIEWBOX_H}`}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path ref={pathRef} d={DESKTOP_SVG_PATH} fill="none" />
      </svg>

      {points.map((pt) => {
        const percentX = (pt.x / DESKTOP_VIEWBOX_W) * 100;
        const percentY = (pt.y / DESKTOP_VIEWBOX_H) * 100;
        const fotoConfig = posicoesDasFotosDesktop.find(
          (f) => f.florNumero === pt.index
        );
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
            <img
              src={flowerImage}
              alt="Margarida"
              className="absolute top-1/2 left-1/2 max-w-none w-[50px] md:w-[250px] object-contain pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${pt.angle}deg)` }}
            />
            {photoSrc && (
              <img
                src={photoSrc}
                alt="Foto circular do retiro"
                className="absolute top-1/2 left-1/2 max-w-none w-[100px] md:w-[150px] pointer-events-auto"
                style={{ transform: "translate(-50%, -50%)" }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

// ─── Mobile ──────────────────────────────────────────────────────────────────
function FlowerGarlandMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!pathRef.current) return;
    setPoints(calcularPontos(pathRef.current, MOBILE_FLOWER_COUNT));
  }, []);

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll(".garland-item-mobile");
    if (!items || items.length === 0) return;

    gsap.to(items, {
      opacity: 1,
      scale: 1,
      stagger: 0.012,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 100%",
        end: "bottom 10%",
        scrub: 1.5,
      },
    });
  }, { scope: containerRef, dependencies: [points] });

  return (
    <section
      id="flower-garland-mobile"
      ref={containerRef}
      className="relative w-full overflow-visible pointer-events-none"
      style={{ minHeight: "165vw" }}
    >
      {/* SVG invisível — usado apenas para calcular pontos do path */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <path ref={pathRef} d={MOBILE_SVG_PATH} fill="none" />
      </svg>

      {/* Bloco de texto — primeira curva direita da guirlanda */}
      <div
        id="mobile-text-block"
        className="text-brand-blue"
        style={{ ...garlandStyles.textOverlay, top: "26%" }}
      >
        <p style={garlandStyles.contentTextSpaced}>
          O beija-flor nos ensina que a cura pode vir através da alegria, da
          leveza e da celebração.
        </p>
        <p style={garlandStyles.contentText}>
          Este retiro é um portal para dissolver fardos e despertar para uma
          vida mais fluida.
        </p>
      </div>

      {points.map((pt) => {
        const percentX = (pt.x / MOBILE_VIEWBOX_W) * 100;
        const percentY = (pt.y / MOBILE_VIEWBOX_H) * 100;
        const fotoConfig = posicoesDasFotosMobile.find(
          (f) => f.florNumero === pt.index
        );
        const photoSrc = fotoConfig?.imagem ?? null;

        const isRightSide = percentX > 80;
        const isLeftSide = percentX < 15;
        const offsetX = isRightSide ? -80 : isLeftSide ? -20 : -50;
        const offsetY = isRightSide || isLeftSide ? -45 : -50;

        return (
          <div
            key={pt.index}
            className="garland-item-mobile absolute"
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
            <img
              src={flowerImage}
              alt="Margarida"
              className="absolute top-1/2 left-1/2 max-w-none object-contain pointer-events-none"
              style={{
                width: "clamp(55px, 18vw, 100px)",
                transform: `translate(-50%, -50%) rotate(${pt.angle}deg)`,
              }}
            />
            {photoSrc && (
              <img
                src={photoSrc}
                alt="Foto circular do retiro"
                className="absolute top-1/2 left-1/2 max-w-none pointer-events-auto"
                style={{
                  width: "clamp(50px, 14vw, 80px)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}