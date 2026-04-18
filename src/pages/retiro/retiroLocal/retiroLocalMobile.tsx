import React, { useRef } from "react";
import backgroundSection from "../imagens/background_section.svg";
import pousada1 from "../imagens/pousada1.png";
import pousada2 from "../imagens/pousada2.png";
import beijaFlor4 from "../imagens/beija-flor4.png";
import florBaixoDireita from "../imagens/flor de baixo da direita.svg";
import beijaFlorGrande from "../imagens/beija flor grande.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface RetiroLocalMobileProps {
  children?: React.ReactNode;
}

export default function RetiroLocalMobile({ children }: RetiroLocalMobileProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".local-anim-item");

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
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
          },
        }
      );
    });

    // Animação flutuante para os beija-flores
    gsap.to(".floating-bird", {
      y: -15,
      x: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, { scope: containerRef });

  return (
    <section id="retiroLocalMobile" ref={containerRef} className="relative w-full z-[15] pt-0 pb-10 flex flex-col items-center font-['Montserrat']">
      
      {/* Background Section SVG Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src={backgroundSection} alt="Background Local Mobile" className="w-full h-full object-cover object-top" />
      </div>

      {/* Elemento Decorativo: Beija-Flor 4 (Topo Direita) */}
      <div className="absolute top-[80px] -right-4 w-[120px] z-40 pointer-events-none floating-bird opacity-80 rotate-[15deg]">
        <img src={beijaFlor4} alt="Decorativo Beija-flor" className="w-full h-auto drop-shadow-xl" />
      </div>

      {/* Título Nosso Refúgio */}
      <div className="local-anim-item w-full px-4 text-center z-30 mt-12 mb-8">
        <h2 className="text-brand-blue text-4xl font-['Playfair_Display'] mb-4 font-bold" style={{ WebkitTextStroke: "1px #032e4d", textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}>
          Nosso Refúgio
        </h2>
        <p className="text-brand-green text-xs tracking-wide uppercase font-semibold max-w-[280px] mx-auto">
          Natureza e Conforto
        </p>
      </div>

      {/* Box da Foto da Pousada */}
      <div className="local-anim-item w-full px-5 relative z-30 max-w-md mx-auto mb-10">
        <img src={pousada1} alt="Pousada Flor de Cór" className="w-full h-auto rounded-[24px] block shadow-lg" />
        
        {/* Flor decorativa saindo da lateral da foto */}
        <div className="absolute -bottom-8 -left-10 w-[140px] z-40 pointer-events-none rotate-[-20deg] opacity-90">
          <img src={florBaixoDireita} alt="Flor decorativa" className="w-full h-auto drop-shadow-lg" />
        </div>
      </div>

      {/* Box de Textos Inclusos */}
      <div className="local-anim-item w-full px-5 relative z-30 max-w-md mx-auto mb-10 text-center">
        <h5 className="text-brand-blue text-[15px] font-extrabold uppercase mb-5 tracking-wide drop-shadow-sm font-['Montserrat']">
          Tudo incluso para o seu conforto!
        </h5>
        
        <ul className="flex flex-col gap-3 text-left">
          <li className="flex items-start gap-3 bg-white/60 backdrop-blur-md p-4 rounded-[20px] shadow-[0_10px_25px_rgba(1,91,139,0.08)] border border-[#38bdf8]/40">
            <span className="text-[16px] leading-tight flex-shrink-0">✅</span>
            <span className="text-brand-navy text-[12px] font-bold uppercase leading-normal mt-0.5">
              Hospedagem na Pousada Lagoa da Pedra, Imbassaí/BA.
            </span>
          </li>
          
          <li className="flex items-start gap-3 bg-white/60 backdrop-blur-md p-4 rounded-[20px] shadow-[0_10px_25px_rgba(1,91,139,0.08)] border border-[#38bdf8]/40">
            <span className="text-[16px] leading-tight flex-shrink-0">✅</span>
            <span className="text-brand-navy text-[12px] font-bold uppercase leading-normal mt-0.5">
              Pensão completa (Alimentação ovolactovegetariana).
            </span>
          </li>

          <li className="flex items-start gap-3 bg-white/60 backdrop-blur-md p-4 rounded-[20px] shadow-[0_10px_25px_rgba(1,91,139,0.08)] border border-[#38bdf8]/40">
            <span className="text-[16px] leading-tight flex-shrink-0">✅</span>
            <span className="text-brand-navy text-[12px] font-bold uppercase leading-normal mt-0.5">
              Todas as atividades e todo material das atividades.
            </span>
          </li>
        </ul>
      </div>

      {/* Box da Foto da Pousada 2 */}
      <div className="local-anim-item w-full px-5 relative z-30 max-w-md mx-auto mb-32">
        <img src={pousada2} alt="Interior da Pousada Nosso Refúgio" className="w-full h-auto rounded-[24px] block shadow-lg" />

        {/* Beija-flor grande no final da sessão */}
        <div className="absolute -bottom-16 -right-5 w-[160px] z-40 pointer-events-none floating-bird opacity-90 scale-x-[-1]">
          <img src={beijaFlorGrande} alt="Beija-flor Grande" className="w-full h-auto drop-shadow-2xl" />
        </div>
      </div>

      {children}
    </section>
  );
}
