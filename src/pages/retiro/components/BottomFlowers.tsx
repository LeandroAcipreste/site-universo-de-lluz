import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import flowerBottomLeft from "../imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "../imagens/flor de baixo da direita.svg";
import flowerMiddle from "../imagens/flores do meio.svg";
import "./BottomFlowers.css";

const BottomFlowers = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(
      [".flower-bottom-left", ".flower-bottom-right", ".flower-bottom-middle"],
      { opacity: 0, visibility: "visible" }
    );

    gsap.utils.toArray<HTMLElement>(".flower-bottom-left").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: -30 },
        { y: 0, opacity: 1, rotate: -15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-right").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: 30 },
        { y: 0, opacity: 1, rotate: 15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-middle").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bottom-flowers-wrapper">
      <img className="flower-bottom-left" src={flowerBottomLeft} alt="Flor inferior esquerda" />
      <img className="flower-bottom-right" src={flowerBottomRight} alt="Flor inferior direita" />
      <img className="flower-bottom-middle" src={flowerMiddle} alt="Flores centrais" />
    </div>
  );
};

export default BottomFlowers;