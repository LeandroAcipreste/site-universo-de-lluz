import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef, useState, useEffect } from "react";

// Aqui usamos a imagem em PNG transparente
import flowerImage from "./imagens/margarida-com-galho.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function FlowerGarland() {
  const count = 200;
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    if (pathRef.current && svgPathData) {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      const newPoints = [];

      for (let i = 0; i < count; i++) {
        const distance = (i / (count - 1)) * pathLength;
        const point = path.getPointAtLength(distance);

        const nextPoint = path.getPointAtLength(Math.min(distance + 1, pathLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

        newPoints.push({ x: point.x, y: point.y, angle });
      }
      setPoints(newPoints);
    }
  }, [count]);

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll(".garland-item");
    if (!items || items.length === 0) return;

    gsap.fromTo(items,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.02, // Ajusta o ritmo que as flores surgem
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          // ==========================================
          // AJUSTE O TEMPO DE INÍCIO E FIM AQUI:
          start: "top 85%", // O topo da section cruza 85% da tela (Começa um pouco mais cedo)
          end: "bottom 5%", // O final da section cruza 15% da tela 
          scrub: 1,
          markers: true, // LIGADO PARA DEBUG: Apague essa linha quando terminar de ajustar!
          // ==========================================
        }
      }
    );
  }, { scope: containerRef, dependencies: [points] });

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {/* NOVO VIEWBOX: Ajustado para o tamanho do novo SVG 
        Largura: 1200 / Altura: 1050
      */}
      <svg
        viewBox="0 0 1200 1050"
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={svgPathData}
          fill="none"
        />
      </svg>

      {points.map((pt, i) => (
        <img
          key={i}
          src={flowerImage}
          alt="Margarida"
          className="garland-item absolute w-[40px] md:w-[70px] h-auto object-contain"
          style={{
            // MATEMÁTICA CORRIGIDA para o tamanho do novo path
            left: `${(pt.x / 1200) * 100}%`,
            top: `${(pt.y / 1050) * 100}%`,
            // Somando ou subtraindo 90 caso o galho fique torto
            transform: `translate(-50%, -50%) rotate(${pt.angle}deg)`,
            zIndex: i
          }}
        />
      ))}
    </div>
  );
}

const svgPathData = `M0.00610352 0.499939L1103.39 13.9738C1151.05 49.8544 1172.59 76.4801 1181.01 161.687C1170.52 284.15 1144.73 327.22 1084.11 385.254H102.481C35.8684 434.84 18.0522 477.535 19.2836 578.878C23.9459 665.133 35.7442 709.659 135.963 756.034L1072.95 742.56C1141.22 774.182 1164.28 808.933 1181.01 898.258C1170.08 961.313 1148.28 990.242 1084.11 1031.5L32.9808 1026.51`;