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
    // Apenas coordenar o CSS, adicionando a classe após um pequeno delay
    const timer = setTimeout(() => {
      sectionRef.current?.classList.add("is-visible");
    }, 50);

    // GSAP cuida apenas da animação contínua (loop)
    gsap.to(".m-scroll-line", { y: 10, repeat: -1, yoyo: true, duration: 1.5 });

    return () => clearTimeout(timer);
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