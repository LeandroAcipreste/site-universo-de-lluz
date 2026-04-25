import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import RetiroHeroMobile from "./retiroHeroMobile";
import gsap from "gsap";
import backgroundImage from "../imagens/background-hero-retiro.png";
import flowerLeft from "../imagens/flower-left.svg";
import flowerRight from "../imagens/flor de baixo da direita.svg";
import hummingbirdLeft from "../imagens/beija-flor-virado-para-esquerda.svg";
import flowerTopMiddle from "../imagens/flor-do-meio-para-baixo.svg";
import hummingbird from "../imagens/beija flor grande.svg";
import "./retiro-hero.css";

export default function RetiroHero() {
  // Inicialização síncrona: evita montar o desktop antes de detectar mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  if (isMobile) return <RetiroHeroMobile />;

  return <RetiroHeroDesktop />;
}

function RetiroHeroDesktop() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Revela os elementos escondidos no CSS antes da animação
    gsap.set([
      ".d-fl-mid", ".d-fl-left", ".d-fl-right-wrap",
      ".title-container", ".d-bird-r", ".d-bird-l", ".scroll-indicator"
    ], { visibility: "visible" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".d-fl", { y: -200, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.1)
      .from(".title-container", { scale: 0.95, y: 40, opacity: 0, duration: 1.5 }, "-=0.8")
      .from(".d-bird-r", { x: -100, opacity: 0, duration: 1 }, "-=1")
      .from(".d-bird-l", { x: 100, opacity: 0, duration: 1 }, "-=1")
      .from(".scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.5");

    gsap.to(".scroll-arrow", { y: 15, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-section">
      <img src={backgroundImage} alt="" className="hero-bg" />

      <div className="title-container">
        <div className="text-group">
          <h2 className="hero-subtitle">Retiro Cura do</h2>
          <h1 className="hero-main-title">BEIJA-FLOR</h1>
          <h2 className="hero-subtitle">2026</h2>

          <div className="hero-info-box">
            <h3 className="hero-info-call">O chamado da doçura chegou!</h3>
            <p className="hero-info-date">03 a 07 de junho</p>
            <address className="hero-info-address">
              <span>POUSADA LAGOA DA PEDRA</span>
              <span>IMBASSAÍ/BA</span>
            </address>
          </div>
        </div>
      </div>

      <div className="flower-layer">
        <img src={flowerTopMiddle} className="d-fl d-fl-mid" alt="" />
        <img src={flowerLeft} className="d-fl d-fl-left" alt="" />
        <img src={flowerRight} className="d-fl d-fl-right-wrap" alt="" />
        <img src={hummingbird} className="d-bird-r" alt="" />
        <img src={hummingbirdLeft} className="d-bird-l" alt="" />
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <div className="scroll-arrow-tip" />
        </div>
      </div>
    </section>
  );
}