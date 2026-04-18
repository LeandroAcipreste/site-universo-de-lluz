import React from "react";
import backgroundSection from "../imagens/background_section.svg";

interface RetiroVicenciasMobileProps {
  children?: React.ReactNode;
}

export default function RetiroVicenciasMobile({ children }: RetiroVicenciasMobileProps) {
  // Configurado focado 100% no mobile first
  return (
    <section id="cardVivenciasMobile" className="relative w-full z-20 pt-20 pb-40 flex flex-col items-center justify-center">
      
      {/* Background Section SVG Mobile (Ajustável) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src={backgroundSection} alt="Background Vivências Mobile" className="w-full h-full object-cover object-top opacity-80" />
      </div>

      <div className="w-full px-4 text-center z-30">
        <h2 className="text-brand-blue text-3xl font-['Playfair_Display'] mb-6">
          Nossas Vivências
        </h2>
        <p className="text-neutral-300 text-base max-w-sm mx-auto">
          Preparando terreno para os cards Mobile. Foco total em uma experiência vertical fluida.
        </p>
      </div>

      {children}
    </section>
  );
}
