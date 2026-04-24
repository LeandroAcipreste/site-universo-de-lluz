import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import backgroundImage from "../imagens/background-hero-retiro.png";
import flowerLeft from "../imagens/flower-left.svg";
import flowerRight from "../imagens/flower-right.svg";
import flowerMiddle from "../imagens/flores do meio.svg";
import flowerBottomLeft from "../imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "../imagens/flor de baixo da direita.svg";
import flowerTopMiddle from "../imagens/flor-do-meio-para-baixo.svg";
import hummingbird from "../imagens/beija flor grande.svg";
import hummingbirdLeft from "../imagens/beija-flor-virado-para-esquerda.svg";
import "./retiro-hero-mobile.css";

export default function RetiroHeroMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Removemos o visibility: hidden do CSS antes de animar
    gsap.set([
      ".m-fl-top-mid", ".m-fl-top-left", ".m-fl-bot-left", ".m-fl-bot-right", ".m-fl-mid",
      ".m-fl-top-right-wrapper", ".m-title-container", ".m-bird-right", ".m-bird-left", ".m-scroll-indicator"
    ], { visibility: "visible" });

    const tl = gsap.timeline({ defaults: { force3D: true } });

    tl.from(".m-fl-top-mid, .m-fl-top-left, .m-fl-bot-left, .m-fl-bot-right, .m-fl-mid, .m-fl-top-right-wrapper", {
      y: (i) => i < 3 ? -60 : 60,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out"
    }, 0.2)
      .from(".m-title-container", { scale: 0.85, y: 25, opacity: 0, duration: 1.2 }, 1.1)
      .from(".m-bird-right, .m-bird-left", { x: (i) => i === 0 ? -300 : 300, opacity: 0, duration: 1.8 }, 1.8)
      .from(".m-scroll-indicator", { opacity: 0, y: 20, duration: 0.8 }, 3.2);

    gsap.to(".m-scroll-line", { y: 10, repeat: -1, yoyo: true, duration: 1.5 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="hero-mobile-section">
      <img src={backgroundImage} alt="" className="hero-mobile-bg" />

      <div className="m-title-container">
        <div className="m-text-group">
          <h2 className="m-subtitle">Retiro Cura do</h2>
          <h1 className="m-main-title">BEIJA-FLOR</h1>
          <h2 className="m-subtitle">2026</h2>
          <div className="m-info-block">
            <h3 className="m-info-title">O chamado da doçura chegou!</h3>
            <p className="m-info-date">03 a 07 de junho</p>
            <address className="m-info-location">
              <span>POUSADA LAGOA DA PEDRA</span>
              <span>IMBASSAÍ/BA</span>
            </address>
          </div>
        </div>
      </div>

      <img src={flowerTopMiddle} className="m-fl-top-mid" alt="" />
      <img src={flowerLeft} className="m-fl-top-left" alt="" />
      <img src={flowerBottomLeft} className="m-fl-bot-left" alt="" />
      <img src={flowerBottomRight} className="m-fl-bot-right" alt="" />
      <img src={flowerMiddle} className="m-fl-mid" alt="" />

      <div className="m-fl-top-right-wrapper">
        <img src={flowerRight} className="m-fl-top-right-img" alt="" />
        <img src={hummingbird} className="m-bird-right" alt="" />
      </div>
      <img src={hummingbirdLeft} className="m-bird-left" alt="" />

      <div className="m-scroll-indicator">
        <span className="m-scroll-label">Role para sentir</span>
        <div className="m-scroll-line">
          <div className="m-scroll-arrow-tip" />
        </div>
      </div>
    </section>
  );
}