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

import { calcularPontos } from "./flowerGarland";
import "./flowerGarland.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MOBILE_SVG_PATH =
    "M461.0 0.457" +
    "C131.3 197.6 60.0 240.8 79.5 348.4" +
    "C99.0 456.1 434.4 467.4 434.4 605.4" +
    "C434.4 743.4 231.5 780.3 79.5 819.4";
const MOBILE_VIEWBOX_W = 521;
const MOBILE_VIEWBOX_H = 820;
const MOBILE_FLOWER_COUNT = 80;

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

const getDynamicItemStyleMobile = (percentX: number, percentY: number, offsetX: number, offsetY: number, zIndexConfig: number): React.CSSProperties => ({
    left: `${percentX}%`,
    top: `${percentY}%`,
    opacity: 0,
    transform: `translate(${offsetX}%, ${offsetY}%) scale(0)`,
    zIndex: zIndexConfig,
    willChange: "transform, opacity"
});

const getFlowerImageStyleMobile = (angle: number): React.CSSProperties => ({
    transform: `translate(-50%, -50%) rotate(${angle}deg)`
});

const getPhotoStyleMobile = (): React.CSSProperties => ({
    transform: `translate(-50%, -50%)`
});

export default function FlowerGarlandMobile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [points, setPoints] = useState<Point[]>([]);

    useLayoutEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const tentarCalcular = () => {
            if (!pathRef.current) return;
            const pts = calcularPontos(pathRef.current, MOBILE_FLOWER_COUNT);

            if (pts.length === 0) {
                // Ao invés de rAF que pode rodar 60x por segundo e travar o scroll,
                // usa um setTimeout suave de 100ms para aguardar o SVG
                timer = setTimeout(tentarCalcular, 100);
                return;
            }
            setPoints(pts);
        };

        tentarCalcular();
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (points.length === 0) return;
        const items = gsap.utils.toArray<Element>(".garland-item", containerRef.current);
        if (items.length === 0) return;

        gsap.set(items, { opacity: 0, scale: 0 });
        gsap.set(["#mobile-text-block", "#mobile-text-block-2"], { opacity: 0, y: 30 });

        gsap.to(items, {
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 95%",
                end: "bottom 20%",
                scrub: 1, // suavizado para melhorar a performance
            },
        });

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

        // Duplo rAF: garante que o layout esteja completamente estabilizado
        // antes de recalcular posições do ScrollTrigger
        let rAF1: number;
        let rAF2: number;
        rAF1 = requestAnimationFrame(() => {
            rAF2 = requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        return () => {
            cancelAnimationFrame(rAF1);
            cancelAnimationFrame(rAF2);
        };
    }, { scope: containerRef, dependencies: [points] });

    return (
        <section id="flower-garland-mobile" ref={containerRef} className="garland-section-mobile">
            <svg aria-hidden="true" viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`} className="garland-svg" preserveAspectRatio="none">
                <path ref={pathRef} d={MOBILE_SVG_PATH} fill="none" />
            </svg>

            <div id="mobile-text-block" className="mobile-text-block-1">
                <p className="garland-text-spaced-mobile">O beija-flor nos ensina que a cura pode vir através da alegria, da leveza e da celebração.</p>
                <p className="garland-text-mobile">Este retiro é um portal para dissolver fardos e despertar para uma vida mais fluida.</p>
            </div>

            <div id="mobile-text-block-2" className="mobile-text-block-2">
                <p className="garland-paragraph-mobile">Deixe para trás o que é denso. Assim como o beija-flor, escolha a doçura de voar sem pesos. É hora de transmutar esforço em fluidez e cansaço em celebração.</p>
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
                const finalZIndex = photoSrc ? 1000 : pt.index;

                return (
                    <div
                        key={pt.index}
                        className="garland-item"
                        style={getDynamicItemStyleMobile(percentX, percentY, offsetX, offsetY, finalZIndex)}
                    >
                        <img
                            src={flowerImage}
                            alt="Margarida"
                            className="garland-flower-img garland-flower-img-mobile"
                            style={getFlowerImageStyleMobile(pt.angle)}
                        />
                        {photoSrc && (
                            <img
                                src={photoSrc}
                                alt="Foto circular do retiro"
                                className="garland-photo-img garland-photo-img-mobile"
                                style={getPhotoStyleMobile()}
                            />
                        )}
                    </div>
                );
            })}
        </section>
    );
}