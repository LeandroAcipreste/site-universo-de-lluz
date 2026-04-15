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

const svgPathData = `M0.00610352 0.499939L1103.39 13.9738C1151.05 49.8544 1172.59 76.4801 1181.01 161.687C1170.52 284.15 1144.73 327.22 1084.11 385.254H102.481C35.8684 434.84 18.0522 477.535 19.2836 578.878C23.9459 665.133 35.7442 709.659 135.963 756.034L1072.95 756.034C1141.22 774.182 1164.28 808.933 1181.01 898.258C1170.08 961.313 1148.28 990.242 1084.11 1031.5L32.9808 1031.5`;

interface Point {
  x: number;
  y: number;
  angle: number;
  index: number;
}

export default function FlowerGarland() {

  const count = 75;
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  const posicoesDasFotos = [
    { florNumero: 20, imagem: foto1 },
    { florNumero: 24, imagem: foto2 },
    { florNumero: 29, imagem: foto3 },
    { florNumero: 34, imagem: foto4 },
    { florNumero: 42, imagem: foto5 },
    { florNumero: 47, imagem: foto6 },
    { florNumero: 52, imagem: foto7 },
  ];

  useEffect(() => {

    if (!pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    const newPoints: Point[] = [];

    for (let i = 0; i < count; i++) {

      const distance = (i / (count - 1)) * pathLength;

      const point = path.getPointAtLength(distance);
      const nextPoint = path.getPointAtLength(
        Math.min(distance + 1, pathLength)
      );

      const angle =
        Math.atan2(
          nextPoint.y - point.y,
          nextPoint.x - point.x
        ) * (180 / Math.PI);

      newPoints.push({
        x: point.x,
        y: point.y,
        angle,
        index: i
      });
    }

    setPoints(newPoints);

  }, [count]);

  useGSAP(() => {

    const items =
      containerRef.current?.querySelectorAll(".garland-item");

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
      }
    });

  }, { scope: containerRef, dependencies: [points] });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-visible pointer-events-none min-h-[1000px]"
    >

      <svg
        viewBox="0 0 1200 1050"
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path ref={pathRef} d={svgPathData} fill="none" />
      </svg>

      {points.map((pt) => {

        const percentX = (pt.x / 1200) * 100;
        const percentY = (pt.y / 1050) * 100;

        const fotoConfigurada =
          posicoesDasFotos.find(
            f => f.florNumero === pt.index
          );

        const photoSrc =
          fotoConfigurada ? fotoConfigurada.imagem : null;

        // ✅ DETECÇÃO DA CURVA LATERAL
        const isRightSide = percentX > 85;
        const isLeftSide = percentX < 15;
        const isVerticalSide = isRightSide || isLeftSide;

        // ✅ OFFSET INTELIGENTE
        let offsetX = -50;
        let offsetY = -50;

        if (isVerticalSide) {
          offsetX = isRightSide ? -65 : -35;
          offsetY = -45;
        }

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
              height: "1px"
            }}
          >

            <img
              src={flowerImage}
              alt="Margarida"
              className="absolute top-1/2 left-1/2 max-w-none w-[50px] md:w-[250px] object-contain pointer-events-none"
              style={{
                transform:
                  `translate(-50%, -50%) rotate(${pt.angle}deg)`
              }}
            />

            {photoSrc && (
              <img
                src={photoSrc}
                alt="Foto"
                className="absolute top-1/2 left-1/2 max-w-none w-[100px] md:w-[150px] pointer-events-auto"
                style={{
                  transform: `translate(-50%, -50%)`
                }}
              />
            )}

          </div>
        );
      })}
    </div>
  );
}