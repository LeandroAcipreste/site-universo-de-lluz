import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import backgroundSection from "../imagens/background_section.svg";
import maeBeijaFlor from "../imagens/mae-beija-flor.jpg";
import beijaFlorRosas from "../imagens/beija-flor-com-flores-rosas.png";
import ayahuascaImg from "../imagens/expansao/ayahuasca.png";
import cacauImg from "../imagens/expansao/cacau.png";
import rapeImg from "../imagens/expansao/rape.png";
import respiracaoSomaticaImg from "../imagens/expansao/repirtacao-somatica.png";
import terapiasMeditativasImg from "../imagens/expansao/terapias meditativas.png";
import eduardoImg from "../imagens/expansao/Eduardo.png";

import "./RetiroVivencias.css";

gsap.registerPlugin(ScrollTrigger);

export default function RetiroVivencias({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Título e Header (Aparece/Soma sozinho)
    gsap.from(".anim-header", {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: ".anim-header",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. Animação Individual para cada Card e Divisor
    // Isso garante que Ayahuasca, Cacau, Rapé e as Terapias funcionem de forma independente
    const cards = gsap.utils.toArray<HTMLElement>(".anim-card");

    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,           // O próprio card é o gatilho
          start: "top 90%",        // Ativa quando o card entra por baixo
          end: "bottom 10%",       // Reverte quando o card sai por cima
          toggleActions: "play reverse play reverse",
        }
      });
    });

    // 3. Card Especial do Eduardo
    gsap.from(".anim-special", {
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".anim-special",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="vivencias-section">

      {/* BACKGROUND DA SESSÃO RESTAURADO */}
      <img src={backgroundSection} alt="" className="vivencias-bg" />

      {/* HEADER */}
      <div className="v-header-container anim-header">
        <h2 className="v-main-title">Nossas Vivências</h2>
        <p className="v-subtitle">O que você vai viver nessa jornada</p>
        <img src={beijaFlorRosas} alt="" className="v-bird-decor" />
      </div>


      <div className="v-grid-container">


        <div className="v-card-featured v-col-span-2 anim-card">
          <img
            src={maeBeijaFlor}
            alt="Mãe Beija Flor"
            className="v-featured-img"
          />
        </div>

        {/* Divisor 1 */}
        <div className="v-divider v-col-span-2 anim-card">
          <h3>Medicinas da Floresta</h3>
          <h4>A Expansão</h4>
        </div>

        {/* Card Ayahuasca */}
        <div className="v-card-standard anim-card">
          <div className="v-card-text-box text-left">
            <p className="v-card-desc"><strong className="uppercase">AYAHUASCA:</strong> 2 jornadas de consciência e autoconhecimento.</p>
          </div>
          <img src={ayahuascaImg} alt="Ayahuasca" className="v-card-img" />
        </div>

        {/* Card Cacau */}
        <div className="v-card-standard anim-card">
          <img src={cacauImg} alt="Cacau" className="v-card-img" />
          <div className="v-card-text-box text-right">
            <p className="v-card-desc"><strong className="uppercase">CACAU:</strong> facilita a conexão com o amor.</p>
          </div>
        </div>

        {/* Card Rapé */}
        <div className="v-card-standard v-card-centered v-col-span-2 anim-card">
          <div className="v-card-text-box text-left">
            <p className="v-card-desc"><strong className="uppercase">Rapé:</strong> alinhamento energético e silêncio interior.</p>
          </div>
          <img src={rapeImg} alt="Rapé" className="v-card-img" />
        </div>

        {/* Divisor 2 */}
        <div className="v-divider v-col-span-2 anim-card">
          <h3>Atividades Terapêuticas</h3>
          <h4>A Integração</h4>
        </div>

        {/* Card Respiração Somática */}
        <div className="v-card-standard anim-card">
          <img src={respiracaoSomaticaImg} alt="Respiração Somática" className="v-card-img" />
          <div className="v-card-text-box text-right">
            <p className="v-card-desc"><strong className="uppercase">RESPIRAÇÃO SOMÁTICA (BREATHWORK):</strong> liberação de traumas e descondicionamento emocional.</p>
          </div>
        </div>

        {/* Card Terapias Meditativas */}
        <div className="v-card-standard anim-card">
          <div className="v-card-text-box text-left">
            <p className="v-card-desc"><strong className="uppercase">TERAPIAS MEDITATIVAS:</strong> Movimento e dança para quebrar couraças e silenciar a mente.</p>
          </div>
          <img src={terapiasMeditativasImg} alt="Terapias Meditativas" className="v-card-img" />
        </div>

      </div>

      {/* CARD ESPECIAL EDUARDO */}
      <div className="v-card-special-wrapper anim-special">
        <div className="v-card-special-inner">
          <div className="vs-text-content">
            <h5 className="vs-name">Eduardo <span>Della Luna</span></h5>
            <p className="vs-bio uppercase">CANTOR E COMPOSITOR, MÚSICO DE REZO TRAZENDO A FORÇA DO CANTO COMO UM INSTRUMENTO DE CURA.</p>
          </div>
          <img src={eduardoImg} alt="Eduardo della Luna" className="vs-image-leaking" />
        </div>
      </div>

      {children}
    </section>
  );
}