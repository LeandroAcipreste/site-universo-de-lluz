import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef, useState, useLayoutEffect } from "react";

import flowerImage from "../imagens/margarida-com-galho.png";

import foto1 from "../imagens/imagens-redondas/mãe-foto-redonda.png";
import foto2 from "../imagens/imagens-redondas/Group 13.png";
import foto3 from "../imagens/imagens-redondas/cantor-foto- redonda.png";
import foto4 from "../imagens/imagens-redondas/Group 10.png";
import foto5 from "../imagens/imagens-redondas/Group 9.png";
import foto6 from "../imagens/imagens-redondas/Group 8.png";
import foto7 from "../imagens/imagens-redondas/Group 7.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MOBILE_SVG_PATH =
    "M461.0 0.457" +
    "C131.3 197.6 60.0 240.8 79.5 348.4" +
    "C99.0 456.1 434.4 467.4 434.4 605.4" +
    "C434.4 743.4 231.5 780.3 79.5 819.4";
const MOBILE_VIEWBOX_W = 521;
const MOBILE_VIEWBOX_H = 820;
const MOBILE_FLOWER_COUNT = 80;

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

interface Point {
    x: number;
    y: number;
    angle: number;
    index: number;
}

const posicoesDasFotosMobile = [
    { florNumero: 20, imagem: foto1 }, { florNumero: 30, imagem: foto2 },
    { florNumero: 39, imagem: foto3 }, { florNumero: 47, imagem: foto4 },
    { florNumero: 55, imagem: foto5 }, { florNumero: 62, imagem: foto6 },
    { florNumero: 70, imagem: foto7 },
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

export default function FlowerGarlandMobile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [points, setPoints] = useState<Point[]>([]);

    useLayoutEffect(() => {
        let rAF: number;
        const tentarCalcular = () => {
            if (!pathRef.current) return;
            const pts = calcularPontos(pathRef.current, MOBILE_FLOWER_COUNT);

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
        const items = gsap.utils.toArray<Element>(".garland-item-mobile", containerRef.current);
        if (items.length === 0) return;

        gsap.set(items, { opacity: 0, scale: 0 });
        gsap.set(["#mobile-text-block", "#mobile-text-block-2"], { opacity: 0, y: 30 });

        gsap.to(items, {
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 20%",
                scrub: 1.5,
            },
        });

        // Texto 1 — aparece quando o vetor chega na primeira curva (~30%)
        gsap.to("#mobile-text-block", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%",
                end: "top 10%",
                scrub: 1,
            },
        });

        // Texto 2 — aparece quando o vetor chega na segunda curva (~60%)
        gsap.to("#mobile-text-block-2", {
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
        <section id="flower-garland-mobile" ref={containerRef} className="relative w-full overflow-visible pointer-events-none" style={{ minHeight: "165vw" }}>
            <svg aria-hidden="true" viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                <path ref={pathRef} d={MOBILE_SVG_PATH} fill="none" />
            </svg>

            <div id="mobile-text-block" className="text-brand-blue" style={{ ...garlandStyles.textOverlay, top: "26%" }}>
                <p style={garlandStyles.contentTextSpaced}>O beija-flor nos ensina que a cura pode vir através da alegria, da leveza e da celebração.</p>
                <p style={garlandStyles.contentText}>Este retiro é um portal para dissolver fardos e despertar para uma vida mais fluida.</p>
            </div>

            <div id="mobile-text-block-2" className="absolute pointer-events-auto text-brand-blue z-40" style={{ left: "4%", top: "60%", width: "52%", maxWidth: "200px" }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1rem, 3.2vw, 1rem)", fontWeight: 500, lineHeight: 1.35 }}>Deixe para trás o que é denso. Assim como o beija-flor, escolha a doçura de voar sem pesos. É hora de transmutar esforço em fluidez e cansaço em celebração.</p>
            </div>

            {points.map((pt) => {
                const percentX = (pt.x / MOBILE_VIEWBOX_W) * 100;
                const percentY = (pt.y / MOBILE_VIEWBOX_H) * 100;
                const fotoConfig = posicoesDasFotosMobile.find((f) => f.florNumero === pt.index);
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
                        <img src={flowerImage} alt="Margarida" className="absolute top-1/2 left-1/2 max-w-none object-contain pointer-events-none" style={{ width: "clamp(55px, 18vw, 100px)", transform: `translate(-50%, -50%) rotate(${pt.angle}deg)` }} />
                        {photoSrc && (
                            <img src={photoSrc} alt="Foto circular do retiro" className="absolute top-1/2 left-1/2 max-w-none pointer-events-auto" style={{ width: "clamp(50px, 14vw, 80px)", transform: "translate(-50%, -50%)" }} />
                        )}
                    </div>
                );
            })}
        </section>
    );
}
