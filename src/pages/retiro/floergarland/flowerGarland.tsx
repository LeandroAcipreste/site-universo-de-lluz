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
import "./flowerGarland.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const DESKTOP_SVG_PATH = `M1197.7 0.58C171.39 253.05 -50.35 308.36 10.37 446.19C71.11 584.02 1114.79 598.57 1114.79 775.27C1114.79 951.98 483.28 999.17 10.37 1049.3`;
const DESKTOP_VIEWBOX_W = 1200;
const DESKTOP_VIEWBOX_H = 1050;
const DESKTOP_FLOWER_COUNT = 75;

interface Point {
  x: number;
  y: number;
  angle: number;
  index: number;
}

const posicoesDasFotosDesktop = [
  { florNumero: 20, imagem: foto1 }, { florNumero: 24, imagem: foto2 },
  { florNumero: 29, imagem: foto3 }, { florNumero: 34, imagem: foto4 },
  { florNumero: 40, imagem: foto5 }, { florNumero: 44, imagem: foto6 },
  { florNumero: 48, imagem: foto7 },
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

// Funções puras de posicionamento dinâmico
const getDynamicItemStyle = (percentX: number, percentY: number, offsetX: number, offsetY: number, zIndexConfig: number): React.CSSProperties => ({
  left: `${percentX}%`,
  top: `${percentY}%`,
  opacity: 0,
  transform: `translate(${offsetX}%, ${offsetY}%) scale(0)`,
  zIndex: zIndexConfig,
});

const getFlowerImageStyle = (angle: number): React.CSSProperties => ({
  transform: `translate(-50%, -50%) rotate(${angle}deg)`
});

const getPhotoStyle = (): React.CSSProperties => ({
  transform: `translate(-50%, -50%)`
});

export default function FlowerGarland() {
  // Inicialização síncrona evita o flash desktop→mobile e o delay no mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 768);
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
    gsap.set(["#desktop-text-block-1", "#desktop-text-block-2"], { opacity: 0, y: 40 });

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

    gsap.to("#desktop-text-block-1", {
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

    gsap.to("#desktop-text-block-2", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center 60%",
        end: "center 30%",
        scrub: 1,
      },
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, { scope: containerRef, dependencies: [points] });

  return (
    <section id="flower-garland-desktop" ref={containerRef} className="garland-section-desktop">
      <svg aria-hidden="true" viewBox={`0 0 ${DESKTOP_VIEWBOX_W} ${DESKTOP_VIEWBOX_H}`} className="garland-svg" preserveAspectRatio="none">
        <path ref={pathRef} d={DESKTOP_SVG_PATH} fill="none" />
      </svg>

      <div id="desktop-text-block-1" className="desktop-text-block-1">
        <p className="garland-text-spaced-desktop">
          O beija-flor nos ensina que a cura pode vir através da alegria, da leveza e da celebração.
        </p>
        <p className="garland-text-desktop">
          Este retiro é um portal para dissolver fardos e despertar para uma vida mais fluida.
        </p>
      </div>

      <div id="desktop-text-block-2" className="desktop-text-block-2">
        <p className="garland-paragraph-desktop">
          Deixe para trás o que é denso. Assim como o beija-flor, escolha a doçura de voar sem pesos. É hora de transmutar esforço em fluidez e cansaço em celebração.
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
        const finalZIndex = photoSrc ? 50 : pt.index;

        return (
          <div
            key={pt.index}
            className="garland-item"
            style={getDynamicItemStyle(percentX, percentY, offsetX, offsetY, finalZIndex)}
          >
            <img
              src={flowerImage}
              alt="Margarida"
              className="garland-flower-img garland-flower-img-desktop"
              style={getFlowerImageStyle(pt.angle)}
            />
            {photoSrc && (
              <img
                src={photoSrc}
                alt="Foto circular do retiro"
                className="garland-photo-img garland-photo-img-desktop"
                style={getPhotoStyle()}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}