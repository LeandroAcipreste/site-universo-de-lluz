import React, { useRef } from "react";
import backgroundSection from "../imagens/background_section.svg";
import maeBeijaFlor from "../imagens/mae-beija-flor.jpg";
import backgroundCard from "../imagens/background-card.svg";
import beijaFlorRosas from "../imagens/beija-flor-com-flores-rosas.png";
import ayahuascaImg from "../imagens/expansao/ayahuasca.png";
import cacauImg from "../imagens/expansao/cacau.png";
import rapeImg from "../imagens/expansao/rape.png";
import respiracaoSomaticaImg from "../imagens/expansao/repirtacao-somatica.png";
import terapiasMeditativasImg from "../imagens/expansao/terapias meditativas.png";
import eduardoImg from "../imagens/expansao/Eduardo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface RetiroVicenciasMobileProps {
  children?: React.ReactNode;
}

const vivenciasStyles = {
  titleStroke: {
    WebkitTextStroke: "1px #032e4d",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
  } as React.CSSProperties,
};

export default function RetiroVicenciasMobile({ children }: RetiroVicenciasMobileProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".vivencias-anim-item");

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            // Removemos o 'once: true' para que ele refaça a animação sempre
          },
        }
      );
    });
    
    // Atualiza o ScrollTrigger após a montagem condicional
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, { scope: containerRef });

  return (
    <section id="cardVivenciasMobile" ref={containerRef} className="relative w-full z-20 pt-20 pb-10 flex flex-col items-center font-['Montserrat']">

      {/* Background Section SVG Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src={backgroundSection} alt="Background Vivências Mobile" className="w-full h-full object-cover object-top" />
      </div>

      <div className="vivencias-anim-item w-full px-4 text-center z-30 mb-8 mt-6">
        <h2 id="vivencias-title" className="text-brand-blue text-4xl font-['Playfair_Display'] mb-4 font-bold" style={vivenciasStyles.titleStroke}>
          Nossas Vivências
        </h2>
        <p id="vivencias-subtitle" className="text-brand-green text-xs tracking-wide uppercase font-semibold max-w-[280px] mx-auto">
          O que você vai viver nessa jornada
        </p>
      </div>

      {/* Grid de Cards Vazios */}
      <div className="w-full flex flex-col gap-6 px-5 relative z-30 max-w-md mx-auto">

        {/* Row 1: 2 small cards */}
        <div className="vivencias-anim-item grid grid-cols-2 gap-4">

          {/* Small Card 1 (Dark layout reference, empty) */}
          <div id="vivencias-card-1" className="rounded-[32px] shadow-[0px_20px_40px_rgba(3,46,77,0.3)] border border-[#38bdf8] aspect-square transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${maeBeijaFlor})` }}>
            {/* Conteúdo do Card Pequeno 1 */}
          </div>

          {/* Small Card 2 (Agora apenas a imagem solta flutuando) */}
          <div id="vivencias-card-2" className="flex items-center justify-center aspect-square transition-transform duration-500 hover:-translate-y-2">
            <img src={beijaFlorRosas} alt="Beija Flor com Flores Rosas" className="w-[95%] h-[95%] object-contain drop-shadow-2xl" />
          </div>

        </div>

        {/* Título Expansão inserido conforme marcação */}
        <div className="vivencias-anim-item w-full flex flex-col items-center justify-center my-4 z-30">
          <h3 id="vivencias-medicinas" className="text-brand-green text-[16px] font-['Montserrat'] font-extrabold tracking-[0.2em] uppercase whitespace-nowrap">
            Medicinas da Floresta
          </h3>
          <h4 id="vivencias-expansao" className="text-brand-blue text-[18px] font-['Playfair_Display'] font-bold uppercase tracking-widest mt-1" style={{ WebkitTextStroke: "1px #032e4d" }}>
            A Expansão
          </h4>
        </div>

        {/* Row 2: Medium Card (Ayahuasca) */}
        <div id="vivencias-card-3" className="vivencias-anim-item w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] min-h-[160px] transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center p-5 gap-3" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Lado Esquerdo: Textos */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed">
              <strong className="font-bold">AYAHUASCA:</strong> A medicina principal do nosso retiro. serão 2 jornadas de consciência e autoconhecimento.
            </p>
            <p className="text-brand-navy text-[10px] sm:text-[11px] mt-3 font-semibold leading-tight">
              * mediante a aprovação de consulta prévia com Olyvia
            </p>
          </div>

          {/* Lado Direito: Imagem */}
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] flex-shrink-0">
            <img src={ayahuascaImg} alt="Ayahuasca" className="w-full h-full object-contain drop-shadow-md" />
          </div>

        </div>

        {/* Row 3: Medium Card (Cacau) */}
        <div id="vivencias-card-4" className="vivencias-anim-item w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] min-h-[160px] transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center p-5 gap-3" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Lado Esquerdo: Imagem */}
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] flex-shrink-0">
            <img src={cacauImg} alt="Cacau" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          {/* Lado Direito: Textos */}
          <div className="flex-1 flex flex-col justify-center text-right">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed">
              <strong className="font-bold">CACAU:</strong> facilita a conexão com o amor e a cura emocional.
            </p>
          </div>

        </div>

        {/* Row 4: Medium Card (Rapé) */}
        <div id="vivencias-card-5" className="vivencias-anim-item w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] min-h-[160px] transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center p-5 gap-3" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Lado Esquerdo: Textos */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed">
              <strong className="font-bold uppercase">Rapé:</strong> alinhamento energético o silêncio interior.
            </p>
          </div>

          {/* Lado Direito: Imagem */}
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] flex-shrink-0">
            <img src={rapeImg} alt="Rapé" className="w-full h-full object-contain drop-shadow-md" />
          </div>

        </div>

        {/* Título Integração */}
        <div className="vivencias-anim-item w-full flex flex-col items-center justify-center my-4 z-30">
          <h3 id="vivencias-atividades" className="text-brand-green text-[16px] font-['Montserrat'] font-extrabold tracking-[0.1em] uppercase whitespace-nowrap">
            Atividades Terapêuticas
          </h3>
          <h4 id="vivencias-integracao" className="text-brand-blue text-[18px] font-['Playfair_Display'] font-bold uppercase tracking-widest mt-1" style={{ WebkitTextStroke: "1px #032e4d" }}>
            A Integração
          </h4>
        </div>

        {/* Row 5: Medium Card (Respiração Somática) */}
        <div id="vivencias-card-6" className="vivencias-anim-item w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] min-h-[160px] transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center p-5 gap-3" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Lado Esquerdo: Imagem */}
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] flex-shrink-0">
            <img src={respiracaoSomaticaImg} alt="Respiração Somática" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          {/* Lado Direito: Textos */}
          <div className="flex-1 flex flex-col justify-center text-right">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed">
              <strong className="font-bold uppercase">RESPIRAÇÃO SOMÁTICA (BREATHWORK):</strong> liberação de traumas e descondicionamento emocional.
            </p>
          </div>

        </div>

        {/* Row 6: Medium Card (Terapias Meditativas) */}
        <div id="vivencias-card-7" className="vivencias-anim-item w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] min-h-[160px] transition-transform duration-500 hover:-translate-y-2 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center p-5 gap-3" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Lado Esquerdo: Textos */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed">
              <strong className="font-bold uppercase">TERAPIAS MEDITATIVAS:</strong> Movimento e dança para quebrar couraças e silenciar a mente. complementando a jornada de cura com vitalidade e presença.
            </p>
          </div>

          {/* Lado Direito: Imagem */}
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] flex-shrink-0">
            <img src={terapiasMeditativasImg} alt="Terapias Meditativas" className="w-full h-full object-contain drop-shadow-md" />
          </div>

        </div>

        {/* Título Participação Especial */}
        <div className="vivencias-anim-item w-full flex flex-col items-center justify-center my-4 z-30">
          <h3 id="vivencias-participacao" className="text-brand-green text-[16px] font-['Montserrat'] font-extrabold tracking-[0.1em] uppercase whitespace-nowrap">
            Participação Especial
          </h3>
          <h4 id="vivencias-musica" className="text-brand-blue text-[18px] font-['Playfair_Display'] font-bold uppercase tracking-widest mt-1 text-center leading-tight" style={{ WebkitTextStroke: "1px #032e4d" }}>
            Música de Rezo ao Vivo na Sessão
          </h4>
        </div>

        {/* Card Maior: Eduardo della Luna (Layout de Destaque) */}
        <div id="vivencias-card-eduardo" className="vivencias-anim-item w-full mb-[62px] mt-12 relative bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0px_25px_45px_rgba(1,91,139,0.1)] border border-[#38bdf8] transition-transform duration-500 hover:-translate-y-2 bg-cover bg-center bg-no-repeat p-6 sm:p-8" style={{ backgroundImage: `url(${backgroundCard})` }}>
          
          {/* Topo do Card: Nome + Imagem Vazada (Break-out Effect) */}
          <div className="flex justify-between items-start w-full relative min-h-[140px] sm:min-h-[160px] z-10">
            
            {/* Esquerda: Nomes */}
            <div className="flex flex-col pt-3 w-[55%]">
              <h5 className="text-brand-blue text-[20px] font-bold uppercase tracking-wide font-['Playfair_Display'] leading-[1.15]">
                Eduardo <span className="block mt-1">Della Luna</span>
              </h5>
              <div className="mt-3 inline-block">
                <span className="text-brand-green text-[10px] font-black tracking-wide bg-brand-green/10 px-2 py-0.5 rounded-md drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                  @eduardo_della_luna
                </span>
              </div>
            </div>

            {/* Direita: Imagem do Eduardo Absoluta */}
            {/* Empurramos para a direita (margem negativa) para não cobrir o nome, e reduzimos ligeiramente a largura base para encaixe perfeito no mobile */}
            <div className="absolute -right-6 sm:-right-2 -top-24 w-[170px] h-[240px] sm:w-[220px] sm:h-[280px] pointer-events-none z-20">
              <img src={eduardoImg} alt="Eduardo della Luna" className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]" />
            </div>
          </div>

          {/* Base do Card: Descrição (Texto flui lindamente ocupando a largura total em baixo da imagem) */}
          <div className="relative z-10 mt-6 sm:mt-8">
            <p className="text-brand-navy text-[13px] font-medium leading-relaxed uppercase text-justify">
              CANTOR E COMPOSITOR, MÚSICO DE REZO COM EXPERIÊNCIA NA CONDUÇÃO MUSICAL DE CERIMÔNIAS COM AS SAGRADAS MEDICINAS DA FLORESTA, TRAZENDO A FORÇA DO CANTO COMO UM INSTRUMENTO DE CURA E CONEXÃO ESPIRITUAL.
            </p>
          </div>

        </div>

        </div>
      {children}
    </section>
  );
}
